import { spawn, type ChildProcess } from "node:child_process";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";

const DEFAULT_FAKE_STRIPE_PORT = 4243;
const FAKE_STRIPE_HOSTNAME = "127.0.0.1";

export function fakeStripePlugin(): Plugin {
	const port = getFakeStripePort();
	const backendOrigin = `http://${FAKE_STRIPE_HOSTNAME}:${port}`;
	let fakeStripeProcess: ChildProcess | undefined;
	let startPromise: Promise<boolean> | undefined;

	const startStripe = async () => {
		if (await isBackendReady(backendOrigin)) return true;

		startPromise ??= ensureStripeProcess(
			backendOrigin,
			port,
			(process) => {
				fakeStripeProcess = process;
			},
			() => {
				fakeStripeProcess = undefined;
				startPromise = undefined;
			},
		);

		const started = await startPromise;
		if (!started) startPromise = undefined;
		return started;
	};

	const stopStripe = () => {
		fakeStripeProcess?.kill();
		fakeStripeProcess = undefined;
		startPromise = undefined;
	};

	const proxyMiddleware = async (
		req: IncomingMessage,
		res: ServerResponse,
		next: () => void,
	) => {
		if (!isFakeStripeRoute(req.url)) {
			next();
			return;
		}

		await startStripe();
		if (!(await isBackendReady(backendOrigin))) {
			res.statusCode = 503;
			res.setHeader("content-type", "text/plain; charset=utf-8");
			res.end("Fake Stripe is unavailable. Ensure Bun is installed.");
			return;
		}

		const requestUrl = `${backendOrigin}${req.url ?? "/"}`;
		const headers = new Headers();
		for (const [key, value] of Object.entries(req.headers)) {
			if (value == null) continue;
			if (Array.isArray(value)) {
				for (const headerValue of value) headers.append(key, headerValue);
			} else {
				headers.set(key, value);
			}
		}
		headers.set("host", `${FAKE_STRIPE_HOSTNAME}:${port}`);

		const body = await readRequestBody(req);
		let response: Response;
		try {
			response = await fetch(requestUrl, {
				method: req.method,
				headers,
				body,
			});
		} catch (error) {
			res.statusCode = 502;
			res.setHeader("content-type", "text/plain; charset=utf-8");
			res.end(
				error instanceof Error
					? `Unable to reach fake Stripe: ${error.message}`
					: "Unable to reach fake Stripe",
			);
			return;
		}

		res.statusCode = response.status;
		res.statusMessage = response.statusText;
		const contentType = response.headers.get("content-type") ?? "";
		const shouldRewriteOrigin =
			contentType.includes("application/json") ||
			contentType.includes("text/html");

		response.headers.forEach((value, key) => {
			if (shouldRewriteOrigin && key.toLowerCase() === "content-length") return;
			res.setHeader(key, value);
		});

		if (shouldRewriteOrigin) {
			const publicOrigin = getPublicOrigin(req);
			const rewrittenBody = (await response.text())
				.split(backendOrigin)
				.join(publicOrigin);
			res.setHeader("content-length", Buffer.byteLength(rewrittenBody));
			res.end(rewrittenBody);
			return;
		}

		const responseBody = await response.arrayBuffer();
		res.end(Buffer.from(responseBody));
	};

	return {
		name: "order-dialog-fake-stripe",
		configureServer(server) {
			void startStripe();
			server.middlewares.use(proxyMiddleware);
			server.httpServer?.once("close", stopStripe);
		},
		configurePreviewServer(server) {
			void startStripe();
			server.middlewares.use(proxyMiddleware);
			server.httpServer?.once("close", stopStripe);
		},
	};
}

async function ensureStripeProcess(
	backendOrigin: string,
	port: number,
	onProcess: (process: ChildProcess) => void,
	onExit: () => void,
) {
	if (await isBackendReady(backendOrigin)) return true;

	const child = spawn("bun", ["run", "scripts/fake-stripe.ts"], {
		cwd: process.cwd(),
		env: {
			...process.env,
			FAKE_STRIPE_HOSTNAME,
			FAKE_STRIPE_PORT: String(port),
		},
		stdio: ["ignore", "pipe", "pipe"],
	});

	onProcess(child);
	child.stdout?.on("data", (chunk) => {
		for (const line of String(chunk).trim().split("\n")) {
			if (line.length > 0) console.log(`[fake-stripe] ${line}`);
		}
	});
	child.stderr?.on("data", (chunk) => {
		for (const line of String(chunk).trim().split("\n")) {
			if (line.length > 0) console.error(`[fake-stripe] ${line}`);
		}
	});
	child.on("error", (error) => {
		console.error(`[fake-stripe] Failed to start: ${error.message}`);
	});
	child.on("exit", (code, signal) => {
		onExit();
		if (code !== 0 && signal == null) {
			console.error(`[fake-stripe] Exited with code ${code}`);
		}
	});

	return waitForBackend(backendOrigin);
}

function getFakeStripePort() {
	const configured = Number(process.env.FAKE_STRIPE_PORT);
	return Number.isInteger(configured) && configured > 0
		? configured
		: DEFAULT_FAKE_STRIPE_PORT;
}

function isFakeStripeRoute(url: string | undefined) {
	if (url == null) return false;

	const pathname = new URL(url, "http://localhost").pathname;
	return (
		pathname === "/health" ||
		pathname.startsWith("/checkout/") ||
		pathname.startsWith("/v1/checkout/")
	);
}

function getPublicOrigin(req: IncomingMessage) {
	const forwardedProto = headerValue(req.headers["x-forwarded-proto"]);
	const forwardedHost = headerValue(req.headers["x-forwarded-host"]);
	const host = forwardedHost ?? headerValue(req.headers.host) ?? "localhost";
	const proto = forwardedProto ?? "http";

	return `${proto}://${host}`;
}

function headerValue(value: string | string[] | undefined) {
	return Array.isArray(value) ? value[0] : value;
}

async function readRequestBody(req: IncomingMessage) {
	if (req.method === "GET" || req.method === "HEAD") return undefined;

	const chunks: Buffer[] = [];
	for await (const chunk of req) {
		chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
	}

	return chunks.length === 0 ? undefined : Buffer.concat(chunks);
}

async function waitForBackend(backendOrigin: string) {
	for (let attempt = 0; attempt < 50; attempt++) {
		if (await isBackendReady(backendOrigin)) return true;
		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	return false;
}

async function isBackendReady(backendOrigin: string) {
	try {
		const response = await fetch(`${backendOrigin}/health`);
		return response.ok;
	} catch {
		return false;
	}
}

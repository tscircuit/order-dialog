import type { IncomingMessage, ServerResponse } from "node:http";
import type { ViteDevServer, Plugin } from "vite";

type FakeStripeModule = {
	StripeServer: new () => {
		serverUrl?: string;
		handleRequest(request: Request): Promise<Response>;
	};
};

export function fakeStripePlugin(): Plugin {
	let fakeStripe: InstanceType<FakeStripeModule["StripeServer"]> | undefined;

	const getFakeStripe = async (server: ViteDevServer) => {
		if (fakeStripe != null) return fakeStripe;

		const { StripeServer } = (await server.ssrLoadModule(
			"@tscircuit/fake-stripe",
		)) as FakeStripeModule;

		fakeStripe = new StripeServer();
		return fakeStripe;
	};

	return {
		name: "order-dialog-fake-stripe",
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				if (!isFakeStripeRoute(req.url)) {
					next();
					return;
				}

				const stripe = await getFakeStripe(server);
				const publicOrigin = getPublicOrigin(req);

				stripe.serverUrl = publicOrigin;
				const request = await toFetchRequest(req, publicOrigin);
				const response =
					request.method === "OPTIONS"
						? withCors(new Response(null, { status: 204 }))
						: withCors(await stripe.handleRequest(request));

				await sendResponse(res, response);
			});
		},
	};
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

async function toFetchRequest(req: IncomingMessage, origin: string) {
	const headers = new Headers();
	for (const [key, value] of Object.entries(req.headers)) {
		if (value == null) continue;
		if (Array.isArray(value)) {
			for (const headerValue of value) headers.append(key, headerValue);
		} else {
			headers.set(key, value);
		}
	}

	return new Request(`${origin}${req.url ?? "/"}`, {
		method: req.method,
		headers,
		body: await readRequestBody(req),
	});
}

async function readRequestBody(req: IncomingMessage) {
	if (req.method === "GET" || req.method === "HEAD") return undefined;

	const chunks: Buffer[] = [];
	for await (const chunk of req) {
		chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
	}

	return chunks.length === 0 ? undefined : Buffer.concat(chunks);
}

async function sendResponse(res: ServerResponse, response: Response) {
	res.statusCode = response.status;
	res.statusMessage = response.statusText;
	response.headers.forEach((value, key) => {
		res.setHeader(key, value);
	});

	const body = await response.arrayBuffer();
	res.end(Buffer.from(body));
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

function withCors(response: Response) {
	const headers = new Headers(response.headers);
	headers.set("access-control-allow-origin", "*");
	headers.set("access-control-allow-methods", "GET,POST,OPTIONS");
	headers.set("access-control-allow-headers", "content-type");

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

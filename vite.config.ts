import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import fakeStripeBundle from "@tscircuit/fake-stripe/dist/bundle.js";
import { defineConfig, type Plugin } from "vite";
import { getNodeHandler } from "winterspec/adapters/node";

export function fakeStripePlugin(): Plugin {
	return {
		name: "order-dialog-fake-stripe",
		configureServer(server) {
			const fakeStripeHandler = getNodeHandler(fakeStripeBundle, {
				port: server.config.server.port,
			});

			server.middlewares.use(async (req, res, next) => {
				if (!isFakeStripeRoute(req.url)) {
					next();
					return;
				}

				fakeStripeHandler(req, res);
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

export default defineConfig({
	plugins: [react(), fakeStripePlugin()],
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "TscircuitOrderDialog",
			fileName: "order-dialog",
			cssFileName: "styles",
		},
		rollupOptions: {
			external: ["react", "react-dom", "react/jsx-runtime"],
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name?.endsWith(".css")) return "styles.css";
					return "[name][extname]";
				},
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"react/jsx-runtime": "jsxRuntime",
				},
			},
		},
	},
});

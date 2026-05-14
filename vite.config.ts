import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fakeStripePlugin } from "./vite.fake-stripe";

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

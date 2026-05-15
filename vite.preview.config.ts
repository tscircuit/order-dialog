import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fakeStripePlugin } from "./vite.config";

export default defineConfig({
	plugins: [react(), fakeStripePlugin()],
});

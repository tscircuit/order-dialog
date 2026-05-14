import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fakeStripePlugin } from "./vite.fake-stripe";

export default defineConfig({
	plugins: [react(), fakeStripePlugin()],
});

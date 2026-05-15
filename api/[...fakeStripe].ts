import type { IncomingMessage, ServerResponse } from "node:http";
import fakeStripeBundle from "@tscircuit/fake-stripe/dist/bundle.js";
import { getNodeHandler } from "winterspec/adapters/node";

const fakeStripeHandler = getNodeHandler(fakeStripeBundle, {});

export default function handler(req: IncomingMessage, res: ServerResponse) {
	if (req.url?.startsWith("/api/")) {
		req.url = req.url.replace("/api/", "/");
	}

	return fakeStripeHandler(req, res);
}

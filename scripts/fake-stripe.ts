import { StripeServer } from "@tscircuit/fake-stripe";

const stripe = new StripeServer({
	hostname: "127.0.0.1",
	port: 4242,
});

const routeRequest = stripe.handleRequest;

stripe.handleRequest = async (request) => {
	if (request.method === "OPTIONS") {
		return withCors(new Response(null, { status: 204 }));
	}

	return withCors(await routeRequest(request));
};

const url = await stripe.start();

console.log(`Fake Stripe listening at ${url}`);

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

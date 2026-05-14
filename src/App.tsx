import { OrderDialog } from "./OrderDialog";

const fakeStripeUrl =
	import.meta.env.VITE_FAKE_STRIPE_URL ?? "http://127.0.0.1:4242";

const appOrigin = window.location.origin;

const fakeStripeCheckout = {
	endpoint: `${fakeStripeUrl}/v1/checkout/sessions`,
	successUrl: `${appOrigin}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
	cancelUrl: `${appOrigin}/orders/cancel`,
};

export function App() {
	return (
		<OrderDialog
			checkout={fakeStripeCheckout}
			project={{
				name: "my-blinker-v3.tsx",
				version: "commit 8a4f29c · main",
			}}
		/>
	);
}

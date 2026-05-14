import { OrderDialog } from "./OrderDialog";

const fakeStripeCheckout = {
	endpoint: "http://127.0.0.1:4242/v1/checkout/sessions",
	successUrl:
		"http://localhost:3000/orders/success?session_id={CHECKOUT_SESSION_ID}",
	cancelUrl: "http://localhost:3000/orders/cancel",
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

import { OrderDialog } from "./OrderDialog";

const appOrigin = window.location.origin;

const fakeStripeCheckout = {
	endpoint: `${appOrigin}/v1/checkout/sessions`,
	// ${appOrigin}/orders/success?session_id={CHECKOUT_SESSION_ID}
	successUrl: `${appOrigin}/`,
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

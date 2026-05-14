import { useMemo, useState } from "react";
import { FabricatorSelector } from "./components/FabricatorSelector";
import { PcbPreview } from "./components/PcbPreview";
import { QuantitySelector } from "./components/QuantitySelector";
import { SpecificationsList } from "./components/SpecificationsList";
import { ArrowRight, CloseIcon } from "./components/icons";
import {
	DEFAULT_AUTOFIX_ISSUES,
	DEFAULT_PRICE_PER_BOARD,
	defaultFabricators,
	defaultProject,
	defaultSpecifications,
} from "./defaults";
import type {
	CheckoutSession,
	CreateCheckoutSessionRequest,
} from "@tscircuit/fake-stripe/types";
import type {
	CheckoutSessionContext,
	OrderDialogCheckout,
	OrderDialogProps,
	OrderQuantity,
} from "./types";
import {
	getDisabledReason,
	isTsfDisabled,
	parseEffectiveQuantity,
} from "./utils";

let nextOrderId = 1;

export function OrderDialog({
	project = defaultProject,
	boardImage,
	specifications = defaultSpecifications,
	fabricators = defaultFabricators,
	defaultQuantity = 1,
	defaultCustomQuantity = "",
	autofixIssues = DEFAULT_AUTOFIX_ISSUES,
	checkout,
	onClose,
	onSubmit,
}: OrderDialogProps) {
	const [qty, setQty] = useState<OrderQuantity>(defaultQuantity);
	const [customQty, setCustomQty] = useState(defaultCustomQuantity);
	const [selected, setSelected] = useState(fabricators[0]?.id ?? "");
	const [isPlacingOrder, setIsPlacingOrder] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const { customParsed, effectiveQty } = parseEffectiveQuantity(qty, customQty);
	const selectedFab =
		fabricators.find((fab) => fab.id === selected) ?? fabricators[0];
	const tsfDisabled = isTsfDisabled(selectedFab, qty, customParsed);
	const disabledReason = getDisabledReason(selectedFab, tsfDisabled);
	const autofixOn = qty === "custom" && customParsed >= 25;
	const total = useMemo(
		() =>
			effectiveQty * (selectedFab?.pricePerBoard ?? DEFAULT_PRICE_PER_BOARD),
		[effectiveQty, selectedFab],
	);

	const handleSubmit = async () => {
		if (!selectedFab || tsfDisabled || effectiveQty === 0 || isPlacingOrder)
			return;

		const orderId = createOrderId();
		const unitAmount = Math.round(selectedFab.pricePerBoard * 100);

		setIsPlacingOrder(true);
		setSubmitError(null);

		try {
			if (!checkout) {
				throw new Error("Checkout is not configured");
			}

			const context: CheckoutSessionContext = {
				orderId,
				quantity: effectiveQty,
				fabricator: selectedFab,
				total,
				autofixRequired: autofixOn,
				project,
			};
			const request = createCheckoutSessionRequest(
				checkout,
				context,
				unitAmount,
			);
			const session = await createCheckoutSession(checkout, request, context);

			if (typeof session.url !== "string" || session.url.length === 0) {
				throw new Error("Checkout session did not include a redirect URL");
			}

			onSubmit?.({
				quantity: effectiveQty,
				fabricatorId: selectedFab.id,
				total,
				autofixRequired: autofixOn,
			});

			window.location.href = session.url;
		} catch (error) {
			setSubmitError(
				error instanceof Error ? error.message : "Unable to place order",
			);
			setIsPlacingOrder(false);
		}
	};

	return (
		<div className="od-page-backdrop">
			<div className="od-scrim" />
			<div
				className="od-dialog"
				role="dialog"
				aria-labelledby="od-dialog-title"
			>
				<div className="od-pane-left">
					<div className="od-project-header">
						<div>
							<div className="od-project-title">{project.name}</div>
							<div className="od-project-version">{project.version}</div>
						</div>
					</div>

					<PcbPreview
						boardImage={boardImage}
						dimensions={project.dimensions ?? defaultProject.dimensions}
					/>
					<SpecificationsList specifications={specifications} />
				</div>

				<div className="od-pane-right">
					<div className="od-dialog-header">
						<div>
							<h2 id="od-dialog-title" className="od-dialog-title">
								Order PCB
							</h2>
							<p className="od-dialog-subtitle">
								Bare board manufacturing · ships in 3-5 days
							</p>
						</div>
						<button
							className="od-close-btn"
							aria-label="Close"
							onClick={onClose}
							type="button"
						>
							<CloseIcon />
						</button>
					</div>

					<QuantitySelector
						qty={qty}
						customQty={customQty}
						onQtyChange={setQty}
						onCustomQtyChange={setCustomQty}
					/>

					<FabricatorSelector
						autofixIssues={autofixIssues}
						autofixOn={autofixOn}
						disabledReason={disabledReason}
						effectiveQty={effectiveQty}
						fabricators={fabricators}
						selected={selected}
						selectedFabId={selectedFab?.id}
						tsfDisabled={tsfDisabled}
						onSelectedChange={setSelected}
					/>

					{/* Shipping and payment sections are intentionally disabled. */}
					{/*
          <ShippingSection address={address} />
          <PaymentSection autofixOn={autofixOn} />
          */}

					<div className="od-dialog-footer">
						<div className="od-total-block">
							<span className="od-total-label">Total</span>
							<span className="od-total-amount">${total.toFixed(2)}</span>
							<span className="od-total-sub">incl. shipping & tax</span>
							{submitError != null ? (
								<span className="od-submit-error" role="alert">
									{submitError}
								</span>
							) : null}
						</div>
						<button
							className="od-btn-primary"
							disabled={tsfDisabled || effectiveQty === 0 || isPlacingOrder}
							onClick={handleSubmit}
							type="button"
						>
							{isPlacingOrder ? "Redirecting..." : "Place order"}
							<ArrowRight />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function createOrderId() {
	return `order_${nextOrderId++}`;
}

function createCheckoutSessionRequest(
	checkout: OrderDialogCheckout,
	context: CheckoutSessionContext,
	unitAmount: number,
): CreateCheckoutSessionRequest {
	return {
		mode: "payment",
		client_reference_id: context.orderId,
		line_items: [
			{
				price_data: {
					currency: checkout.currency ?? "usd",
					unit_amount: unitAmount,
					product_data: {
						name: `${context.project.name} PCB fabrication`,
						description: context.fabricator.name,
						metadata: {
							fabricator_id: context.fabricator.id,
							autofix_required: context.autofixRequired,
						},
					},
				},
				quantity: context.quantity,
				metadata: {
					fabricator_id: context.fabricator.id,
				},
			},
		],
		success_url: checkout.successUrl ?? "",
		cancel_url: checkout.cancelUrl ?? "",
	};
}

async function createCheckoutSession(
	checkout: OrderDialogCheckout,
	request: CreateCheckoutSessionRequest,
	context: CheckoutSessionContext,
): Promise<CheckoutSession> {
	if (checkout.createSession) {
		return checkout.createSession(request, context);
	}

	if (!checkout.endpoint || !checkout.successUrl || !checkout.cancelUrl) {
		throw new Error(
			"Checkout endpoint, success URL, and cancel URL are required",
		);
	}

	const res = await fetch(checkout.endpoint, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(request),
	});

	if (!res.ok) {
		throw new Error(`Unable to create checkout session (${res.status})`);
	}

	return res.json();
}

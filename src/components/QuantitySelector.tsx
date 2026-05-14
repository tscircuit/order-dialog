import type { OrderQuantity } from "../types";

interface QuantitySelectorProps {
	qty: OrderQuantity;
	customQty: string;
	onQtyChange: (qty: OrderQuantity) => void;
	onCustomQtyChange: (customQty: string) => void;
}

export function QuantitySelector({
	qty,
	customQty,
	onQtyChange,
	onCustomQtyChange,
}: QuantitySelectorProps) {
	return (
		<div className="od-field-group">
			<div className="od-field-label">
				<span>Quantity</span>
			</div>
			<div className="od-qty-row">
				{/* TODO: Add more quantities option */}
				{[1].map((quantity) => (
					<button
						key={quantity}
						className={`od-qty-btn ${qty === quantity ? "active" : ""}`}
						onClick={() => {
							onQtyChange(quantity as OrderQuantity);
							onCustomQtyChange("");
						}}
						type="button"
					>
						{quantity}
					</button>
				))}
			</div>
		</div>
	);
}

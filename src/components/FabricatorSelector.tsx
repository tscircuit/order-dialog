import type { AutofixIssue, Fabricator } from "../types";
import { AutofixDetails } from "./AutofixDetails";
import {
	AutofixBadge,
	ClockIcon,
	FlagUS,
	TruckIcon,
	WarningIcon,
} from "./icons";

interface FabricatorSelectorProps {
	autofixIssues: AutofixIssue[];
	autofixOn: boolean;
	disabledReason?: string;
	effectiveQty: number;
	fabricators: Fabricator[];
	selected: string;
	selectedFabId?: string;
	tsfDisabled: boolean;
	onSelectedChange: (fabricatorId: string) => void;
}

export function FabricatorSelector({
	autofixIssues,
	autofixOn,
	disabledReason,
	effectiveQty,
	fabricators,
	selected,
	selectedFabId,
	tsfDisabled,
	onSelectedChange,
}: FabricatorSelectorProps) {
	return (
		<div className="od-field-group">
			<div className="od-field-label">
				<span>Fabricator</span>
				<span className="od-free-ship-pill">Free shipping · US & CA</span>
			</div>

			{fabricators.map((fab) => {
				const disabled = fab.id === selectedFabId && tsfDisabled;
				const selectedFabRow = fab.id === selected && !disabled;

				return (
					<div
						className={`od-fab-row ${selectedFabRow ? "selected" : ""} ${disabled ? "disabled" : ""}`}
						onClick={() => {
							if (!disabled) onSelectedChange(fab.id);
						}}
						onKeyDown={(event) => {
							if (!disabled && (event.key === "Enter" || event.key === " "))
								onSelectedChange(fab.id);
						}}
						role="radio"
						aria-checked={selectedFabRow}
						aria-disabled={disabled}
						tabIndex={disabled ? -1 : 0}
						key={fab.id}
					>
						<span className="od-radio-dot" />
						{fab.countryCode === "US" ? <FlagUS /> : null}
						<div className="od-fab-content">
							<div className="od-fab-name-row">
								<span>{fab.name}</span>
								{autofixOn && !disabled ? <AutofixBadge /> : null}
							</div>
							<div className="od-fab-meta">
								<span className="od-inline-meta">
									<ClockIcon /> {fab.eta}
								</span>
								<span className="od-dot" />
								<span className="od-inline-meta">
									<TruckIcon /> {fab.freeShippingLabel}
								</span>
								{disabled ? (
									<>
										<span className="od-dot" />
										<span className="od-warn-text">
											Unavailable for 10+ qty
										</span>
									</>
								) : null}
							</div>
						</div>
						<div>
							<div className="od-fab-price">
								$
								{disabled ? "-" : (effectiveQty * fab.pricePerBoard).toFixed(2)}
							</div>
							<div className="od-fab-price-sub">
								${fab.pricePerBoard.toFixed(2)} x {effectiveQty || 0}
							</div>
						</div>
					</div>
				);
			})}

			{disabledReason ? (
				<div className="od-qty-warning">
					<WarningIcon />
					{disabledReason}
				</div>
			) : (
				<AutofixDetails issues={autofixIssues} />
			)}
		</div>
	);
}

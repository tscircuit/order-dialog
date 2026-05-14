import { useMemo, useState } from "react"
import { FabricatorSelector } from "./components/FabricatorSelector"
import { PcbPreview } from "./components/PcbPreview"
import { QuantitySelector } from "./components/QuantitySelector"
import { SpecificationsList } from "./components/SpecificationsList"
import { ArrowRight, CloseIcon } from "./components/icons"
import {
  DEFAULT_AUTOFIX_ISSUES,
  DEFAULT_PRICE_PER_BOARD,
  defaultFabricators,
  defaultProject,
  defaultSpecifications,
} from "./defaults"
import type { OrderDialogProps, OrderQuantity } from "./types"
import { getDisabledReason, isTsfDisabled, parseEffectiveQuantity } from "./utils"

export function OrderDialog({
  project = defaultProject,
  boardImage,
  specifications = defaultSpecifications,
  fabricators = defaultFabricators,
  defaultQuantity = 1,
  defaultCustomQuantity = "",
  autofixIssues = DEFAULT_AUTOFIX_ISSUES,
  onClose,
  onSubmit,
}: OrderDialogProps) {
  const [qty, setQty] = useState<OrderQuantity>(defaultQuantity)
  const [customQty, setCustomQty] = useState(defaultCustomQuantity)
  const [selected, setSelected] = useState(fabricators[0]?.id ?? "")

  const { customParsed, effectiveQty } = parseEffectiveQuantity(qty, customQty)
  const selectedFab = fabricators.find((fab) => fab.id === selected) ?? fabricators[0]
  const tsfDisabled = isTsfDisabled(selectedFab, qty, customParsed)
  const disabledReason = getDisabledReason(selectedFab, tsfDisabled)
  const autofixOn = qty === "custom" && customParsed >= 25
  const total = useMemo(
    () => effectiveQty * (selectedFab?.pricePerBoard ?? DEFAULT_PRICE_PER_BOARD),
    [effectiveQty, selectedFab],
  )

  const handleSubmit = () => {
    if (!selectedFab || tsfDisabled || effectiveQty === 0) return

    onSubmit?.({
      quantity: effectiveQty,
      fabricatorId: selectedFab.id,
      total,
      autofixRequired: autofixOn,
    })
  }

  return (
    <div className="od-page-backdrop">
      <div className="od-scrim" />
      <div className="od-dialog" role="dialog" aria-labelledby="od-dialog-title">
        <div className="od-pane-left">
          <div className="od-project-header">
            <div>
              <div className="od-project-title">{project.name}</div>
              <div className="od-project-version">{project.version}</div>
            </div>
          </div>

          <PcbPreview boardImage={boardImage} dimensions={project.dimensions ?? defaultProject.dimensions} />
          <SpecificationsList specifications={specifications} />
        </div>

        <div className="od-pane-right">
          <div className="od-dialog-header">
            <div>
              <h2 id="od-dialog-title" className="od-dialog-title">
                Order PCB
              </h2>
              <p className="od-dialog-subtitle">Bare board manufacturing · ships in 3-5 days</p>
            </div>
            <button className="od-close-btn" aria-label="Close" onClick={onClose} type="button">
              <CloseIcon />
            </button>
          </div>

          <QuantitySelector qty={qty} customQty={customQty} onQtyChange={setQty} onCustomQtyChange={setCustomQty} />

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
            </div>
            <button
              className="od-btn-primary"
              disabled={tsfDisabled || effectiveQty === 0}
              onClick={handleSubmit}
              type="button"
            >
              Place order
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

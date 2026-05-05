import { useMemo, useState } from "react"

const DEFAULT_PRICE_PER_BOARD = 5

const AUTOFIX_TIP =
  "Your board exceeds tscircuit SF's specs. We'll auto-fix it and send a revised version for review - you'll have 24h to accept, otherwise changes auto-accept and ship."

const DEFAULT_AUTOFIX_ISSUES: AutofixIssue[] = [
  {
    label: "Via diameter too large",
    detail: "Reduce 0.6mm vias to 0.4mm (fab max)",
  },
  {
    label: "Board too large",
    detail: "46x30mm exceeds 100x100mm panel limit - wait, this fits",
  },
  {
    label: "Trace width below minimum",
    detail: "Widen 4mil traces to 6mil minimum",
  },
  {
    label: "Drill hit too close to edge",
    detail: "Move 2 holes >=0.3mm from board edge",
  },
  {
    label: "Silkscreen overlapping pad",
    detail: "Reposition reference designators clear of pads",
  },
]

export type OrderQuantity = 1 | 3 | 10 | "custom"

export interface SavedAddress {
  name: string
  line1: string
  line2?: string
  cityState: string
  country: string
}

export interface AutofixIssue {
  label: string
  detail: string
}

export interface Fabricator {
  id: string
  name: string
  countryCode?: "US"
  eta: string
  pricePerBoard: number
  freeShippingLabel: string
  disabledReason?: string
}

export interface OrderDialogProps {
  project?: {
    name: string
    version: string
    dimensions?: string
  }
  address?: SavedAddress
  fabricators?: Fabricator[]
  defaultQuantity?: OrderQuantity
  defaultCustomQuantity?: string
  autofixIssues?: AutofixIssue[]
  onClose?: () => void
  onSubmit?: (order: {
    quantity: number
    fabricatorId: string
    total: number
    autofixRequired: boolean
  }) => void
}

const defaultProject = {
  name: "my-blinker-v3.tsx",
  version: "commit 8a4f29c · main",
  dimensions: "42 x 28 mm",
}

const defaultAddress: SavedAddress = {
  name: "Alex Chen",
  line1: "482 Valencia Street",
  line2: "Apt 3B",
  cityState: "San Francisco, CA 94103",
  country: "United States",
}

const defaultFabricators: Fabricator[] = [
  {
    id: "tsf",
    name: "tscircuit San Francisco",
    countryCode: "US",
    eta: "3-5 days",
    pricePerBoard: DEFAULT_PRICE_PER_BOARD,
    freeShippingLabel: "Free shipping",
  },
]

function FlagUS() {
  return (
    <svg
      className="od-fab-flag"
      viewBox="0 0 22 16"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-label="United States"
    >
      <rect width="22" height="16" fill="#fff" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect
          key={i}
          x="0"
          y={(i * 16) / 7 + 16 / 14}
          width="22"
          height={16 / 14}
          fill="#b22234"
        />
      ))}
      <rect width="9.6" height="8.6" fill="#3c3b6e" />
    </svg>
  )
}

function Pcb2D() {
  const holes = [
    [22, 22],
    [178, 22],
    [22, 118],
    [178, 118],
  ]
  const pads = [
    [40, 40],
    [80, 60],
    [130, 60],
    [160, 80],
    [50, 100],
    [120, 75],
    [40, 70],
    [70, 70],
  ]

  return (
    <svg
      className="od-pcb-2d-svg"
      viewBox="0 0 200 140"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PCB preview"
    >
      <defs>
        <linearGradient id="od-board-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="10"
        width="180"
        height="120"
        rx="4"
        fill="url(#od-board-grad)"
        stroke="#052e16"
        strokeWidth="0.6"
      />
      {holes.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="4" fill="#0a3d1a" />
          <circle cx={x} cy={y} r="2" fill="#fafafa" />
        </g>
      ))}
      <path
        d="M 40 40 L 80 40 L 80 60 L 130 60 L 130 80 L 160 80"
        stroke="#fbbf24"
        strokeWidth="1.5"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M 50 100 L 90 100 L 90 75 L 120 75"
        stroke="#fbbf24"
        strokeWidth="1.5"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M 40 70 L 70 70"
        stroke="#fbbf24"
        strokeWidth="1.5"
        fill="none"
        opacity="0.75"
      />
      {pads.map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="2.2"
          fill="#fbbf24"
          stroke="#92400e"
          strokeWidth="0.4"
        />
      ))}
      <rect
        x="95"
        y="35"
        width="22"
        height="14"
        rx="1"
        fill="#1c1917"
        stroke="#000"
        strokeWidth="0.4"
      />
      <circle cx="98" cy="38" r="0.8" fill="#71717a" />
      <text
        x="20"
        y="135"
        fontSize="4"
        fill="#ffffff"
        opacity="0.6"
        fontFamily="monospace"
      >
        tscircuit · my-blinker-v3
      </text>
    </svg>
  )
}

function Pcb3D() {
  return (
    <div className="od-pcb-3d-wrap" aria-label="PCB 3D preview">
      <div className="od-pcb-3d">
        <div className="od-pcb-3d-board" />
      </div>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 3L13 13M13 3L3 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg className="od-card-icon" width="18" height="14" viewBox="0 0 24 18" fill="none">
      <rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="16.5"
        rx="2.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M0 5H24" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="od-meta-icon">
      <path d="M1 4H10V11H1V4Z" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M10 6H13L15 8.5V11H10V6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="4" cy="12" r="1.4" fill="currentColor" stroke="white" strokeWidth="0.6" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="white" strokeWidth="0.6" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="od-meta-icon">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 4V8L10.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AutofixBadge() {
  return (
    <span className="od-autofix-badge" data-tip={AUTOFIX_TIP} tabIndex={0} aria-label="Autofix required">
      <svg width="9" height="9" viewBox="0 0 16 16" fill="none">
        <path d="M8 1L15 14H1L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 6V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11.5" r="0.8" fill="currentColor" />
      </svg>
    </span>
  )
}

function AutofixDetails({ issues }: { issues: AutofixIssue[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`od-autofix-details ${open ? "open" : ""}`}>
      <button
        className="od-autofix-summary"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        type="button"
      >
        <span className="od-caret" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M3 2L7 5L3 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>Auto-Fixable Issues</span>
        <span className="od-autofix-count">{issues.length}</span>
      </button>
      {open ? (
        <div className="od-autofix-body">
          <p className="od-autofix-explainer">
            If you order from a fabricator that can't manufacture this board as-is, tscircuit will automatically
            revise it for that fab. You'll receive the revised board for review and have <strong>24 hours</strong> to
            accept - otherwise changes auto-accept and the board ships.
          </p>
          <ul className="od-autofix-issue-list">
            {issues.map((issue) => (
              <li key={issue.label}>
                <span className="od-autofix-issue-dot" aria-hidden="true" />
                <div>
                  <div className="od-autofix-issue-title">{issue.label}</div>
                  <div className="od-autofix-issue-detail">{issue.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export function OrderDialog({
  project = defaultProject,
  address = defaultAddress,
  fabricators = defaultFabricators,
  defaultQuantity = 1,
  defaultCustomQuantity = "",
  autofixIssues = DEFAULT_AUTOFIX_ISSUES,
  onClose,
  onSubmit,
}: OrderDialogProps) {
  const [qty, setQty] = useState<OrderQuantity>(defaultQuantity)
  const [customQty, setCustomQty] = useState(defaultCustomQuantity)
  const [view, setView] = useState<"2d" | "3d">("2d")
  const [selected, setSelected] = useState(fabricators[0]?.id ?? "")

  const customParsed = Number.parseInt(customQty, 10)
  const effectiveQty = qty === "custom" ? (Number.isFinite(customParsed) && customParsed > 0 ? customParsed : 0) : qty
  const selectedFab = fabricators.find((fab) => fab.id === selected) ?? fabricators[0]
  const tsfDisabled =
    selectedFab?.id === "tsf" && ((qty === "custom" && customParsed >= 10) || qty === 10)
  const disabledReason =
    selectedFab?.disabledReason ??
    (tsfDisabled
      ? "tscircuit SF has a per-order cap of 3 boards. Reduce quantity or check back as more fabricators come online."
      : undefined)
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

          <div className="od-preview-frame">
            <div className="od-preview-toolbar">
              <button
                className={view === "2d" ? "active" : ""}
                onClick={() => setView("2d")}
                type="button"
              >
                2D
              </button>
              <button
                className={view === "3d" ? "active" : ""}
                onClick={() => setView("3d")}
                type="button"
              >
                3D
              </button>
            </div>
            <div className="od-preview-content">{view === "2d" ? <Pcb2D /> : <Pcb3D />}</div>
            <div className="od-preview-dim-label">{project.dimensions ?? defaultProject.dimensions}</div>
          </div>

          <div>
            <div className="od-pane-section-label">Specifications</div>
            <dl className="od-spec-list">
              <dt>Layers</dt>
              <dd>2</dd>
              <dt>Thickness</dt>
              <dd>1.6 mm</dd>
              <dt>Material</dt>
              <dd>FR-4</dd>
              <dt>Finish</dt>
              <dd>HASL</dd>
              <dt>Soldermask</dt>
              <dd>Green</dd>
              <dt>Min trace</dt>
              <dd>6 mil</dd>
              <dt>Min hole</dt>
              <dd>0.3 mm</dd>
            </dl>
          </div>
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

          <div className="od-field-group">
            <div className="od-field-label">
              <span>Quantity</span>
            </div>
            <div className="od-qty-row">
              {[1, 3, 10].map((quantity) => (
                <button
                  key={quantity}
                  className={`od-qty-btn ${qty === quantity ? "active" : ""}`}
                  onClick={() => {
                    setQty(quantity as 1 | 3 | 10)
                    setCustomQty("")
                  }}
                  type="button"
                >
                  {quantity}
                </button>
              ))}
              <button
                className={`od-qty-btn ${qty === "custom" ? "active" : ""}`}
                onClick={() => setQty("custom")}
                type="button"
              >
                10+
              </button>
              {qty === "custom" ? (
                <input
                  type="number"
                  min="11"
                  className="od-qty-input"
                  placeholder="Qty"
                  value={customQty}
                  onChange={(event) => setCustomQty(event.target.value)}
                  autoFocus
                />
              ) : null}
            </div>
          </div>

          <div className="od-field-group">
            <div className="od-field-label">
              <span>Fabricator</span>
              <span className="od-free-ship-pill">Free shipping · US & CA</span>
            </div>

            {fabricators.map((fab) => {
              const disabled = fab.id === selectedFab?.id && tsfDisabled
              const selectedFabRow = fab.id === selected && !disabled

              return (
                <div
                  className={`od-fab-row ${selectedFabRow ? "selected" : ""} ${disabled ? "disabled" : ""}`}
                  onClick={() => {
                    if (!disabled) setSelected(fab.id)
                  }}
                  onKeyDown={(event) => {
                    if (!disabled && (event.key === "Enter" || event.key === " ")) setSelected(fab.id)
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
                          <span className="od-warn-text">Unavailable for 10+ qty</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <div className="od-fab-price">${disabled ? "-" : (effectiveQty * fab.pricePerBoard).toFixed(2)}</div>
                    <div className="od-fab-price-sub">
                      ${fab.pricePerBoard.toFixed(2)} x {effectiveQty || 0}
                    </div>
                  </div>
                </div>
              )
            })}

            {disabledReason ? (
              <div className="od-qty-warning">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M8 5V8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <circle cx="8" cy="11" r="0.7" fill="currentColor" />
                </svg>
                {disabledReason}
              </div>
            ) : (
              <AutofixDetails issues={autofixIssues} />
            )}
          </div>

          <div className="od-field-group">
            <div className="od-field-label">
              <span>Ship to</span>
              <button className="od-change-link" type="button">
                Change
              </button>
            </div>
            <div className="od-saved-address">
              <div>
                <div className="od-address-name">{address.name}</div>
                <div className="od-address-line">
                  {address.line1}
                  {address.line2 ? `, ${address.line2}` : ""}
                </div>
                <div className="od-address-line">
                  {address.cityState} · {address.country}
                </div>
              </div>
            </div>
          </div>

          <div className="od-field-group">
            <div className="od-field-label">
              <span>Payment</span>
            </div>
            <div className="od-card-field">
              <CardIcon />
              <input className="od-card-num" placeholder="1234 1234 1234 1234" aria-label="Card number" />
              <span className="od-divider" />
              <input className="od-card-exp" placeholder="MM / YY" aria-label="Expiration date" />
              <span className="od-divider" />
              <input className="od-card-cvc" placeholder="CVC" aria-label="CVC" />
            </div>
            {autofixOn ? (
              <div className="od-fine-print">
                <strong>Autofix notice:</strong> your board exceeds tscircuit SF's manufacturing specs and will be
                automatically revised. You'll receive the updated board within ~10 minutes and have <strong>24 hours</strong>{" "}
                to accept. After 24h, changes auto-accept and the board ships.
              </div>
            ) : null}
          </div>

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

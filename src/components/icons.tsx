import { AUTOFIX_TIP } from "../defaults"

export function FlagUS() {
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

export function CloseIcon() {
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

export function CardIcon() {
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

export function TruckIcon() {
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

export function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="od-meta-icon">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 4V8L10.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function ArrowRight() {
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

export function AutofixBadge() {
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

export function WarningIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 5V8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.7" fill="currentColor" />
    </svg>
  )
}

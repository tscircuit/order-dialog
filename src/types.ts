import type { ReactNode } from "react"

export type OrderQuantity = 1 | 3 | 10 | "custom"

export interface ProjectDetails {
  name: string
  version: string
  dimensions?: string
}

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

export interface BoardSpecification {
  label: string
  value: ReactNode
}

export type BoardImage =
  | string
  | {
      src: string
      alt?: string
    }

export interface OrderDialogProps {
  project?: ProjectDetails
  boardImage?: BoardImage
  specifications?: BoardSpecification[]
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

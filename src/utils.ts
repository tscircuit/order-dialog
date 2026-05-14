import type { BoardImage, Fabricator, OrderQuantity } from "./types"

export function parseEffectiveQuantity(qty: OrderQuantity, customQty: string) {
  const customParsed = Number.parseInt(customQty, 10)
  const effectiveQty =
    qty === "custom" ? (Number.isFinite(customParsed) && customParsed > 0 ? customParsed : 0) : qty

  return { customParsed, effectiveQty }
}

export function isTsfDisabled(selectedFab: Fabricator | undefined, qty: OrderQuantity, customParsed: number) {
  return selectedFab?.id === "tsf" && ((qty === "custom" && customParsed >= 10) || qty === 10)
}

export function getDisabledReason(selectedFab: Fabricator | undefined, tsfDisabled: boolean) {
  return (
    selectedFab?.disabledReason ??
    (tsfDisabled
      ? "tscircuit SF has a per-order cap of 3 boards. Reduce quantity or check back as more fabricators come online."
      : undefined)
  )
}

export function getBoardImageProps(boardImage: BoardImage | undefined) {
  return {
    src: typeof boardImage === "string" ? boardImage : boardImage?.src,
    alt: typeof boardImage === "string" ? "PCB preview" : (boardImage?.alt ?? "PCB preview"),
  }
}

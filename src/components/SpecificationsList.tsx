import { Fragment } from "react"
import type { BoardSpecification } from "../types"

export function SpecificationsList({ specifications }: { specifications: BoardSpecification[] }) {
  return (
    <div>
      <div className="od-pane-section-label">Specifications</div>
      <dl className="od-spec-list">
        {specifications.map((spec, index) => (
          <Fragment key={`${spec.label}-${index}`}>
            <dt>{spec.label}</dt>
            <dd>{spec.value}</dd>
          </Fragment>
        ))}
      </dl>
    </div>
  )
}

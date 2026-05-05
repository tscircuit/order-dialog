import { OrderDialog } from "./OrderDialog"

export function App() {
  return (
    <OrderDialog
      project={{
        name: "my-blinker-v3.tsx",
        version: "commit 8a4f29c · main",
      }}
      address={{
        name: "Alex Chen",
        line1: "482 Valencia Street",
        line2: "Apt 3B",
        cityState: "San Francisco, CA 94103",
        country: "United States",
      }}
    />
  )
}

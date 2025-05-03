import { Suspense } from "react"
import ClientMarket from "./components/ClientMarket"

export default function MarketPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading market…</div>}>
      <ClientMarket />
    </Suspense>
  );
}

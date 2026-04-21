"use client";

import { useMarketSocket } from "./hooks/useMarketSocket";
import { MarketGroupTable } from "./components/MarketGroupTable";
import { MarketAsset, MarketGroup, MARKET_GROUPS } from "./domain/market";

export default function Home() {
  const assets = useMarketSocket();

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-6">
        📈 Market Dashboard
      </h1>

      {assets.length === 0 ? (
        <p>Conectando aos dados...</p>
      ) : (
        Object.values(MARKET_GROUPS).map((group) => (
          <MarketGroupTable
            key={group}
            group={group}
            assets={assets}
          />
        ))
      )}
    </main>
  );
}

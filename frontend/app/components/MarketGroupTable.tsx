"use client";

import { MarketAsset, MarketGroup, MARKET_GROUPS } from "../domain/market";
import { MarketTable } from "./MarketTable";

const groupIcons: Record<MarketGroup, string> = {
  [MARKET_GROUPS.CAMBIO]: "💱",
  [MARKET_GROUPS.JUROS_BR]: "💲",
  [MARKET_GROUPS.INDICES_BRL]: "📈",
  [MARKET_GROUPS.COMMODITIES_BR]: "⛏️",
  [MARKET_GROUPS.INDICES_USA]: "📊",
  [MARKET_GROUPS.DOLAR_JUROS]: "💵",
  [MARKET_GROUPS.COMMODITIES]: "🛢️",
  [MARKET_GROUPS.CRYPTO]: "🪙",
  [MARKET_GROUPS.FOREX]: "💹",
  [MARKET_GROUPS.OTHER]: "📁"
};

export function MarketGroupTable({
  group,
  assets
}: {
  group: MarketGroup;
  assets: MarketAsset[];
}) {
  const filtered = assets.filter((a) => a.group === group);

  if (filtered.length === 0) return null;

  return (
    <section className="mb-10">
      <br/>
      <h2 className="text-lg font-bold mb-3">
        {groupIcons[group]} {group}
      </h2>
      <MarketTable assets={filtered} />
    </section>
  );
}

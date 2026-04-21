import { MarketAsset } from "./market";

const PRICE_ADJUSTMENTS: Record<string, (price: number) => number> = {
  "^TNX": (price) => price / 10
};

export function normalizePrice(symbol: string, price: number): number {
  const adjust = PRICE_ADJUSTMENTS[symbol];
  return adjust ? adjust(price) : price;
}

export function normalizeTimestamp(ts: number): number {
  if (!ts) return Date.now();

  if (ts > 1e15) return Math.floor(ts / 1000); // micros → ms
  if (ts < 1e12) return ts * 1000; // sec → ms

  return ts;
}

export function normalizeAsset(asset: MarketAsset): MarketAsset {
  return {
    ...asset,
    price: normalizePrice(asset.symbol, asset.price),
    timestamp: normalizeTimestamp(asset.timestamp)
  };
}

import { Strategy } from "./strategy.types";
import { MarketAsset } from "../domain/market";

export function calculateStrategy(
  strategy: Strategy,
  assets: MarketAsset[]
) {
  const assetMap = new Map(assets.map(a => [a.symbol, a]));

  let finalScore = 0;

  for (const group of strategy.groups) {
    let groupScore = 0;

    for (const asset of group.assets) {
      const data = assetMap.get(asset.symbol);
      if (!data) continue;

      groupScore += data.change * asset.weight;
    }

    finalScore += groupScore * group.weight;
  }

  return {
    name: strategy.name,
    score: finalScore,
    timestamp: Date.now()
  };
}
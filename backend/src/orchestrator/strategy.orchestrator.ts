import { MarketAsset } from "../domain/market";
import { Strategy, StrategyResult } from "../strategy/types";

export function computeStrategy(
  strategy: Strategy,
  assets: MarketAsset[]
): StrategyResult {
  let score = 0;
  let count = 0;

  for (const item of strategy.assets) {
    const asset = assets.find(a => a.symbol === item.symbol);
    if (!asset) continue;

    score += asset.change * item.weight;
    count++;
  }

  const finalScore = count > 0 ? score / count : 0;

  let direction: StrategyResult["direction"] = "NEUTRAL";

  if (finalScore > 0.2) direction = "BULLISH";
  else if (finalScore < -0.2) direction = "BEARISH";

  return {
    name: strategy.name,
    target: strategy.target,
    score: Number(finalScore.toFixed(3)),
    direction,
    timestamp: Date.now()
  };
}
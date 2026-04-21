import { MarketAsset } from "../domain/market";

export type CorrelatedAsset = {
  symbol: string;
  weight: number;
};

export type Strategy = {
  name: string;
  target: string;
  assets: CorrelatedAsset[];
};

export type StrategyResult = {
  name: string;
  target: string;
  score: number;
  direction: "BULLISH" | "BEARISH" | "NEUTRAL";
  timestamp: number;
};
import { Strategy } from "./types";

export const NASDAQ_STRATEGY: Strategy = {
  name: "NASDAQ Pressure",
  target: "^IXIC",
  assets: [
    { symbol: "^GSPC", weight: 0.3 },      // S&P 500
    { symbol: "DX-Y.NYB", weight: -0.2 },  // DXY
    { symbol: "^TNX", weight: -0.2 },      // 10Y Yield
    { symbol: "^VIX", weight: -0.3 }       // VIX
  ]
};
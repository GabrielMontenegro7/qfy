import { MarketAsset } from "../domain/market";

const data = new Map<string, MarketAsset>();

export const marketStore = {
  async set(asset: MarketAsset): Promise<void> {
    data.set(asset.symbol, asset);
  },

  async get(symbol: string): Promise<MarketAsset | null> {
    return data.get(symbol) || null;
  },

  async getAll(): Promise<MarketAsset[]> {
    return Array.from(data.values());
  },

  // 🔥 ESSA FUNÇÃO TEM QUE EXISTIR
  async clear(): Promise<void> {
    data.clear();
  }
};

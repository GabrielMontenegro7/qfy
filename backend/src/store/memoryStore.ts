import { MarketAsset } from "../domain/market";

const store = new Map<string, MarketAsset>();

export const memoryStore = {
  async set(asset: MarketAsset) {
    store.set(asset.symbol, asset);
  },

  async get(symbol: string) {
    return store.get(symbol) ?? null;
  },

  async getAll() {
    return Array.from(store.values());
  }
};

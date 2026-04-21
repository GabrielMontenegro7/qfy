import { redisStore } from "./redisStore";
import { memoryStore } from "./memoryStore";
import { MarketAsset } from "../domain/market";

let redisEnabled = true;

export const marketStore = {
  async set(asset: MarketAsset) {
  if (!asset.group) {
    asset.group = "other";
  }

  if (!redisEnabled) return memoryStore.set(asset);

  try {
    await redisStore.set(asset);
  } catch {
    redisEnabled = false;
    await memoryStore.set(asset);
  }
}
,

  async get(symbol: string) {
    if (!redisEnabled) return memoryStore.get(symbol);

    try {
      return await redisStore.get(symbol);
    } catch {
      redisEnabled = false;
      return memoryStore.get(symbol);
    }
  },

  async getAll() {
    if (!redisEnabled) return memoryStore.getAll();

    try {
      return await redisStore.getAll();
    } catch {
      redisEnabled = false;
      return memoryStore.getAll();
    }
  }
};

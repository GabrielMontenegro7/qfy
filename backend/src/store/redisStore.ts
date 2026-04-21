import Redis from "ioredis";
import { MarketAsset } from "../domain/market";

let redis: Redis | null = null;
let enabled = false;

export function initRedis() {
  if (!process.env.REDIS_URL) {
    console.warn("⚠ Redis desativado (REDIS_URL ausente)");
    return;
  }

  redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 1,
    retryStrategy: () => null
  });

  redis.on("ready", () => {
    enabled = true;
    console.log("✅ Redis conectado");
  });

  redis.on("error", () => {
    console.warn("⚠ Redis indisponível, fallback para memória");
    enabled = false;
  });
}

export const redisStore = {
  async set(asset: MarketAsset) {
    if (!redis || !enabled) throw new Error("Redis off");
    await redis.hset(`asset:${asset.symbol}`, asset as any);
  },

  async get(symbol: string): Promise<MarketAsset | null> {
    if (!redis || !enabled) throw new Error("Redis off");
    const data = await redis.hgetall(`asset:${symbol}`);
    if (!data.symbol) return null;
    return normalize(data);
  },

  async getAll(): Promise<MarketAsset[]> {
    if (!redis || !enabled) throw new Error("Redis off");

    const keys = await redis.keys("asset:*");
    const results: MarketAsset[] = [];

    for (const key of keys) {
      const data = await redis.hgetall(key);
      if (data.symbol) results.push(normalize(data));
    }

    return results;
  }
};

function normalize(data: any): MarketAsset {
  return {
    symbol: data.symbol,
    name: data.name ?? data.symbol,
    group: data.group ?? "other",
    price: Number(data.price),
    change: Number(data.change),
    timestamp: Number(data.timestamp)
  };
}

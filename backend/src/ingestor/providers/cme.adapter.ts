import YahooFinance from "yahoo-finance2";
import { MarketProvider } from "./base.provider";
import { MarketAsset } from "../../domain/market";
import { normalizeAsset } from "../../domain/normalizer";
import { SYMBOL_MAP } from "../../config/symbol.map";

const yahoo = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

export class CMEAdapter implements MarketProvider {

  async fetch(): Promise<MarketAsset[]> {
    const results: MarketAsset[] = [];

    // 🔥 FILTRA SOMENTE CME
    const symbols = Object.entries(SYMBOL_MAP)
      .filter(([_, config]) => config.provider === "CME");

    for (const [key, config] of symbols) {
      try {
        console.log(`🔎 CME: ${key} -> ${config.symbol}`);

        const q = await yahoo.quote(config.symbol);

        // 🔥 fallback inteligente
        if (!q?.regularMarketPrice) {
          console.warn(`⚠️ CME fallback: ${key}`);

          const proxy = this.getProxy(key);
          if (!proxy) continue;

          const pq = await yahoo.quote(proxy);
          if (!pq?.regularMarketPrice) continue;

          results.push(this.normalize(key, config, pq));
          continue;
        }

        results.push(this.normalize(key, config, q));

      } catch (err) {
        console.error(`❌ CME erro: ${key}`, err);
      }
    }

    console.log(`✅ CME carregou ${results.length} ativos`);

    return results;
  }

  private normalize(key: string, config: any, q: any): MarketAsset {
    return normalizeAsset({
      symbol: key,
      name: config.name,      // ✅ vem do SYMBOL_MAP
      group: config.group,    // ✅ vem do SYMBOL_MAP
      price: q.regularMarketPrice,
      change: q.regularMarketChangePercent ?? 0,
      timestamp: q.regularMarketTime
        ? q.regularMarketTime * 1000
        : Date.now()
    });
  }

  private getProxy(key: string): string | null {
    const proxyMap: Record<string, string> = {
      VX1: "^VIX",
      DX1: "DX-Y.NYB",
      NQ1: "^IXIC",
      ZN1: "^TNX",
      ZT1: "^IRX", // 🔥 opcional (2Y proxy melhor)
    };

    return proxyMap[key] || null;
  }
}
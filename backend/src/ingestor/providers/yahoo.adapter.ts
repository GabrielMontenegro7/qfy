import YahooFinance from "yahoo-finance2";
import { MarketProvider } from "./base.provider";
import { MarketAsset } from "../../domain/market";
import { normalizeAsset } from "../../domain/normalizer";
import { SYMBOL_MAP } from "../../config/symbol.map";

const yahoo = new YahooFinance({
  suppressNotices: ["yahooSurvey"]
});

export class YahooAdapter implements MarketProvider {

  async fetch(): Promise<MarketAsset[]> {
    const results: MarketAsset[] = [];

    // 🔥 FILTRA APENAS YAHOO
    const symbols = Object.entries(SYMBOL_MAP)
      .filter(([_, config]) => config.provider === "YAHOO");

    for (const [key, config] of symbols) {
      try {
        console.log(`🔎 Yahoo: ${key} -> ${config.symbol}`);

        const q = await yahoo.quote(config.symbol);

        if (!q?.regularMarketPrice) {
          console.warn(`❌ Yahoo sem preço: ${key}`);
          continue;
        }

        const normalized = normalizeAsset({
          symbol: key,
          name: config.name,        // ✅ nome correto
          group: config.group,      // ✅ grupo vindo do map
          price: q.regularMarketPrice,
          change: q.regularMarketChangePercent ?? 0,
          timestamp: q.regularMarketTime
            ? q.regularMarketTime * 1000
            : Date.now()
        });

        results.push(normalized);

      } catch (err) {
        console.error(`❌ Yahoo erro: ${key}`, err);
      }
    }

    console.log(`✅ Yahoo carregou ${results.length} ativos`);

    return results;
  }
}
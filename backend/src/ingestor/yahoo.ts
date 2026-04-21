import YahooFinance from "yahoo-finance2";
import { marketStore } from "../store/marketStore";
import { ASSETS } from "../config/assets.config";

  const yahoo = new YahooFinance({
    suppressNotices: ["yahooSurvey"]
  });

export async function fetchYahooAssets() {
  for (const asset of ASSETS) {
    try {
      const q = await yahoo.quote(asset.symbol);

      if (!q?.regularMarketPrice) continue;

      await marketStore.set({
        symbol: asset.symbol,
        name: asset.name,
        group: asset.group,
        price: q.regularMarketPrice,
        change: q.regularMarketChangePercent ?? 0,
        timestamp: q.regularMarketTime
          ? q.regularMarketTime * 1000
          : Date.now()
      });

    } catch (err) {
      console.error(`Erro Yahoo (${asset.symbol})`, err);
    }
  }

  console.log("📈 Yahoo assets atualizados");
}

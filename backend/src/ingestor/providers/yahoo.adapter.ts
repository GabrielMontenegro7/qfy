import YahooFinance from "yahoo-finance2";
import { MarketProvider } from "./base.provider";
import { MarketAsset, MARKET_GROUPS } from "../../domain/market";
import { normalizeAsset } from "../../domain/normalizer";

const yahoo = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

type AssetConfig = {
  symbol: string;
  name: string;
  group: keyof typeof MARKET_GROUPS;
};

const ASSETS: AssetConfig[] = [
  { symbol: "USDBRL=X", name: "USD / BRL", group: "CAMBIO" },

  { symbol: "^BVSP", name: "IBOV", group: "INDICES_BRL" },
  { symbol: "EWZ", name: "EWZ ETF", group: "INDICES_BRL" },

  { symbol: "IO=F", name: "Minério de Ferro", group: "COMMODITIES_BR" },
  { symbol: "BZ=F", name: "Petróleo Brent", group: "COMMODITIES_BR" },

  { symbol: "^GSPC", name: "S&P 500", group: "INDICES_USA" },
  { symbol: "^IXIC", name: "NASDAQ", group: "INDICES_USA" },

  { symbol: "DX-Y.NYB", name: "DXY", group: "DOLAR_JUROS" },
  { symbol: "^IRX", name: "US 2Y Yield", group: "DOLAR_JUROS" },
  { symbol: "^TNX", name: "T-Note 10Y", group: "DOLAR_JUROS" },  

  { symbol: "GC=F", name: "Ouro", group: "COMMODITIES" },
  { symbol: "CL=F", name: "Petróleo", group: "COMMODITIES" },

  { symbol: "BTC-USD", name: "Bitcoin", group: "CRYPTO" },
  { symbol: "ETH-USD", name: "Ethereum", group: "CRYPTO" },
  { symbol: "ADA-USD", name: "Cardano", group: "CRYPTO" },
  { symbol: "SOL-USD", name: "Solana", group: "CRYPTO" },

  { symbol: "EURUSD=X", name: "EUR / USD", group: "FOREX" },
];

export class YahooAdapter implements MarketProvider {
  async fetch(): Promise<MarketAsset[]> {
    const results: MarketAsset[] = [];

    for (const asset of ASSETS) {
      try {
        const q = await yahoo.quote(asset.symbol);
        if (!q?.regularMarketPrice) continue;

        const normalized = normalizeAsset({
          symbol: asset.symbol,
          name: asset.name,
          group: MARKET_GROUPS[asset.group],
          price: q.regularMarketPrice,
          change: q.regularMarketChangePercent ?? 0,
          timestamp: q.regularMarketTime
            ? q.regularMarketTime * 1000
            : Date.now()
        });

        results.push(normalized);
      } catch (err) {
        console.error(`Erro Yahoo (${asset.symbol})`, err);
      }
    }

    return results;
  }
}

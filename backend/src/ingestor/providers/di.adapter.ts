import { MarketProvider } from "./base.provider";
import { MarketAsset, MARKET_GROUPS } from "../../domain/market";
import { normalizeAsset } from "../../domain/normalizer";

type DIContract = {
  code: string;
  maturity: string; // YYYY-MM-DD
};

const CONTRACTS: DIContract[] = [
  { code: "DI1F25", maturity: "2025-01-01" },
  { code: "DI1N25", maturity: "2025-07-01" },
  { code: "DI1F26", maturity: "2026-01-01" }
];

export class DIProvider implements MarketProvider {

async fetch(): Promise<MarketAsset[]> {
  try {
    const response = await fetch(
      "https://cotacao.b3.com.br/mds/api/v1/DerivativeQuotation/DI1",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json"
        }
      }
    );

    const data = await response.json();
    if (!data?.Scty) return [];

    const futures = data.Scty.filter(
      (s: any) =>
        s.mkt?.cd === "FUT" &&
        s.symb?.startsWith("DI1") &&
        s.SctyQtn?.curPrc
    );

    const contractMap = new Map(
      futures.map((c: any) => [c.symb, c])
    );

    // 🎯 Definição das âncoras
    const anchors = {
      curto: ["DI1F27"],
      medio: ["DI1F30", "DI1F29", "DI1F31"],
      longo: ["DI1F35", "DI1F40"]
    };

    function pickFirstAvailable(symbols: string[]) {
      for (const sym of symbols) {
        if (contractMap.has(sym)) {
          return contractMap.get(sym);
        }
      }
      return null;
    }

    const selected = [
      { label: "DI_CURTO", contract: pickFirstAvailable(anchors.curto) },
      { label: "DI_MEDIO", contract: pickFirstAvailable(anchors.medio) },
      { label: "DI_LONGO", contract: pickFirstAvailable(anchors.longo) }
    ].filter((a) => a.contract !== null);

    if (selected.length === 0) return [];

    const assets: MarketAsset[] = selected.map((item: any) => ({
      symbol: item.label,
      name: item.contract.symb,
      group: MARKET_GROUPS.JUROS_BR,
      price: item.contract.SctyQtn.curPrc,
      change: 0,
      timestamp: Date.now()
    }));

    // 📊 Média das âncoras
    const avg =
      selected.reduce(
        (acc: number, item: any) =>
          acc + item.contract.SctyQtn.curPrc,
        0
      ) / selected.length;

    assets.push({
      symbol: "DI_MEDIA",
      name: "DI Média Âncoras",
      group: MARKET_GROUPS.JUROS_BR,
      price: avg,
      change: 0,
      timestamp: Date.now()
    });

    console.log(
      "🎯 Âncoras DI:",
      assets.map(a => `${a.symbol} (${a.name})`)
    );

    return assets;

  } catch (error) {
    console.error("Erro DI Provider:", error);
    return [];
  }
}



  private convertPUToRate(pu: number, maturity: string): number {
    const today = new Date();
    const mat = new Date(maturity);

    const diffTime = mat.getTime() - today.getTime();
    const diffDays = Math.max(diffTime / (1000 * 60 * 60 * 24), 1);

    const businessDays = diffDays * (252 / 365);

    const rate =
      Math.pow(100000 / pu, 252 / businessDays) - 1;

    return rate * 100; // em %
  }
}

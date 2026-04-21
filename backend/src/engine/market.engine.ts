import { MarketProvider } from "../ingestor/providers/base.provider";
import { marketStore } from "../store/marketStore";

// NOVO
import { computeStrategy } from "../orchestrator/strategy.orchestrator";
import { NASDAQ_STRATEGY } from "../strategy/nasdaq.strategy";

export class MarketEngine {
  constructor(private provider: MarketProvider) {}

  async update() {
    const assets = await this.provider.fetch();

    // 🧠 EXECUTA ESTRATÉGIA
    const nasdaq = computeStrategy(NASDAQ_STRATEGY, assets);

    // 🔥 Salva ativos normais
    for (const asset of assets) {
      await marketStore.set(asset);
    }

    // 🔥 Salva resultado da estratégia como asset sintético
    await marketStore.set({
      symbol: "NASDAQ_PRESSURE",
      name: nasdaq.name,
      group: "Índices EUA", // mantém grupo pra UI
      price: nasdaq.score,
      change: nasdaq.score,
      timestamp: nasdaq.timestamp
    });

    console.log("🚀 Engine + Strategy update concluído");
  }
}
import { MarketProvider } from "../ingestor/providers/base.provider";
import { marketStore } from "../store/marketStore";
import { strategyStore } from "../store/strategy.store";
import { calculateStrategy } from "../strategy/strategy.calculator";
import { MarketAsset } from "../domain/market";

export class MarketEngine {
  constructor(private provider: MarketProvider) {}

  async update() {
    try {
      // =========================
      // 🔥 1. FETCH GLOBAL
      // =========================
      const assets: MarketAsset[] = await this.provider.fetch();

      console.log(`📊 Assets carregados: ${assets.length}`);

      if (!assets.length) {
        console.warn("⚠️ Nenhum ativo retornado");
        return;
      }

      // =========================
      // 🧹 2. LIMPA STORE (EVITA LIXO)
      // =========================
      await marketStore.clear();

      // =========================
      // 💾 3. SALVA MARKET
      // =========================
      for (const asset of assets) {
        await marketStore.set(asset);
      }

      // =========================
      // 🧠 4. STRATEGIES
      // =========================
      const strategies = strategyStore.getAll();

      for (const strategy of strategies) {
        const result = calculateStrategy(strategy, assets);

        const strategyAsset: MarketAsset = {
          symbol: `STRATEGY_${strategy.id}`,
          name: strategy.name,
          group: "STRATEGY", // 🔥 padronizado
          price: result.score,
          change: result.score,
          timestamp: result.timestamp
        };

        await marketStore.set(strategyAsset);
      }

      console.log("🚀 Engine + Strategies atualizado");

    } catch (err) {
      console.error("❌ Erro no MarketEngine:", err);
    }
  }
}
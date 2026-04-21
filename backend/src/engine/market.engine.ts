import { MarketProvider } from "../ingestor/providers/base.provider";
import { marketStore } from "../store/marketStore";

export class MarketEngine {
  constructor(private provider: MarketProvider) {}

  async update() {
    const assets = await this.provider.fetch();

    for (const asset of assets) {
      await marketStore.set(asset);
    }

    console.log("🚀 Engine update concluído");
  }
}

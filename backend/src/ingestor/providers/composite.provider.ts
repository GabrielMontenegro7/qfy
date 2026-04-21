import { MarketProvider } from "./base.provider";
import { MarketAsset } from "../../domain/market";

export class CompositeProvider implements MarketProvider {
  constructor(private providers: MarketProvider[]) {}

  async fetch(): Promise<MarketAsset[]> {
    const results = await Promise.all(
      this.providers.map((p) => p.fetch())
    );

    return results.flat();
  }
}

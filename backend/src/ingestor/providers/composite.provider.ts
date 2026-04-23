import { MarketProvider } from "./base.provider";
import { MarketAsset } from "../../domain/market";

export class CompositeProvider implements MarketProvider {
  constructor(private providers: MarketProvider[]) {}

 async fetch(): Promise<MarketAsset[]> {
  console.log("Providers:", this.providers);

  const results = await Promise.allSettled(
    this.providers.map((p, i) => {
      console.log(`Provider[${i}]`, p);
      return p.fetch(); // quebra aqui
    })
  );

  const assets: MarketAsset[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      assets.push(...result.value);
    } else {
      console.error("❌ Provider falhou:", result.reason);
    }
  }

  return assets;
}
}

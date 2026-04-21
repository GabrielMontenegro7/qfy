import { MarketAsset } from "../../domain/market";

export interface MarketProvider {
  fetch(): Promise<MarketAsset[]>;
}

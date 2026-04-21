export const MARKET_GROUPS = {
  CAMBIO: "Câmbio",
  JUROS_BR: "Juros BR",
  INDICES_BRL: "Índices BRL",
  COMMODITIES_BR: "Commodities BRL",
  INDICES_USA: "Índices EUA",
  DOLAR_JUROS: "Dólar & Juros",
  COMMODITIES: "Commodities",
  CRYPTO: "Crypto",
  FOREX: "Forex",
  OTHER: "Other"
} as const;

export type MarketGroup =
  typeof MARKET_GROUPS[keyof typeof MARKET_GROUPS];

export interface MarketAsset {
  symbol: string;
  name: string;
  group: MarketGroup;
  price: number;
  change: number;
  timestamp: number;
}

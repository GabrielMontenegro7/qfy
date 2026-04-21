import { MarketGroup } from "../domain/market";

export interface AssetConfig {
  symbol: string;
  name: string;
  group: MarketGroup;
  priority: number;
}

export const ASSETS_BASE: Omit<AssetConfig, "priority">[] = [
   // 💱 Câmbio
  {
    symbol: "USDBRL=X",
    name: "USD / BRL",
    group: "Câmbio",
  },
  // 📈 Índices BRL
  {
    symbol: "^BVSP",
    name: "IBOV",
    group: "Índices BRL",
  },
  {
    symbol: "EWZ",
    name: "USD / BRL",
    group: "Índices BRL",
  },
  // ⛏️ Índices BRL
  {
    symbol: "IO=F",
    name: "Minério de Ferro",
    group: "Commodities BRL",
  },
  {
    symbol: "BZ=F",
    name: "Petróleo Brent",
    group: "Commodities BRL",
  },
  // 📊 Índices EUA
  {
    symbol: "^GSPC",
    name: "S&P 500",
    group: "Índices EUA",
  },
  {
    symbol: "^IXIC",
    name: "NASDAQ",
    group: "Índices EUA",
  },
  // 💵 Dólar & Juros
  {
    symbol: "DX-Y.NYB",
    name: "DXY",
    group: "Dólar & Juros",
  },
  {
    symbol: "^IRX",
    name: "T-Note 2Y",
    group: "Dólar & Juros",
  },
  {
    symbol: "^TNX",
    name: "T-Note 10Y",
    group: "Dólar & Juros",
  },
  // 🛢️ Commodities
  {
    symbol: "GC=F",
    name: "Ouro",
    group: "Commodities",
  },
  {
    symbol: "CL=F",
    name: "Petróleo",
    group: "Commodities",
  },
  // 🪙 Crypto
  {
    symbol: "BTC-USD",
    name: "Bitcoin",
    group: "Crypto",
  },
  {
    symbol: "ETH-USD",
    name: "Ethereum",
    group: "Crypto",
  },
  {
    symbol: "ADA-USD",
    name: "Cardano",
    group: "Crypto",
  },
  {
    symbol: "SOL-USD",
    name: "Solana",
    group: "Crypto",
  },
  // 💹 Forex
  {
    symbol: "EURUSD=X",
    name: "EUR / USD",
    group: "Forex",
  },
];

export const ASSETS: AssetConfig[] = ASSETS_BASE.map(
  (asset, index) => ({
    ...asset,
    priority: index + 1
  })
);

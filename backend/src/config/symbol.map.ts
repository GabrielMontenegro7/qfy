export type ProviderType = "YAHOO" | "CME";

export type AssetGroup =
  | "MACRO"
  | "TECH"
  | "BREADTH"
  | "MIRROR"
  | "FLOW";

export type SymbolConfig = {
  symbol: string;
  provider: ProviderType;
  name: string;
  group: AssetGroup;
};

export const SYMBOL_MAP: Record<string, SymbolConfig> = {

  // =========================
  // 🧠 MACRO
  // =========================

  VIX:   { symbol: "^VIX", provider: "YAHOO", name: "Volatility Index", group: "MACRO" },
  US10Y: { symbol: "^TNX", provider: "YAHOO", name: "US 10Y Yield", group: "MACRO" },
  ZN1:   { symbol: "ZN=F", provider: "CME",   name: "10Y Futures", group: "MACRO" },

  DXY:   { symbol: "DX-Y.NYB", provider: "YAHOO", name: "Dollar Index", group: "MACRO" },
  DX1:   { symbol: "DX=F", provider: "CME",       name: "DXY Futures", group: "MACRO" },

  HYG:   { symbol: "HYG", provider: "YAHOO", name: "High Yield Bonds", group: "MACRO" },
  ZT1:   { symbol: "ZT=F", provider: "CME",  name: "2Y Futures", group: "MACRO" },

  // =========================
  // 🚀 TECH / DRIVE
  // =========================

  ASML: { symbol: "ASML", provider: "YAHOO", name: "ASML", group: "TECH" },
  TSM:  { symbol: "TSM",  provider: "YAHOO", name: "TSMC", group: "TECH" },
  NVDA: { symbol: "NVDA", provider: "YAHOO", name: "NVIDIA", group: "TECH" },
  SOXX: { symbol: "SOXX", provider: "YAHOO", name: "Semiconductor ETF", group: "TECH" },
  AAPL: { symbol: "AAPL", provider: "YAHOO", name: "Apple", group: "TECH" },
  MSFT: { symbol: "MSFT", provider: "YAHOO", name: "Microsoft", group: "TECH" },
  META: { symbol: "META", provider: "YAHOO", name: "Meta", group: "TECH" },

  // =========================
  // 📊 BREADTH
  // =========================

  US500: { symbol: "^GSPC", provider: "YAHOO", name: "S&P 500", group: "BREADTH" },
  RTY:   { symbol: "^RUT",  provider: "YAHOO", name: "Russell 2000", group: "BREADTH" },
  IWM:   { symbol: "IWM",   provider: "YAHOO", name: "Russell ETF", group: "BREADTH" },

  // =========================
  // 🪞 MIRROR
  // =========================

  QQQ:    { symbol: "QQQ",   provider: "YAHOO", name: "Nasdaq ETF", group: "MIRROR" },
  NDX:    { symbol: "^NDX",  provider: "YAHOO", name: "Nasdaq 100", group: "MIRROR" },
  USATEC: { symbol: "^IXIC", provider: "YAHOO", name: "Nasdaq Composite", group: "MIRROR" },

  // =========================
  // ⚡ FLOW (FUTUROS)
  // =========================

  NQ1: { symbol: "NQ=F", provider: "CME", name: "Nasdaq Futures", group: "FLOW" },

};
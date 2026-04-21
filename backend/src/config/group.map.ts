import { MarketGroup } from "../domain/market";

export const GROUP_MAP: Record<string, MarketGroup> = {
  "USDBRL=X": "Câmbio",

  "^BVSP": "Índices BRL",
  "EWZ": "Índices BRL",

  "IO=F": "Commodities BRL",
  "BZ=F": "Commodities BRL",
  
  "^GSPC": "Índices EUA",
  "^IXIC": "Índices EUA",

  "DX-Y.NYB": "Dólar & Juros",
  "^TNX": "Dólar & Juros",
  "^IRX": "Dólar & Juros",

  "GC=F": "Commodities",
  "CL=F": "Commodities",  

  "BTC-USD": "Crypto",
  "ETH-USD": "Crypto",
  "ADA-USD": "Crypto",
  "SOL-USD": "Crypto",
  
  "EURUSD=X": "Forex"
};

"use client";

import { useEffect, useState } from "react";
import type { MarketAsset } from "../domain/market";

export type MarketGroup =
  | "Câmbio"  
  | "Dólar & Juros BR"
  | "Índices BRL"
  | "Commodities BRL"
  | "Índices EUA"
  | "Dólar & Juros"
  | "Commodities"
  | "Crypto"
  | "Forex"
  | "other";


export function useMarketSocket() {
  const [assets, setAssets] = useState<Record<string, MarketAsset>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ws = new WebSocket(`ws://${window.location.hostname}:3002`);

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);

        // 🔒 Garantia: precisa ser array
        if (!Array.isArray(parsed)) return;

        setAssets((prev) => {
          const next = { ...prev };

          parsed.forEach((asset) => {
            // 🔒 Valida estrutura mínima
            if (
              typeof asset?.symbol === "string" &&
              typeof asset?.price === "number"
            ) {
              next[asset.symbol] = asset;
            }
            
          });

          return next;
        });
      } catch (err) {
        console.error("Erro ao processar mensagem do WS:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.warn("WebSocket fechado");
    };

    return () => ws.close();
  }, []);

  return Object.values(assets);
}

import axios from "axios";
import { ASSETS } from "../config/assets.config";
import { marketStore } from "../store/marketStore";
import { MarketAsset } from "../domain/market";

const API_KEY = process.env.TWELVE_API_KEY!;
const BASE_URL = "https://api.twelvedata.com/quote";

async function fetchAsset(asset: typeof ASSETS[number]) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        symbol: asset.symbol,
        apikey: API_KEY,
      },
    });

    if (!data || data.status === "error") {
      throw new Error(data?.message || "Erro desconhecido");
    }

    const parsed: MarketAsset = {
      symbol: asset.symbol,
      name: asset.name,
      group: asset.group,
      price: Number(data.price),
      change: Number(data.percent_change),
      timestamp: Date.now(),
    };

    if (isNaN(parsed.price)) {
      throw new Error("Preço inválido");
    }

    await marketStore.set(parsed);
  } catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error("Erro desconhecido", err);
  }
}

}

export function startTwelveIngestor(intervalMs = 5000) {
  const assets = ASSETS.filter(a => a.source === "twelvedata");

  // Primeira carga
  assets.forEach(fetchAsset);

  // Atualização contínua
  setInterval(() => {
    assets.forEach(fetchAsset);
  }, intervalMs);
}

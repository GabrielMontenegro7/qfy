"use client";

import type { MarketAsset } from "../domain/market";
import { formatTimestamp } from "./formatTimestamp";

function formatPrice(value?: number, group?: string, symbol?: string) {
  if (typeof value !== "number") return "--";

  // Yield → mostrar como %
  if (symbol?.includes("^T") || symbol?.includes("^F") || symbol === "^IRX") {
    return `${value.toFixed(2)}%`;
  }

  if (group === "Crypto") {
    return value > 1
      ? value.toFixed(2)
      : value.toFixed(4);
  }

  return value.toFixed(2);
}

function formatChange(value?: number) {
  if (typeof value !== "number") return "--";
  return `${value.toFixed(2)}%`;
}

export function MarketTable({ assets }: { assets: MarketAsset[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="w-1/4 py-2">Ativo</th>
            <th className="w-1/6 py-2 text-right">Preço</th>
            <th className="w-1/6 py-2 text-right">Variação</th>
            <th className="w-1/4 py-2 text-right">Atualizado</th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset) => (
            <tr key={asset.symbol} className="border-b border-gray-800">
              <td className="py-2 text-right font-mono">
                <div className="font-medium">{asset.name}</div>
              </td>

              <td className="py-2 text-right">
                {formatPrice(asset.price, asset.group, asset.symbol)}
              </td>

              <td
                className={`py-2 text-right ${
                  asset.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {asset.change.toFixed(2)}%
              </td>

              <td className="py-2 text-right text-sm text-gray-400">
                {formatTimestamp(asset.timestamp)} 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { Strategy } from "./strategy.types";

export function validateStrategy(strategy: Strategy) {
  if (!strategy.name) throw new Error("Strategy sem nome");

  for (const group of strategy.groups) {
    if (group.weight <= 0) throw new Error(`Grupo ${group.name} inválido`);

    const totalAssets = group.assets.reduce((acc, a) => acc + a.weight, 0);

    if (totalAssets <= 0) {
      throw new Error(`Grupo ${group.name} sem pesos`);
    }
  }

  return true;
}
import { Strategy } from "../strategy/strategy.types";

class StrategyStore {
  private strategies = new Map<string, Strategy>();

  getAll() {
    return Array.from(this.strategies.values());
  }

  get(id: string) {
    return this.strategies.get(id);
  }

  save(strategy: Strategy) {
    this.strategies.set(strategy.id, strategy);
  }

  delete(id: string) {
    this.strategies.delete(id);
  }
}

export const strategyStore = new StrategyStore();
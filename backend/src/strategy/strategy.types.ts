export type StrategyAsset = {
  symbol: string;
  weight: number;
};

export type StrategyGroup = {
  name: string;
  weight: number;
  assets: StrategyAsset[];
};

export type Strategy = {
  id: string;
  name: string;
  groups: StrategyGroup[];
};
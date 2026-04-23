// src/api/market.routes.ts

import { Router } from "express";
import { marketStore } from "../store/marketStore";

const router = Router();

router.get("/", async (req, res) => {
  const assets = await marketStore.getAll();

  const market = assets.filter(a => !a.symbol.startsWith("STRATEGY_"));
  const strategies = assets.filter(a => a.symbol.startsWith("STRATEGY_"));

  res.json({
    timestamp: Date.now(),
    market,
    strategies
  });
});

export default router;
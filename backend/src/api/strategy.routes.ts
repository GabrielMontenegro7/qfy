import { Router } from "express";
import { strategyStore } from "../store/strategy.store";
import { validateStrategy } from "../strategy/strategy.validator.ts";
import { randomUUID } from "crypto";

const router = Router();

// Criar estratégia
router.post("/", (req, res) => {
  try {
    const strategy = req.body;

    strategy.id = randomUUID();

    validateStrategy(strategy);
    strategyStore.save(strategy);

    res.json(strategy);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Listar
router.get("/", (req, res) => {
  res.json(strategyStore.getAll());
});

// Deletar
router.delete("/:id", (req, res) => {
  strategyStore.delete(req.params.id);
  res.json({ ok: true });
});

export default router;
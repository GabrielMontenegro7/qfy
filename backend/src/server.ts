import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { WebSocketServer } from "ws";

import { initRedis } from "./store/redisStore";
import { startMarketSocket } from "./ws/socket";

import { YahooAdapter } from "./ingestor/providers/yahoo.adapter";
import { MarketEngine } from "./engine/market.engine";

import { CompositeProvider } from "./ingestor/providers/composite.provider";
import { DIProvider } from "./ingestor/providers/di.adapter";

initRedis();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => res.json({ status: "ok" }));

const REST_PORT = Number(process.env.REST_PORT) || 3001;
const WS_PORT = Number(process.env.WS_PORT) || 3002;

/* ---------------- REST ---------------- */
app.listen(REST_PORT, () => {
  console.log(`🌐 REST API running on port ${REST_PORT}`);
});

/* ---------------- WEBSOCKET ---------------- */
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

startMarketSocket(wss);

server.listen(WS_PORT, "0.0.0.0", () => {
  console.log(`🔌 WebSocket running on port ${WS_PORT}`);
});

/* ---------------- MARKET ENGINE ---------------- */

const provider = new CompositeProvider([
  new YahooAdapter(),
  new DIProvider()
]);

const engine = new MarketEngine(provider);

// primeira carga imediata
engine.update();

// atualização periódica
setInterval(() => {
  engine.update();
}, 30_000);

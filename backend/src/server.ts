import express from "express";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws";

import { YahooAdapter } from "./ingestor/providers/yahoo.adapter";
import { CMEAdapter } from "./ingestor/providers/cme.adapter";
import { CompositeProvider } from "./ingestor/providers/composite.provider";

import { MarketEngine } from "./engine/market.engine";
import marketRoutes from "./api/market.routes";
import { marketStore } from "./store/marketStore";

// =========================
// 🚀 APP
// =========================

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// 🔌 PROVIDERS
// =========================

const provider = new CompositeProvider([
  new YahooAdapter(),
  new CMEAdapter(),
]);

// =========================
// ⚙ ENGINE
// =========================

const engine = new MarketEngine(provider);

// =========================
// 🌐 ROUTES
// =========================

app.use("/market", marketRoutes);

app.get("/", (req, res) => {
  res.send("API QFY rodando 🚀");
});

// =========================
// 🔥 HTTP SERVER
// =========================

const server = http.createServer(app);

// =========================
// 🔌 WEBSOCKET
// =========================

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("🔌 Cliente conectado WS");

  const sendData = async () => {
    const data = await marketStore.getAll();
    ws.send(JSON.stringify(data));
  };

  // envia imediatamente
  sendData();

  // envia a cada 3s
  const interval = setInterval(sendData, 3000);

  ws.on("close", () => {
    clearInterval(interval);
    console.log("❌ Cliente desconectado");
  });
});

// =========================
// ▶ START SERVER
// =========================

const PORT = 3002;

server.listen(PORT, async () => {
  console.log(`🌐 Server rodando em http://localhost:${PORT}`);

  console.log("🚀 Iniciando Market Engine...");
  await engine.update();

  setInterval(async () => {
    await engine.update();
  }, 30000);
});
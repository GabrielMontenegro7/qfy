import { WebSocketServer } from "ws";
import { marketStore } from "../store/marketStore";

export function startMarketSocket(wss: WebSocketServer) {
  setInterval(async () => {
    const assets = await marketStore.getAll();
    const payload = JSON.stringify(assets);

    wss.clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(payload);
      }
    });
  }, 1000);
}

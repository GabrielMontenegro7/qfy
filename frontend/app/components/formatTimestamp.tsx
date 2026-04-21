export function formatTimestamp(
  ts?: number | string
): string {
  if (!ts) return "--";

  let value = typeof ts === "string" ? Number(ts) : ts;

  if (isNaN(value)) return "--";

  // microssegundos → ms
  if (value > 1e15) {
    value = Math.floor(value / 1000);
  }
  // segundos → ms
  else if (value < 1e12) {
    value = value * 1000;
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) return "--";

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${dd}/${mm} ${hh}:${mi}:${ss}`;
}

import { apiKey, urlApi } from "../env";
// const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
// const urlApi = import.meta.env.VITE_BASE_URL;
const options = {
  method: "GET",
  headers: { "x-cg-demo-api-key": apiKey, "accept": "application/json" },
};

export type TypeHistorialCoin = {
  date: string;
  Price: number;
  volume: number;
};

export const coinHistorialChartApiById = async (
  idCoin: string,
  day: number,
) => {
  const response = await fetch(
    `${urlApi}/${idCoin}/market_chart?vs_currency=usd&days=${day}`,
    options,
  );
  if (!response.ok) {
    throw new Error("Error al obtener la lista de monedas");
  }
  const data = await response.json();

  const transformData: TypeHistorialCoin[] = data.prices.map(
    (
      [timestamp, price]: [number, number],
      index: number,
    ): TypeHistorialCoin => ({
      date: formatDate(timestamp, day),
      Price: Number(price.toFixed(2)),
      volume: Number(data.total_volumes[index][1].toFixed(2)),
    }),
  );
  return transformData ?? [];
};

export function formatDate(timestamp: number, days: number) {
  const date = new Date(timestamp);

  if (days === 1) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (days <= 7) {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
    });
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

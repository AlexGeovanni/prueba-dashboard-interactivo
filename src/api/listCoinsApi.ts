import { apiKey, urlApi } from "../env";
// const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
// const urlApi = import.meta.env.VITE_BASE_URL;
const options = {
  method: "GET",
  headers: { "x-cg-demo-api-key": apiKey, accept: "application/json" },
};

export type TypeCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: string;
  market_cap: number;
};

// Esta funcion hace un get a lo 30 monedas cripto
export const listCoinsApi = async () => {
  const response = await fetch(
    `${urlApi}markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false`,
    options,
  );
  if (!response.ok) {
    throw new Error("Error al obtener la lista de monedas");
  }
  const data = await response.json();
  return coinAdapter(data);
};

const coinAdapter = (data: any[]): TypeCoin[] =>
  data.map((coin) => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    image: coin.image,
    current_price: String(formatPrice(coin.current_price ?? 0)),
    market_cap: coin.market_cap ?? 0,
  }));

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

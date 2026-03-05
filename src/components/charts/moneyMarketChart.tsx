import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  Legend,
} from "recharts";
import NotFoundChart from "./notFoundChart";
import type { TypeCoin } from "@/api/listCoinsApi";
import { useCrypto } from "@/hooks/useCrypto";
import ChartSkeleton from "@/components/skeleton/skeletonChart";

interface Props {
  data: TypeCoin[];
}

export default function MoneyMarketChart({ data }: Props) {
  // Este es el formato de los datos para el gráfico
  const formatted = data.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    marketCap: coin.market_cap,
  }));

  // Se obtiene el estado del contexto de la carga
  const { isLoad } = useCrypto();
  // Si la carga está en progreso, se muestra el skeleton
  if (isLoad) {
    return <ChartSkeleton />;
  }

  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height={350}>
        {formatted && formatted.length > 0 ? (
          <>
            <BarChart
              role="img"
              aria-label="Gráfico de capitalización de mercado por criptomoneda"
              data={formatted}
            >
              <XAxis
                dataKey="name"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(value) => `${value}`.slice(0, 5) + "..."}
                tick={{ fill: "#9CA3AF" }}
                className="text-xs!"
                axisLine={false}
              />
              <Tooltip
                labelClassName="text-xs md:text-sm"
                wrapperClassName="text-xs md:text-sm"
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              />
              <Bar dataKey="marketCap" fill="#82ca9d" />
            </BarChart>
            <Legend />
          </>
        ) : (
          <NotFoundChart />
        )}
      </ResponsiveContainer>
    </div>
  );
}

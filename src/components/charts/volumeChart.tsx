import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import NotFoundChart from "./notFoundChart";
import type { TypeHistorialCoin } from "@/api/coinHistorialChartApi";
import { useCrypto } from "@/hooks/useCrypto";
import ChartSkeleton from "@/components/skeleton/skeletonChart";

interface Props {
  data: TypeHistorialCoin[];
}

export default function VolumeChart({ data }: Props) {
  // Se obtiene el estado del contexto de la carga
  const { isLoad } = useCrypto();
  // Si la carga está en progreso, se muestra el skeleton
  if (isLoad) {
    return <ChartSkeleton />;
  }
  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height={350}>
        {data && data.length > 0 ? (
          <>
            <AreaChart
              data={data}
              role="img"
              aria-label="Gráfica de volumen de cada moneda"
            >
              <XAxis
                dataKey="date"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tickFormatter={(value) => `${value}`.slice(0, 5) + "..."}
                tick={{ fill: "#9CA3AF" }}
                className="text-xs!"
                axisLine={false}
                // tickLine={false}
              />

              <Tooltip
                formatter={(value) => [
                  `$${value?.toLocaleString()}`,
                  "Volumen de trading",
                ]}
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
              <Legend />
              <Area
                type="monotone"
                dataKey="volume"
                name="Volumen de trading"
                stroke="#16a34a"
                fill="rgba(22, 163, 74, 0.15)"
                strokeWidth={1.5}
                dot={false}
              />
            </AreaChart>
          </>
        ) : (
          <NotFoundChart />
        )}
      </ResponsiveContainer>
    </div>
  );
}

import { Bar, BarChart, Legend, Tooltip, XAxis } from "recharts";

export default function NotFoundChart() {
  return (
    <div>
      <div className="absolute inset-0  z-2 flex items-center justify-center">
        <div className=" h-40 rounded-xl max-w-80 w-full font-medium text-2xl flex flex-col items-center justify-center">
          Sin datos disponibles
          <span className="text-sm font-normal text-zinc-300 text-center mt-2">No pudimos obtener los datos para mostrar la gráfica.</span>
        </div>
      </div>
      <BarChart data={[0, 0, 0]} role="img" aria-label="Gráfica datos no encontrados">
        <XAxis
          // dataKey="date"
          tick={{ fill: "#2a2a2b", fontSize: 12 }}
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
        <Bar fill="#82ca9d" />
      </BarChart>
      <Legend />
    </div>
  );
}

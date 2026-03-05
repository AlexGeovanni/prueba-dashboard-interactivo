import { useState } from "react";

export default function ChartSkeleton() {
    const [mat] = useState(() => Math.random() * 60 + 20);
  return (
    <div className="w-full h-96 bg-gradient-to-r from-white/8 to-white/5 rounded-lg p-6 animate-pulse" aria-label="Skeleton de carga">

      <div className="space-y-4">
        <div className="flex items-end justify-between h-64 gap-2">
          <div className="flex flex-col justify-between h-full">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-3 bg-white/10 rounded w-8"></div>
            ))}
          </div>
          <div className="flex items-end justify-between flex-1 gap-2 px-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-white/10  rounded-t"
                style={{
                  height: `${mat}%`,
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex justify-between px-12 mt-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-3 bg-white/10  rounded w-10"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
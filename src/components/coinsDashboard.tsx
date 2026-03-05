import Wrapper from "@/components/wrapper";
import PriceChart from "@/components/charts/priceChart";
import VolumeChart from "@/components/charts/volumeChart";
import { useCrypto } from "@/hooks/useCrypto";
import MoneyMarketChart from "@/components/charts/moneyMarketChart";

// Este componente es el que muestra los datos de la criptomoneda seleccionada
export default function CoinsDashboard() {
  // Se obtiene el estado del contexto 
  const { dataPriceChart, isLoad, coin, day, dataCoins } = useCrypto();
  return (
    <section>
      <Wrapper classname="py-2 border-t border-white/30 px-4 2xl:px-0">
        <div
          className="py-4"
          aria-label={`Precio actual de ${coin?.name ?? "la criptomoneda"}`}
        >
          <span className="text-xl">{day.description}</span>
          <p className="text-3xl font-medium ">
            {isLoad ? "00.0" : coin ? coin.current_price : "00.0"}
            <span className="text-base text-zinc-400">USD</span>
          </p>
        </div>
        <div className=" grid xl:grid-cols-2 gap-3">
          <div className=" h-full col-span-1 py-5 ">
            <div className="pl-15 pb-4">
              <p className="text-xl">Historial de precios</p>
            </div>
            <PriceChart data={dataPriceChart} />
          </div>
          <div className=" h-full col-span-1 py-5">
            <div className="pl-15 pb-4">
              <p className="text-xl">Volumen de mercado</p>
            </div>
            <VolumeChart data={dataPriceChart} />
          </div>
          <div className=" h-full col-span-1 py-5">
            <div className="pl-15 pb-4">
              <p className="text-xl">Top 10 criptomonedas del mercado</p>
            </div>
            <MoneyMarketChart data={dataCoins} />
          </div>
        </div>
      </Wrapper>
    </section>
  );
}

import {
  coinHistorialChartApiById,
  type TypeHistorialCoin,
} from "@/api/coinHistorialChartApi";
import { listCoinsApi, type TypeCoin } from "@/api/listCoinsApi";
import { createContext, useEffect, useState, type ReactNode } from "react";

export type TypeDay = {
  id: number;
  name: string;
  description: string;
};
type CryptoContextType = {
  dataPriceChart: TypeHistorialCoin[];
  dataCoins: TypeCoin[];
  dataDays: TypeDay[];
  mssg:TypeMssg | null;
  coin: TypeCoin | null;
  setCoin: (coin: TypeCoin) => void;
  day: TypeDay;
  setDay: (day: TypeDay) => void;
  isLoad: boolean;
};
type TypeMssg = {
  text: string;
  error: boolean;
};
const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

const CryptoProvider = ({ children }: { children: ReactNode }) => {
  const dataDays: TypeDay[] = [
    {
      id: 1,
      name: "1D",
      description: "Hoy",
    },
    {
      id: 7,
      name: "7D",
      description: "Los últimos 5 días",
    },
    {
      id: 30,
      name: "30D",
      description: "Hace 30 días",
    },
    {
      id: 90,
      name: "90D",
      description: "Hace 90 días",
    },
    {
      id: 365,
      name: "1A",
      description: "Año pasado",
    },
  ];
  const [coin, setCoin] = useState<TypeCoin | null>(null);
  const [day, setDay] = useState<TypeDay>(dataDays[0]);
  const [dataCoins, setDataCoins] = useState<TypeCoin[]>([]);
  const [dataPriceChart, setDataPriceChart] = useState<TypeHistorialCoin[]>([]);
  const [isLoad, setIsload] = useState<boolean>(true);
  const [mssg, setMssg] = useState<TypeMssg | null>(null);
  useEffect(() => {
    // Este es el efecto para obtener los datos del historial de precios
    const fetchData = async () => {
      if (!coin) return;
      setIsload(true)
      try {
        const data = await coinHistorialChartApiById(coin.id, day.id);
        setDataPriceChart(data);
        setMssg({
          text: "Datos cargados correctamente",
          error: false,
        });
      } catch (error) {
        console.error(error);
        setMssg({
          text: "Error al obtener la Historial precio",
          error: true,
        });
        setDataPriceChart([]);
      } finally{
        setIsload(false)
        setTimeout(()=>{
          setMssg(null)
        },1500)
      }
    };

    fetchData();
  }, [day, coin]);

  useEffect(() => {
    // Este es el efecto para obtener los datos de la lista de monedas
    const fetchData = async () => {
      try {
        const dataCoins = await listCoinsApi();

        if (!dataCoins.length) return;
        const dataHistorial = await coinHistorialChartApiById(
          dataCoins[0].id,
          day.id,
        );
        setDataPriceChart(dataHistorial);
        setCoin(dataCoins[0]);
        setDataCoins(dataCoins ?? []);
      } catch (error) {
        console.error("Error al obtener la lista de coins:", error);
        setMssg({
          text: "No se pudieron obtener los datos. Intenta nuevamente.",
          error: true,
        });
      } finally {
        setIsload(false);
        setTimeout(()=>{
          setMssg(null)
        },1500)
      }
    };
    fetchData();
  }, []);

  return (
    <CryptoContext.Provider
      value={{
        dataPriceChart,
        dataCoins,
        dataDays,
        mssg,
        coin,
        setCoin,
        day,
        setDay,
        isLoad,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export { CryptoContext, CryptoProvider };

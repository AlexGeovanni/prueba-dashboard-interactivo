import type { TypeCoin } from "@/api/listCoinsApi";
import { useCrypto } from "@/hooks/useCrypto";
import { ArrowDownIcon, CheckIcon } from "@/icon";
import { useEffect, useRef, useState } from "react";

// este tipo de importacion es para ejecutar los tests
// import type { TypeCoin } from "../../api/listCoinsApi";
// import { ArrowDownIcon, CheckIcon } from "../../icon";
// import { useEffect, useRef, useState } from "react";
// import { useCrypto } from "../../hooks/useCrypto";

// Este componente es el que muestra el dropdown de las monedas
export default function SelectCoin() {
  // Se obtiene el estado del contexto de la moneda seleccionada
  const [open, setOpen] = useState<boolean>(false);
  const { dataCoins: data, isLoad, coin, setCoin } = useCrypto();
  const refDiv = useRef<HTMLDivElement>(null);

  // Este es el handler para cambiar la moneda seleccionada
  const onClickChangeOpen = (value: TypeCoin) => {
    setCoin(value);
    setOpen(!open);
  };

  // Este es el efecto para cerrar el dropdown cuando se hace click fuera
  useEffect(() => {
    const onClickRef = (e: MouseEvent) => {
      if (refDiv.current && !refDiv.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClickRef);
    return () => {
      document.removeEventListener("click", onClickRef);
    };
  }, [open]);

  return (
    <div className="relative w-full sm:max-w-48 sm:w-full" ref={refDiv}>
      <label htmlFor="coin-dropdown" className="mb-1 inline-block">
        Moneda
      </label>
      <button
        id="coin-dropdown"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-disabled={!coin}
        type="button"
        className={`border cursor-pointer border-white/10 rounded-xl px-4 py-3 flex gap-3 items-center justify-between w-full md:py-2`}
        onClick={() => setOpen(!open)}
      >
        {isLoad ? (
          <div className="w-30 h-5 bg-gradient-to-r from-white/8 to-white/5 rounded-lg animate-pulse" />
        ) : (
          <span className="text-sm">{coin?.name ?? "Sin datos"}</span>
        )}
        {coin && (
          <ArrowDownIcon
            size={20}
            classname={`transition-all ease-in-out duration-300 ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>
      <div
        className={`absolute z-10 py-4 top-20 border border-white/10 cursor-pointer right-0 w-full bg-zinc-800 rounded-xl transition-all ease-in-out duration-300 md:top-18 ${open ? "opacity-100 pointer-events-auto scale-100" : "pointer-events-none opacity-0 scale-90"}  `}
      >
        <div
          role="listbox"
          className="flex px-1 flex-col max-h-75 overflow-y-auto custom-scroll"
        >
          {data.map((value, index) => (
            <button
              key={index}
              id={`coin-option-${index}`}
              role="option"
              tabIndex={-1}
              className="cursor-pointer rounded-lg px-3 py-3 w-full hover:bg-white/10 flex items-center justify-between sm:max-w-45 sm:w-full md:py-2"
              onClick={() => onClickChangeOpen(value)}
            >
              <span className="text-sm block text-start">{value.name}</span>
              {coin?.id == value.id && <CheckIcon size={18} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

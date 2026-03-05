import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon, CheckIcon } from "@/icon";
import { useCrypto } from "@/hooks/useCrypto";
import type { TypeDay } from "@/context/CryptoProvider";

// Este componente es el que muestra el dropdown de los rangos de días
export default function SelectDay() {
  const [open, setOpen] = useState<boolean>(false);
  const { dataDays: data, coin, day, setDay } = useCrypto();
  const refDiv = useRef<HTMLDivElement>(null);

  // Este es el handler para cambiar el rango de días seleccionado
  const onClickChangeOpen = (value: TypeDay) => {
    setDay(value);
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
    <div className="relative w-full sm:max-w-35 sm:w-full" ref={refDiv}>
      <label htmlFor="day-dropdown" className="mb-1 inline-block">
        Moneda
      </label>
      <button
        id="day-dropdown"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-disabled={!day}
        type="button"
        className={`border cursor-pointer border-white/10 rounded-xl px-4 py-3 flex gap-3 items-center justify-between w-full md:py-2`}
        onClick={() => setOpen(!open)}
        disabled={!coin}
      >
        <span className="text-sm text-start block">{day.name ?? "---"}</span>
        <ArrowDownIcon
          size={20}
          classname={`transition-all ease-in-out duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`absolute z-10 py-4 top-20 border border-white/10 cursor-pointer right-0 w-full bg-zinc-800 rounded-xl transition-all ease-in-out duration-300 md:top-18 ${open ? "opacity-100 pointer-events-auto scale-100" : "pointer-events-none opacity-0 scale-90"}  `}
      >
        <div
          role="listbox"
          className="flex px-1 flex-col gap-px max-h-75 overflow-y-auto custom-scroll"
        >
          {data.map((value, index) => (
            <button
              key={index}
              id={`day-option-${index}`}
              role="option"
              tabIndex={-1}
              className="cursor-pointer rounded-lg px-3 py-3 w-full hover:bg-white/10 flex items-center justify-between sm:max-w-45 sm:w-full md:py-2"
              onClick={() => onClickChangeOpen(value)}
            >
              <span className="text-sm block text-start">{value.name}</span>
              {day.id === value.id && <CheckIcon size={18} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

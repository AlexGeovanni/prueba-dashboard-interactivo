import SelectCoin from "@/components/filters/selectCoin";
import SelectDay from "@/components/filters/selectDay";
import Wrapper from "./wrapper";

export default function Header() {
  return (
    <header className="z-0">
      <Wrapper classname="pt-8 px-4 md:pt-14 2xl:px-0">
        <h1 className="text-3xl font-bold mb-4">Dashboard Interactivo</h1>
        <p className="text-xl font-bold underline underline-offset-4 ">
          CoinGecko <span className="text-green-500">API</span>
        </p>
        {/* Este es nav para los filtros */}
        <nav className="py-4 mb-5" aria-label="Navegación del dashboard">
          <p className="text-lg font-medium mb-1">Filtrar por:</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <SelectCoin />
            <SelectDay />
          </div>
        </nav>
      </Wrapper>
    </header>
  );
}

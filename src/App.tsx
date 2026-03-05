import { Fragment } from "react";
import { useCrypto } from "@/hooks/useCrypto";
import Header from "@/components/Header";
import CoinsDashboard from "@/components/coinsDashboard";

function App() {
  const { mssg } = useCrypto();

  return (
    <Fragment>
      <Header />
      <CoinsDashboard />
      <div className="fixed top-5 right-5 max-w-70 w-full z-9999 md:top-10 md:right-10">
      {mssg && (
          <div className={`p-3 px-4 z-999 bg-zinc-700 border border-white/10 rounded-lg text-xs font-medium sm:text-sm  ${mssg.error? "text-red-400":"text-green-400"}`}>
            {mssg.text}
          </div>
      )}
      </div>
    </Fragment>
  );
}

export default App;

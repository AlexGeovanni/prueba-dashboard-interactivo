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
      {mssg && (
        <div className="fixed top-10 right-10 max-w-70 w-full">
          <div className={`p-3 px-4 bg-white/10 border border-white/10 rounded-lg text-sm font-medium ${mssg.error? "text-red-400":"text-green-400"}`}>
            {mssg.text}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default App;

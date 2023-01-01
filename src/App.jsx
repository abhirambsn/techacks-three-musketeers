import { useEffect, useState } from "react";
import Home from "./components/Home";
import Mission from "./components/Mission";

import { ethers } from "ethers";
import useProvider from "./hooks/useProvider";
import useAccount from "./hooks/useAccount";
import useCFunding from "./hooks/useCFunding";
// import { Network, Alchemy, Wallet, ContractFactory } from 'alchemy-sdk'

// const settings = {
//   apiKey: "W_LHbrUzRfe0qFkrkbD4wtc_ml-CxaRb",
//   network: Network.MATIC_MUMBAI
// }

// const alchemy = Alchemy(settings);
function App() {
  const provider = useProvider();
  const { address, signer } = useAccount(provider);

  useEffect(() => {
    console.log(`Address is ${address}`);
  }, [address]);

  return (
    <div className="App">
      <Home />
      <Mission />
    </div>
  );
}

export default App;

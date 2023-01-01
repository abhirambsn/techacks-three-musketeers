import React from "react";
import { useEffect } from "react";
import Home from "../components/Home";
import Mission from "../components/Mission";

import useProvider from "../hooks/useProvider";
import useAccount from "../hooks/useAccount";
import Working from "../components/Working";

const HomePage = () => {
  const provider = useProvider();
  const { address, signer } = useAccount(provider);

  useEffect(() => {
    console.log(`Address is ${address}`);
  }, [address]);
  return (
    <div>
      <Home />
      <Mission />
      <Working />
    </div>
  );
};

export default HomePage;

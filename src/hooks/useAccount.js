import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const useAccount = (provider) => {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    provider.send("eth_requestAccounts", []).then(async () => {
      const ethSigner = provider.getSigner();
      setAddress(await ethSigner.getAddress());
    });
  }, []);

  return {
    address,
  };
};

export default useAccount;

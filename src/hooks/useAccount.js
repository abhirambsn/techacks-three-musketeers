import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const useAccount = (provider) => {
  const [address, setAddress] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const ethSigner = provider.getSigner();
    setSigner(ethSigner);
    (async () => {
      setAddress(await ethSigner.getAddress());
    })();
  }, []);

  return {
    address,
    signer,
  };
};

export default useAccount;

import { useEffect, useState } from "react";

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

import { useEffect } from "react";
import { ethers } from "ethers";
import cfundContractAbi from "../abi/CFunding.json";

const useCFunding = () => {
  let cfundContract;
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();
  cfundContract = new ethers.Contract(
    import.meta.env.VITE_CONTRACT_ADDRESS,
    cfundContractAbi.abi,
    signer
  );

  return cfundContract;
};

export default useCFunding;

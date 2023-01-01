import { useEffect } from "react";
import { ethers } from "ethers";
import escrowAbi from "../abi/Escrow.json";

function useEscrow(contractAddress) {
  let escrowContract;
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();
  escrowContract = new ethers.Contract(contractAddress, escrowAbi.abi, signer);

  return escrowContract;
}

export default useEscrow;

import { useEffect } from "react";
import { ethers } from "ethers";

function useProvider() {
  let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  provider.getSigner();
  return provider;
}

export default useProvider;

import { useEffect } from "react";
import { ethers } from "ethers";

function useProvider() {
  let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  return provider;
}

export default useProvider;

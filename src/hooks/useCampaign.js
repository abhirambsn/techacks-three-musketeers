import { useEffect } from "react";
import { ethers } from "ethers";
import campaignAbi from "../abi/Campaign.json";

function useCampaign(contractAddress) {
  let campaignContract;
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();
  campaignContract = new ethers.Contract(
    contractAddress,
    campaignAbi.abi,
    signer
  );

  return campaignContract;
}

export default useCampaign;

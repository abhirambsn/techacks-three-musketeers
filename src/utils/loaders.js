import { ethers } from "ethers";
import cfundingAbi from "../abi/CFunding.json";
import campaignAbi from "../abi/Campaign.json";
import escrowAbi from "../abi/Escrow.json";

const getEscrowBalance = async (provider, escrowAddr) => {
  const balance = await provider.getBalance(escrowAddr);
  return ethers.utils.formatEther(balance);
}

const getCampaignDetail = async (provider, signer, campaignAddr) => {
  const campaignContract = new ethers.Contract(
    campaignAddr,
    campaignAbi.abi,
    signer
  );
  const name = await campaignContract.name();
  const desc = await campaignContract.description();
  const escrowAddr = await campaignContract.escrow();
  let stagePeriod = await campaignContract.stagePeriod();
  stagePeriod = ethers.utils.formatEther(stagePeriod);
  let totalProjectTime = await campaignContract.totalProjectTime();
  totalProjectTime = ethers.utils.formatEther(totalProjectTime);
  let totalAmountNeeded = await campaignContract.totalAmountNeeded();
  totalAmountNeeded = parseFloat(ethers.utils.formatEther(totalAmountNeeded))*1e18;
  let currentStage = await campaignContract.currentStage();
  currentStage = parseFloat(ethers.utils.formatEther(currentStage))*1e18;

  return {
    name,
    desc,
    escrowAddr,
    stagePeriod,
    totalProjectTime,
    totalAmountNeeded,
    address: campaignAddr,
    currentStage,
    currentProgress: await getEscrowBalance(provider, escrowAddr)
  };
};

export const getAllCampaigns = async () => {
  let allCampaigns = [];
  console.log(import.meta.env.VITE_CONTRACT_ADDRESS);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const cfundingContract = new ethers.Contract(
    import.meta.env.VITE_CONTRACT_ADDRESS,
    cfundingAbi.abi,
    signer
  );
  const userCount = await cfundingContract.userCount();

  for (let i = 0; i < userCount; i++) {
    const userAddr = await cfundingContract.campaignLUT(i);
    let uData = await cfundingContract.getAllCampaignsOfUser(userAddr);
    uData = uData.map((uD) => getCampaignDetail(provider, signer, uD));
    uData = await Promise.all(uData);
    allCampaigns = [...allCampaigns,...uData];
    console.log({
      userAddr,
      uData,
    });
  }
  return allCampaigns;
};

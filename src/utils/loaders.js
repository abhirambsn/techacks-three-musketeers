import { ethers } from "ethers";
import cfundingAbi from "../abi/CFunding.json";
import campaignAbi from "../abi/Campaign.json";
import votingfactoryAbi from "../abi/VotingFactory.json";

const getEscrowBalance = async (provider, escrowAddr) => {
  const balance = await provider.getBalance(escrowAddr);
  return ethers.utils.formatEther(balance);
};

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
  stagePeriod = stagePeriod.toNumber();
  let totalProjectTime = await campaignContract.totalProjectTime();
  totalProjectTime = totalProjectTime.toNumber();
  let totalAmountNeeded = await campaignContract.totalAmountNeeded();
  totalAmountNeeded = parseFloat(ethers.utils.formatEther(totalAmountNeeded));
  let currentStage = await campaignContract.currentStage();
  currentStage = parseFloat(ethers.utils.formatEther(currentStage)) * 1e18;
  let projectDeadlineStartTime =
    await campaignContract.projectDeadlineStartTime();
  projectDeadlineStartTime = projectDeadlineStartTime.toNumber();
  let projectDeadline = "Not Started";
  if (projectDeadlineStartTime > 0) {
    projectDeadline = new Date(
      projectDeadlineStartTime * 1000 + totalProjectTime * 1000
    ).toLocaleDateString("en-US", { dateStyle: "medium" });
  }
  let author = await campaignContract.author();
  let coverImg = await campaignContract.coverImg();

  let cancelled = await campaignContract.cancelled();

  return {
    author,
    name,
    desc,
    escrowAddr,
    stagePeriod,
    totalProjectTime,
    totalAmountNeeded,
    address: campaignAddr,
    currentStage,
    currentProgress: await getEscrowBalance(provider, escrowAddr),
    projectDeadline,
    coverImg,
    cancelled
  };
};

export const getCampaignDetails = async (campaignAddress) => {
  const allCampaings = await getAllCampaigns();
  return allCampaings.find((c) => c.address == campaignAddress);
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
    allCampaigns = [...allCampaigns, ...uData];
    console.log({
      userAddr,
      uData,
    });
  }
  return allCampaigns;
};

export const getVotingResults = async (contractAddress, stage) => {
  // const resp = await axios.get(
  //   `${import.meta.env.VITE_API_URL}/api/results/${contractAddress}/${stage}`
  // );
  // if (resp.data.over) {
  //   await completeStageVoting(contractAddress, stage);
  // }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const votingFactoryContract = new ethers.Contract(
    import.meta.env.VITE_VOTING_FACTORY,
    votingfactoryAbi.abi,
    signer
  );

  const resp = await votingFactoryContract.getResult(contractAddress, stage);
  return {
    yes: resp[0]?.toNumber(),
    no: resp[1]?.toNumber(),
    address: contractAddress,
    stage,
  };
};

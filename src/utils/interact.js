import { ethers } from "ethers";
import campaignAbi from "../abi/Campaign.json";
import cfundingAbi from "../abi/CFunding.json";

export const getBalance = async (walletAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  let balance = await provider.getBalance(walletAddress);
  balance = ethers.utils.formatEther(balance);
  return balance;
};

export const checkInvestorship = async (contractAddress, walletAddress) => {
  if (!window.ethereum) {
    console.error("Ethereum Not Available");
    return false;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    campaignAbi.abi,
    signer
  );
  try {
    const isInvestor = await contract.investors(walletAddress);
    return await isInvestor.isValid;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const registerAsInvestor = async (contractAddress) => {
  const name = prompt("Enter Name");
  if (name.length <= 0) return;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    campaignAbi.abi,
    signer
  );
  try {
    const txn = await contract.registerInvestor(name);
    await txn.wait(2);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const fund = async (contractAddress, walletAddress, amount) => {
  if (amount <= 0) {
    alert("Please Enter a Valid Amount");
    return;
  }
  if (!checkInvestorship(contractAddress, walletAddress)) {
    await registerAsInvestor(contractAddress);
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    campaignAbi.abi,
    signer
  );
  try {
    const txn = await contract.pledgeFunds({
      value: ethers.utils.parseEther(amount),
    });
    await txn.wait(2);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const withdraw = async (contractAddress, walletAddress) => {
  if (!checkInvestorship(contractAddress, walletAddress)) {
    alert("Not registered as Investor");
    return false;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    campaignAbi.abi,
    signer
  );
  try {
    const txn = await contract.refund();
    await txn.wait(2);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const cancelCampaign = async (contractAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    campaignAbi.abi,
    signer
  );
  try {
    const txn = await contract.cancelCampaign();
    await txn.wait(2);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getStages = async (contractAddress, nStages) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    campaignAbi.abi,
    signer
  );
  try {
    let stages = [];
    for (let i = 1; i <= nStages; i++) {
      const stageDetail = await contract.getStageDetail(i);
      console.log(i, stageDetail);
      stages.push({
        amount: ethers.utils.formatEther(stageDetail.amountNeeded),
        deadline: new Date(stageDetail.deadline.toNumber() * 1000),
      });
    }
    return stages;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const releaseFundsToCampaigner = async (contractAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    campaignAbi.abi,
    signer
  );
  try {
    const txn = await contract.releaseFunds();
    await txn.wait(2);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const createNewCampaign = async (
  name,
  desc,
  stagePeriod,
  projectPeriod,
  totalAmt,
  stages
) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    import.meta.env.VITE_CONTRACT_ADDRESS,
    cfundingAbi.abi,
    signer
  );
  try {
    const txn = await contract.createCampaign(
      name,
      desc,
      stagePeriod,
      projectPeriod,
      ethers.utils.parseEther(totalAmt),
      stages.map((stage) => ethers.utils.parseEther(stage))
    );
    await txn.wait(2);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

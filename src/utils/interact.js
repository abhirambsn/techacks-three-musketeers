import { ethers } from "ethers";
import campaignAbi from "../abi/Campaign.json";

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
  await contract.registerInvestor(name);
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
    await contract.pledgeFunds({ value: ethers.utils.parseEther(amount) });
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
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
    await contract.refund();
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
    await contract.cancelCampaign();
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
        deadline: new Date(stageDetail.deadline.toNumber() * 1000)
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
    await contract.releaseFunds();
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
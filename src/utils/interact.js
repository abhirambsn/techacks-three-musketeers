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

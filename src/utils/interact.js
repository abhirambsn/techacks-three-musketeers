import { ethers } from "ethers";

export const getBalance = async (walletAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  let balance = await provider.getBalance(walletAddress);
  balance = ethers.utils.formatEther(balance);
  return balance;
};

import { ethers } from "ethers";
import campaignAbi from "../abi/Campaign.json";
import cfundingAbi from "../abi/CFunding.json";
import votingfactoryAbi from "../abi/VotingFactory.json";
import voteAbi from "../abi/Voting.json";

export const getBalance = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let balance = await signer.getBalance();
  balance = ethers.utils.formatEther(balance);
  return parseFloat(balance).toFixed(4);
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

export const registerAsInvestor = async (contractAddress, walletAddress) => {
  const name = prompt("Enter Name");
  if (name.length <= 0) return false;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    campaignAbi.abi,
    signer
  );
  try {
    // const resp = await axios.post(
    //   `${import.meta.env.VITE_API_URL}/api/${contractAddress}/registerInvestor`,
    //   {
    //     investorAddress: walletAddress,
    //     name,
    //   }
    // );
    // if (resp.status !== 200) {
    //   return false;
    // }
    const txn = await contract.registerInvestor(name);
    await txn.wait(1);
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
    await txn.wait(1);
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
    await txn.wait(1);
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
    await txn.wait(1);
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
  const votingFactoryContract = new ethers.Contract(
    import.meta.env.VITE_VOTING_FACTORY,
    votingfactoryAbi.abi,
    signer
  );
  try {
    let stages = [];
    for (let i = 1; i <= nStages; i++) {
      const stageDetail = await contract.getStageDetail(i);
      // const resp = await axios.get(
      //   `${import.meta.env.VITE_API_URL}/api/${contractAddress}/${i}/check`
      // );
      let vl = false;
      try {
        const valid = await votingFactoryContract.checkVote(contractAddress, i);
        vl = valid;
      } catch (e) {
        vl = false;
      }
      stages.push({
        amount: ethers.utils.formatEther(stageDetail.amountNeeded),
        deadline: new Date(stageDetail.deadline.toNumber() * 1000),
        voted: stageDetail.voted,
        created: vl,
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
    await txn.wait(1);
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
  stages,
  imgUrl,
  investorOffering,
  pptLink
) => {
  const stageSum = stages
    .map((s) => parseFloat(s))
    .reduce((pSum, a) => pSum + a, 0);
  if (stageSum > totalAmt) {
    console.log(stageSum);
    alert(
      "Stage Amount Sum is greater than Total Requested Amount, kindly adjust any one of the parameters"
    );
    return;
  } else if (stageSum < totalAmt) {
    const c = confirm(
      "Your tital Stage fund is less than the total Amount, do you wan to continue? it may lead to unexpected consequences!"
    );
    if (!c) {
      alert("Request Cancelled!");
      return;
    }
  }
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
      stages.map((stage) => ethers.utils.parseEther(stage)),
      imgUrl,
      investorOffering,
      pptLink
    );
    await txn.wait(1);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const completeCampaign = async (contractAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  try {
    const campaginContract = new ethers.Contract(
      contractAddress,
      campaignAbi.abi,
      signer
    );

    const txn = await campaginContract.completeCampaign();
    await txn.wait(1);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const voteForNextStage = async (
  contractAddress,
  stage,
  walletAddress,
  yes
) => {
  try {
    // const req = await axios.post(
    //   `${import.meta.env.VITE_API_URL}/api/${contractAddress}/${stage}/vote`,
    //   {
    //     yes,
    //     investorAddress: walletAddress,
    //   }
    // );

    // if (req.status === 201) {
    //   alert(req.data.message);
    //   return req.data.success;
    // }
    // return req.data.success;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const votingFactoryContract = new ethers.Contract(
      import.meta.env.VITE_VOTING_FACTORY,
      votingfactoryAbi.abi,
      signer
    );
    const txn = await votingFactoryContract.vote(
      contractAddress,
      walletAddress,
      stage,
      yes
    );
    await txn.wait(1);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const createVote = async (contractAddress, stage, powText) => {
  try {
    // let resp = await axios.get(
    //   `${import.meta.env.VITE_API_URL}/api/${contractAddress}/${stage}/check`
    // );
    // const isValid = resp.data.isValid;
    // if (isValid) {
    //   console.log("Vote already created");
    //   return true;
    // }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const votingFactoryContract = new ethers.Contract(
      import.meta.env.VITE_VOTING_FACTORY,
      votingfactoryAbi.abi,
      signer
    );

    const txn = await votingFactoryContract.createVote(
      contractAddress,
      stage,
      powText
    );
    await txn.wait(1);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const checkUserVote = async (contractAddress, walletAddress, stage) => {
  try {
    // const resp = await axios.post(
    //   `${import.meta.env.VITE_API_URL}/api/${contractAddress}/${stage}/check`,
    //   { address: walletAddress }
    // );
    // const voted = resp.data;
    // return voted;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const votingFactoryContract = new ethers.Contract(
      import.meta.env.VITE_VOTING_FACTORY,
      votingfactoryAbi.abi,
      signer
    );
    try {
      const voted = await votingFactoryContract.checkUserVote(
        contractAddress,
        walletAddress,
        stage
      );
      return voted;
    } catch (e) {
      console.error(e);
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getVoteOfUser = async (contractAddress, walletAddress, stage) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const votingFactoryContract = new ethers.Contract(
      import.meta.env.VITE_VOTING_FACTORY,
      votingfactoryAbi.abi,
      signer
    );

    const data = await votingFactoryContract.getVoteOfUser(
      contractAddress,
      walletAddress,
      stage
    );
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const completeStageVoting = async (contractAddress, stage) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      campaignAbi.abi,
      signer
    );
    const txn = await contract.voted(stage);
    await txn.wait(1);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getInvestmentRatio = async (contractAddress) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      campaignAbi.abi,
      signer
    );
    const ratio = await contract.getInvestorRatio();
    return ratio.toNumber();
  } catch (e) {
    console.error(e);
    return -1;
  }
};

export const getPOWLinks = async (contractAddress, currentStage) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      import.meta.env.VITE_VOTING_FACTORY,
      votingfactoryAbi.abi,
      signer
    );
    let arr = [];
    for (let i = 0; i < currentStage; i++) {
      const data = await contract.getStageVote(contractAddress, i + 1);
      const voteContract = new ethers.Contract(data, voteAbi.abi, signer);
      const powLink = await voteContract.proofOfWorkURL();
      arr.push(powLink);
    }
    return arr;
  } catch (e) {
    console.error(e);
    return [];
  }
};

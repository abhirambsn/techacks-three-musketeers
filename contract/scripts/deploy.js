// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const CFunding = await hre.ethers.getContractFactory("CFunding");
  const cfunding = await CFunding.deploy("AB Funding");

  await cfunding.deployed();

  console.log(`CFunding Contract Deployed at Address: ${cfunding.address}`);

  // const VotingFactory = await hre.ethers.getContractFactory("VotingFactory");
  // const votingFactory = await VotingFactory.deploy();

  // await votingFactory.deployed();

  // console.log(`Voting Factory Deployed at Address: ${votingFactory.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

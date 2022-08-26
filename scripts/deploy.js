const hre = require("hardhat");

async function main() {
  const MarketSentiment = await hre.ethers.getContractFactory(
    "MarketSentiment"
  );
  const marketSentiment = await MarketSentiment.deploy();

  await marketSentiment.deployed();

  // console.log(`MarketSentimentwith deployed to ${marketSentiment.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

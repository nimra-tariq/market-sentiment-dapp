/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `${process.env.REACT_APP_GOERLI_URL}`,
      accounts: [`${process.env.REACT_APP_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.REACT_APP_ETHERSCAN_API_KEY,
  },
};

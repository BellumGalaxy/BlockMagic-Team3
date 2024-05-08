require("@nomicfoundation/hardhat-toolbox");
require("hardhat/config");
require("@openzeppelin/hardhat-upgrades");

require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    mumbai: {
      url: process.env.RPC_URL,
      chainId: parseInt(`${process.env.CHAIN_ID}`),
      accounts: {
        mnemonic: process.env.SECRET
      }
    }
  },
  etherscan: {
    apiKey: process.env.API_KEY 
  }
};

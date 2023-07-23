/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { task } = require("hardhat/config");
const {
  API_URL_SEPOLIA,
  API_URL_MUMBAI,

  PRIVATE_KEY,
} = process.env;

task("account", "returns nonce and balance for specified address on multiple networks")
  .addParam("address")
  .setAction(async address => {
    const web3Sepolia = createAlchemyWeb3("https://eth-sepolia.g.alchemy.com/v2/2NXEYfKyf0aKKXw_fF4R2qfUP6uLQSlq");
    const web3Mumbai = createAlchemyWeb3("https://polygon-mumbai.g.alchemy.com/v2/z_2ghfSOziMNFpJFU1yIY2JHaKvLmpbn");
   

    const networkIDArr = ["Ethereum Sepolia:", "Polygon  Mumbai:"]
    const providerArr = [web3Sepolia, web3Mumbai];
    const resultArr = [];
    
    for (let i = 0; i < providerArr.length; i++) {
      const nonce = await providerArr[i].eth.getTransactionCount(address.address, "latest");
      const balance = await providerArr[i].eth.getBalance(address.address)
      resultArr.push([networkIDArr[i], nonce, parseFloat(providerArr[i].utils.fromWei(balance, "ether")).toFixed(2) + "ETH"]);
    }
    resultArr.unshift(["  |NETWORK|   |NONCE|   |BALANCE|  "])
    console.log(resultArr);
  });

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/2NXEYfKyf0aKKXw_fF4R2qfUP6uLQSlq",
      accounts: ["0x1ad6adcd5ef11f27b51be9022db9b983b2826a5887d3436db988e6ac27a70250"],
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/z_2ghfSOziMNFpJFU1yIY2JHaKvLmpbn",
      accounts: ["0x1ad6adcd5ef11f27b51be9022db9b983b2826a5887d3436db988e6ac27a70250"],
    },
    // arbitrum: {
    //   url: API_URL_ARBITRUM,
    //   accounts: [`0x${PRIVATE_KEY}`],
    // },
    // optimism: {
    //   url: API_URL_OPTIMISM,
    //   accounts: [`0x${PRIVATE_KEY}`],
    // },
  },
};

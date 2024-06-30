

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  console.log(taskArgs, hre);
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
// console.log(process.env);
// prod env
// const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
// const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || "";
// console.log("Prod", INFURA_API_KEY, SEPOLIA_PRIVATE_KEY);

// local ganache env
const LOCAL_PROVIDER_URL = process.env.LOCAL_PROVIDER_URL || "";
const LOCAL_ADMIN_PRIVATE_KEY = process.env.LOCAL_ADMIN_PRIVATE_KEY || "";
console.log("local", LOCAL_PROVIDER_URL, LOCAL_ADMIN_PRIVATE_KEY);
module.exports = {
  solidity: "0.8.19",
  networks: {
    // sepolia: {
    //   url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
    //   accounts: [`0x${SEPOLIA_PRIVATE_KEY}`],
    // },
    ganache: {
      url: `${LOCAL_PROVIDER_URL}`,
      accounts: [`0x${LOCAL_ADMIN_PRIVATE_KEY}`],
    },
  },
};


// Deploying contracts with account:  0x72D305Be710732e8731Fa98aa5b264894Bc728B0
// Account balance:  100000000000000000000
// DecentralizedKYC address:  0x2A022a8Daa52Af1cd5c763eD2A6EFD536Cbefc3B
const main = async () => {
  const kycContractFactory = await hre.ethers.getContractFactory("DeKYC");
  const kycContract = await kycContractFactory.deploy();
  await kycContract.deployed();
  console.log("Contract deployed to:", kycContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

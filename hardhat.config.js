require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("Generate", "generates a new wallet", async (taskArgs, hre) => {
  const mnemonic = await hre.ethers.utils.entropyToMnemonic(hre.ethers.utils.randomBytes(16));
  const wallet = hre.ethers.Wallet.fromMnemonic(mnemonic);
  console.log('mnemonic:', mnemonic);
  console.log('address:', wallet.address);
  console.log('privateKey:', wallet.privateKey);

});

task("greet", "calls greeting of a deployed contract", async (taskArgs, hre) => {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = Greeter.attach("0x471f75c45d57591a410615442c3cbcc94527068e");
  const greeting = await greeter.greet();
  console.log(greeting);
});

task("deploy", "Deploys contracts to main net", async (taskArgs, hre) => {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, world!");
  await greeter.deployed();
  hre.run("greet");
});

task("set", "sets greeting", async (taskArgs, hre) => {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = Greeter.attach("0x471f75c45d57591a410615442c3cbcc94527068e");
  const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
  hre.run("greet");
});


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    xdai: {
      url: "https://rpc.xdaichain.com/",
      accounts: ["0x2a85e96f0401fdc672cba823c3d2b714621f81cdf1e29d4f574179053b34ed7c"]
    }
  },
};

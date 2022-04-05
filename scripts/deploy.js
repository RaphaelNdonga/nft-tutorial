const pinataJs = require('../pinata');

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const selfieNFTContractFactory = await hre.ethers.getContractFactory("SelfieNFT");
    const selfieNFTContract = await selfieNFTContractFactory.deploy();
    await selfieNFTContract.deployed();
    console.log("Contract deployed at address: ", selfieNFTContract.address);
    console.log("Contract deployed by: ", deployer.address);
    console.log("Pinata: ", pinataJs.pinFile)
    const promiseURL = await pinataJs.pinFile();
    console.log("Promise url: ", promiseURL)
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log("Error: ", error)
        process.exit(1);
    }
}

runMain()
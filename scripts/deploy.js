const pinataJs = require('../pinata');

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const selfieNFTContractFactory = await hre.ethers.getContractFactory("SelfieNFT");
    const selfieNFTContract = await selfieNFTContractFactory.deploy();
    await selfieNFTContract.deployed();
    console.log("Contract deployed at address: ", selfieNFTContract.address);
    console.log("Contract deployed by: ", deployer.address);
    const promiseURL = await pinataJs.pinataFunction();
    console.log("Promise url: ", promiseURL)
    const tokenID = await selfieNFTContract.getTokenId()
    const txn = await selfieNFTContract.createNFT(promiseURL)
    await txn.wait()
    console.log("OpenSea address: ")
    console.log(`https://testnets.opensea.io/assets/${selfieNFTContract.address}/${tokenID}`)
    console.log("Rarible address:")
    console.log(`https://rinkeby.rarible.com/token/${selfieNFTContract.address}:${tokenID}`)
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
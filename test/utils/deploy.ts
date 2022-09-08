import { ethers } from "hardhat";

async function deployToken() {
    const signers = await ethers.getSigners();

    const TokenContract = await ethers.getContractFactory("Token");
    const token = await TokenContract.deploy();

    return { signers, token };
}

async function deployNFT() {
    const signers = await ethers.getSigners();

    const NFTContract = await ethers.getContractFactory("NFT");
    const nft = await NFTContract.deploy();

    return { signers, nft };
}

async function deployTokenAndNFT() {
    const { token } = await deployToken();
    const { signers, nft } = await deployNFT();

    return { token, nft, signers };
}

export { deployToken, deployNFT, deployTokenAndNFT };

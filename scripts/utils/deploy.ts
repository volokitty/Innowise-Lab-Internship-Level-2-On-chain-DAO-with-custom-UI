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

async function deployDAO() {
    const signers = await ethers.getSigners();

    const DAOContract = await ethers.getContractFactory("DAO");
    const dao = await DAOContract.deploy();

    return { signers, dao };
}

export { deployToken, deployNFT, deployDAO };

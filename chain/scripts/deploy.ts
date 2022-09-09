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

async function deployContracts() {
  const { signers, token } = await deployToken();
  const { nft } = await deployNFT();
  const { dao } = await deployDAO();

  await token.setMinterRole(nft.address);
  await nft.setTokenContract(token.address);
  await nft.setDAOContract(dao.address);
  await dao.setTokenContract(token.address);
  await dao.setNFTContract(nft.address);

  return { signers, token, nft, dao };
}

async function main() {
  await deployContracts();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export { deployToken, deployNFT, deployDAO, deployContracts };

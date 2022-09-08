import { expect } from "chai";
import { ethers } from "hardhat";

import { deployToken, deployNFT, deployDAO } from "./utils/deploy.ts";

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

describe("DAO", function () {
    describe("Deployment", function () {
        it("should deploy correct", async function () {
            await deployContracts();
        });
    });

    describe("Voting", function () {
        it("should create voting", async function () {
            const { signers, token, nft, dao } = await deployContracts();
            
            await nft.safeMint({
                value: ethers.utils.parseUnits("150.0", "wei"),
            });

            await dao.createVoting("bla-bla", [1, 2, 3, 4, 5, 6, 7, 8, 9], 300, 0);
            const votingsCount = await dao.getVotingsCount();

            expect(votingsCount).to.eq(1);
        });

        it("should vote positive", async function () {
            const { signers, token, nft, dao } = await deployContracts();
            
            await nft.safeMint({
                value: ethers.utils.parseUnits("150.0", "wei"),
            });

            await token.approve(dao.address, 150);

            await dao.createVoting("bla-bla", [1, 2, 3, 4, 5, 6, 7, 8, 9], 300, 0);
            await dao.vote(15, true);
            
            const voting = await dao.votings(0);

            const positiveVotes = voting.positive.toNumber();

            expect(positiveVotes).to.eq(15);
        });
    });
});

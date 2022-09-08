import { expect } from "chai";
import { ethers } from "hardhat";

import { deployToken, deployNFT } from "./utils/deploy.ts";

async function deployTokenAndNFT() {
    const { token } = await deployToken();
    const { signers, nft } = await deployNFT();

    return { token, nft, signers };
}

describe("NFT", function () {
    describe("Deployment", function () {
        it("should assing zero NFTs to all addresses", async function () {
            const { signers, nft } = await deployNFT();
            const [owner, addr1] = signers;

            const ownerBalance = await nft.balanceOf(owner.address);
            const addr1Balance = await nft.balanceOf(addr1.address);

            expect(ownerBalance).to.eq(0);
            expect(addr1Balance).to.eq(0);
        });

        it("should return unique parameter values equal to [1, 1, 2, 6, 2, 3, 4, 6, 5]", async function () {
            const { nft } = await deployNFT();

            const uniqueParameterValues = await nft.getUniqueParameterValues();

            expect(uniqueParameterValues).to.eql([1, 1, 2, 6, 2, 3, 4, 6, 5]);
        });
    });

    describe("Minting", function () {
        it("should mint nft and tokens in the same amount that the user sent wei", async function () {
            const { token, nft, signers } = await deployTokenAndNFT();
            const [owner] = signers;

            await token.setMinterRole(nft.address);
            await nft.setTokenContract(token.address);

            await nft.safeMint({
                value: ethers.utils.parseUnits("150.0", "wei"),
            });

            const ownerBalance = await token.balanceOf(owner.address);

            expect(ownerBalance).to.eq(150);
        });

        it("should return rarity of first nft equal to 1", async function () {
            const { token, nft, signers } = await deployTokenAndNFT();
            const [owner] = signers;

            await token.setMinterRole(nft.address);
            await nft.setTokenContract(token.address);

            await nft.safeMint({
                value: ethers.utils.parseUnits("150.0", "wei"),
            });

            const firstNFTRarity = await nft.getTokenRarity(0);

            expect(firstNFTRarity).to.eq(1);
        });

        it("should return next token id equal to 1", async function () {
            const { token, nft, signers } = await deployTokenAndNFT();
            const [owner] = signers;

            await token.setMinterRole(nft.address);
            await nft.setTokenContract(token.address);

            await nft.safeMint({
                value: ethers.utils.parseUnits("150.0", "wei"),
            });
            
            const nextTokenId = await nft.getNextTokenId();

            expect(nextTokenId).to.eq(1);
        });
    });
});

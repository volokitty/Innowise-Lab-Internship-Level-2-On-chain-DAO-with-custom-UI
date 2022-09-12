import { expect } from 'chai';
import { ethers } from 'hardhat';

import { deployToken } from '../scripts/deploy.ts';

describe('Token', function () {
  describe('Deployment', function () {
    it('should assign zero tokens to all addresses', async function () {
      const { signers, token } = await deployToken();
      const [owner, addr1] = signers;

      const ownerBalance = await token.balanceOf(owner.address);
      const addr1Balance = await token.balanceOf(addr1.address);

      expect(ownerBalance).to.eq(0);
      expect(addr1Balance).to.eq(0);
    });
  });

  describe('Minting', function () {
    it('should give other address minter role and send 20 tokens to owner', async function () {
      const { signers, token } = await deployToken();
      const [owner, addr1] = signers;

      await token.setMinterRole(addr1.address);
      await token.connect(addr1).mint(owner.address, 20);
      const ownerBalance = await token.balanceOf(owner.address);

      expect(ownerBalance).to.eq(20);
    });
  });
});

export default deployToken;

import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';

import contractsAddresses from 'shared/config/contracts';

import { abi as tokenABI } from 'artifacts/contracts/Token.sol/Token.json';
import { abi as nftABI } from 'artifacts/contracts/NFT.sol/NFT.json';
import { abi as daoABI } from 'artifacts/contracts/DAO.sol/DAO.json';

export interface Blockchain {
  web3: Web3;
  onDisconnect: (callback: () => void) => void;
  contracts: {
    token: Contract;
    nft: Contract;
    dao: Contract;
  };
}

export const BlockchainInit = (): Blockchain => {
  const web3 = new Web3(Web3.givenProvider);

  const { token: tokenAddress, nft: nftAddress, dao: daoAddress } = contractsAddresses;

  const token = new web3.eth.Contract(tokenABI as AbiItem[], tokenAddress);
  const nft = new web3.eth.Contract(nftABI as AbiItem[], nftAddress);
  const dao = new web3.eth.Contract(daoABI as AbiItem[], daoAddress);

  const contracts = { token, nft, dao };

  const onDisconnect = (callback: () => any): void =>
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        callback();
      }
    });

  return {
    web3,
    onDisconnect,
    contracts,
  };
};

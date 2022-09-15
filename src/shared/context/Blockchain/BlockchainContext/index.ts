import React from 'react';

import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

interface IBlockchainContext {
  account: string;
  connected: boolean;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  web3: Web3;
  contracts: {
    token: Contract;
    nft: Contract;
    dao: Contract;
  };
}

const BlockchainContext = React.createContext<Partial<IBlockchainContext>>({
  account: '',
  connected: false,
});

export default BlockchainContext;

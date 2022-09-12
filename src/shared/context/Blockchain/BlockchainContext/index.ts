import React from 'react';

import { BlockchainReturnType } from 'shared/lib/blockchain';

interface IBlockchainContext {
  account: string;
  connected: boolean;
  hasMetamask: boolean;
  ethBalance: string;
  tokenBalance: string;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  blockchain: BlockchainReturnType;
}

const BlockchainContext = React.createContext<Partial<IBlockchainContext>>({});

export default BlockchainContext;

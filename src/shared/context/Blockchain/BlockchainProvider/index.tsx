import React from 'react';

import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';
import useBlockchainProvider from './hooks/useBlockchainProvider';

interface BlockchainProviderProps {
  children?: JSX.Element;
}

const BlockchainProvider: React.FC<BlockchainProviderProps> = ({ children }) => {
  const value = useBlockchainProvider();

  return <BlockchainContext.Provider value={value}>{children}</BlockchainContext.Provider>;
};

export default BlockchainProvider;

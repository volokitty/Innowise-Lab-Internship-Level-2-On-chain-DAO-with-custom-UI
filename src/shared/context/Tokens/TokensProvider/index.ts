import React from 'react';

import TokensContext from '../TokensContext';
import useBlockchainProvider from './hooks/useBlockchainProvider';

interface TokensProviderProps {
  children?: JSX.Element;
}

const BlockchainProvider: React.FC<TokensProviderProps> = ({ children }) => {
  const value = useBlockchainProvider();

  return <TokensContext.Provider>{children}</TokensContext.Provider>;
};

export default BlockchainProvider;

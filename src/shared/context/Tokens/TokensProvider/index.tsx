import React from 'react';

import TokensContext from '../TokensContext';
import useTokensProvider from './hooks/useTokensProvider';

interface TokensProviderProps {
  children?: JSX.Element;
}

const TokensProvider: React.FC<TokensProviderProps> = ({ children }) => {
  const value = useTokensProvider();

  return <TokensContext.Provider value={value}>{children}</TokensContext.Provider>;
};

export default TokensProvider;

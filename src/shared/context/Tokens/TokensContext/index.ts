import React from 'react';

export interface ITokensContext {
  ethBalance: string;
  daotBalance: string;
  nfts: string[][];
}

const TokensContext = React.createContext<ITokensContext>({
  ethBalance: '0',
  daotBalance: '0',
  nfts: [['0', '0']],
});

export default TokensContext;

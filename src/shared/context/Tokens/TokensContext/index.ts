import React from 'react';

export interface ITokensContext {
  ethBalance: string;
  daotBalance: string;
  nfts: string[][];
  updateNFTs: () => void;
  updateDAOTBalance: () => void;
  updateETHBalance: () => void;
}

const TokensContext = React.createContext<ITokensContext>({
  ethBalance: '0',
  daotBalance: '0',
  nfts: [['0', '0']],
  updateNFTs: () => undefined,
  updateDAOTBalance: () => undefined,
  updateETHBalance: () => undefined,
});

export default TokensContext;

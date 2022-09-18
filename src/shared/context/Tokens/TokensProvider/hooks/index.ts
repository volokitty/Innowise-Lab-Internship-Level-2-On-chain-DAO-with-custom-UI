import React, { useState } from 'react';
import { ITokensContext } from '../../TokensContext';

interface TokensProvider extends ITokensContext {
  setETHBalance: React.Dispatch<React.SetStateAction<string>>;
  setDAOTBalance: React.Dispatch<React.SetStateAction<string>>;
  setNFTs: React.Dispatch<React.SetStateAction<string[][]>>;
}

const useTokensProvider = (): TokensProvider => {
  const [ethBalance, setETHBalance] = useState('0');
  const [daotBalance, setDAOTBalance] = useState('0');
  const [nfts, setNFTs] = useState([['0', '0']]);

  return { ethBalance, setETHBalance, daotBalance, setDAOTBalance, nfts, setNFTs };
};

export default useTokensProvider;

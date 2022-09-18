import { useContext, useEffect, useState } from 'react';
import AlertContext from 'shared/context/Alert/AlertContext';

import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';
import TokensContext from 'shared/context/Tokens/TokensContext';

interface StatusBar {
  connected: boolean;
  buttonText: string;
  ethBalance: string;
  daotBalance: string;
  totalNFTRarity: number;
  onClick: () => void;
}

const useStatusBar = (): StatusBar => {
  const { connected = false, account = '' } = useContext(BlockchainContext);
  const { ethBalance, daotBalance, updateETHBalance, updateDAOTBalance, nfts, updateNFTs } =
    useContext(TokensContext);

  const [buttonText, setButtonText] = useState(account);
  const [totalNFTRarity, setTotalNFTRarity] = useState(0);

  const { spawnSuccessAlert, spawnErrorAlert } = useContext(AlertContext);

  const reduceAddress = (address: string): string =>
    `${address.slice(0, 5)}...${address.slice(-2)}`;

  useEffect(() => {
    setTotalNFTRarity(
      nfts
        .map(([_, rarity]) => [+rarity])
        .flat()
        .reduce((prev, curr) => prev + curr, 0)
    );
  }, [nfts]);

  useEffect(() => {
    setButtonText(reduceAddress(account));

    updateETHBalance();
    updateDAOTBalance();
    updateNFTs();
  }, [account]);

  const onClick = (): void => {
    navigator.clipboard
      .writeText(account)
      .then(() => spawnSuccessAlert?.('Copied!'))
      .catch(() => spawnErrorAlert?.("Can't copy"));
  };

  return { connected, buttonText, ethBalance, daotBalance, totalNFTRarity, onClick };
};

export default useStatusBar;

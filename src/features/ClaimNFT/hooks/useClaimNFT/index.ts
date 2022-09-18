import React, { useContext, useState } from 'react';

import AlertContext from 'shared/context/Alert/AlertContext';
import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';
import TokensContext from 'shared/context/Tokens/TokensContext';

interface ClaimNFT {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
  buttonOnClick: () => void;
}

const useClaimNFT = (): ClaimNFT => {
  const { spawnSuccessAlert, spawnErrorAlert } = useContext(AlertContext);
  const { account, web3, contracts } = useContext(BlockchainContext);
  const { updateETHBalance, updateDAOTBalance, updateNFTs } = useContext(TokensContext);
  const nft = contracts?.nft;

  const [inputValue, setInputValue] = useState('0');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, '');

    setInputValue(value);
  };

  const handleInputBlur = (): void => {
    if (inputValue === '') {
      setInputValue('0');
    }
  };

  const buttonOnClick = (): void => {
    if (+inputValue < 1) {
      return spawnErrorAlert?.('The amount sent must be greater than zero');
    }

    nft?.methods
      .safeMint()
      .send({ value: web3?.utils.toHex(inputValue), from: account })
      .then(() => spawnSuccessAlert?.('Claimed NFT!'))
      .then(() => setInputValue('0'))
      .then(() => updateDAOTBalance())
      .then(() => updateETHBalance())
      .then(() => updateNFTs())
      .catch(({ message }: { message: string }) => spawnErrorAlert?.(message));
  };

  return { inputValue, handleInputChange, handleInputBlur, buttonOnClick };
};

export default useClaimNFT;

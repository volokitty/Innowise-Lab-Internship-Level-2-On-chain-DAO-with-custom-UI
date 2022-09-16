import React, { useContext, useState } from 'react';
import AlertContext from 'shared/context/Alert/AlertContext';

interface ClaimNFT {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
  buttonOnClick: () => void;
}

const useClaimNFT = (): ClaimNFT => {
  const { spawnSuccessAlert } = useContext(AlertContext);
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
    spawnSuccessAlert?.('Claimed NFT!');
  };

  return { inputValue, handleInputChange, handleInputBlur, buttonOnClick };
};

export default useClaimNFT;

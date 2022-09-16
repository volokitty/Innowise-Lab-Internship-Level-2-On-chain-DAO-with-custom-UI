import React from 'react';

import Button from 'shared/ui/Button';
import Input from 'shared/ui/Input';

import useClaimNFT from './hooks/useClaimNFT';

import style from './ClaimNFT.module.css';

const ClaimNFT: React.FC = () => {
  const { claimNFT } = style;
  const { inputValue, handleInputChange, handleInputBlur, buttonOnClick } = useClaimNFT();

  return (
    <div className={claimNFT}>
      <Input
        elementSize="normal"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder="wei to exchange"
      />
      <Button size="normal" theme="dark" onClick={buttonOnClick}>
        Claim NFT
      </Button>
    </div>
  );
};

export default ClaimNFT;

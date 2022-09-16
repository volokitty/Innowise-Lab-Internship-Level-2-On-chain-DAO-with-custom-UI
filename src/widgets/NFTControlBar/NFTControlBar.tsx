import React from 'react';

import LabelCaption from 'shared/ui/LabelCaption';
import ClaimNFT from 'features/ClaimNFT';

import useNFTControlBar from './hooks/useNFTControlBar';

import style from './NFTControlBar.module.css';

const NFTControlBar: React.FC = () => {
  const { bar } = style;
  const { totalNFTPower } = useNFTControlBar();

  return (
    <div className={bar}>
      <LabelCaption label="Total NFT power" caption={`${totalNFTPower}`} size="normal" />
      <ClaimNFT />
    </div>
  );
};

export default NFTControlBar;

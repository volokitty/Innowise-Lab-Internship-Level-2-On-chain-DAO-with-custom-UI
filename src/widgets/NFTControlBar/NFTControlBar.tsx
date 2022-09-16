import React from 'react';

import LabelCaption from 'shared/ui/LabelCaption';
import ClaimNFT from 'features/ClaimNFT';

import style from './NFTControlBar.module.css';

const NFTControlBar: React.FC = () => {
  const { bar } = style;

  return (
    <div className={bar}>
      <LabelCaption label="Total NFT power" caption="0" size="normal" />
      <ClaimNFT />
    </div>
  );
};

export default NFTControlBar;

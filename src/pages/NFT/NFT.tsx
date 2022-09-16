import React, { useContext } from 'react';
import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';

import NFTControlBar from 'widgets/NFTControlBar';

import style from './NFT.module.css';

const NFT: React.FC = () => {
  const { nft } = style;
  const { connected = false } = useContext(BlockchainContext);

  if (!connected) {
    return (
      <div className={nft}>
        <h1>Connect wallet first</h1>
      </div>
    );
  }

  return (
    <div className={nft}>
      <div>
        <NFTControlBar />
      </div>
    </div>
  );
};

export default NFT;

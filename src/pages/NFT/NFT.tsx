import ClaimNFT from 'features/ClaimNFT';
import React from 'react';
import NFTCard from 'widgets/NFTCard';

import useNFTPage from './hooks/useNFTPage';

import style from './NFT.module.css';

const NFT: React.FC = () => {
  const { nft, claim, nftCards } = style;
  const { connected, nfts } = useNFTPage();

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
        <div className={claim}>
          <ClaimNFT />
        </div>
        <div className={nftCards}>
          {nfts.map(([id, rarity]) => (
            <NFTCard key={id} id={id} rarity={rarity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFT;

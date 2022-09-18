import React from 'react';

import style from './NFTCard.module.css';

interface NFTCardProps {
  id: string;
  rarity: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ id, rarity }) => {
  const { card } = style;

  return (
    <div className={card}>
      <span>#{id}</span>
      <span>Rarity: {rarity}</span>
    </div>
  );
};

export default NFTCard;

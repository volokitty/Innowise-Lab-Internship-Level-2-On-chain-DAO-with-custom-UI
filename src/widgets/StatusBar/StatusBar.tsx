import React from 'react';

import useStatusBar from './hooks/useStatusBar';

import Button from 'shared/ui/Button';
import Balance from 'shared/ui/Balance';
import LabelCaption from 'shared/ui/LabelCaption';

import ethLogo from 'assets/ethereum.png';
import daotLogo from 'assets/daot.png';

import style from './StatusBar.module.css';

const StatusBar: React.FC = () => {
  const { connected, buttonText, ethBalance, daotBalance, totalNFTRarity, onClick } =
    useStatusBar();
  const { statusBar, balances } = style;

  return connected ? (
    <div className={statusBar}>
      <LabelCaption
        label="Total NFT rarity"
        caption={`${totalNFTRarity}`}
        theme="light"
        size="normal"
      />
      <div className={balances}>
        <Balance logoPath={daotLogo} tokenTicker="DAOT" balance={daotBalance} />
        <Balance logoPath={ethLogo} tokenTicker="ETH" balance={ethBalance} />
        <Button theme="light" size="small" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default StatusBar;

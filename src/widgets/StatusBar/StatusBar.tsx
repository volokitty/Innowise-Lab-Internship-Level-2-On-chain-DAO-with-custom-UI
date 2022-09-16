import React from 'react';

import useStatusBar from './hooks/useStatusBar';

import Button from 'shared/ui/Button';
import Balance from 'shared/ui/Balance';

import ethLogo from 'assets/ethereum.png';
import daotLogo from 'assets/daot.png';

import style from './StatusBar.module.css';

const StatusBar: React.FC = () => {
  const { connected, buttonText, ethBalance, tokenBalance, onClick } = useStatusBar();
  const { statusBar } = style;

  return connected ? (
    <div className={statusBar}>
      <div>
        <Balance logoPath={daotLogo} tokenTicker="DAOT" balance={tokenBalance} />
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

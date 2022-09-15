import React from 'react';

import useStatusBar from './hooks/useStatusBar';

import Button from 'shared/ui/Button';
import Balance from 'shared/ui/Balance';

import ethLogo from 'assets/ethereum.png';
import daotLogo from 'assets/daot.png';

import style from './StatusBar.module.css';

const StatusBar: React.FC = () => {
  const { connected, buttonText, onClick } = useStatusBar();
  const { statusBar } = style;

  return connected ? (
    <div className={statusBar}>
      <div>
        <Balance logoPath={daotLogo} tokenTicker="DAOT" balance="я дохуя богатый" />
        <Balance logoPath={ethLogo} tokenTicker="ETH" balance="хуй" />
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

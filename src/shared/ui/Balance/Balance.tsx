import React from 'react';

import style from './Balance.module.css';

interface BalanceProps {
  logoPath: string;
  balance: string;
  tokenTicker: string;
}

const Balance: React.FC<BalanceProps> = ({ logoPath, balance, tokenTicker }) => {
  const { bal } = style;

  return (
    <span className={bal}>
      <img src={logoPath} />
      {`${balance} ${tokenTicker}`}
    </span>
  );
};

export default Balance;

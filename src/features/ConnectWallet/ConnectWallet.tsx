import React from 'react';

import useConnectWallet from './hooks/useConnectWallet';
import Button from 'shared/ui/Button';

import style from './ConnectWallet.module.css';

const openMetamaskPage = (): void => {
  window.open('https://metamask.io/download/', '_blank');
};

const ConnectWallet: React.FC = () => {
  const { hasEthereumProvider, connectWallet, account } = useConnectWallet();
  const { wallet } = style;

  return (
    <span className={wallet}>
      {account ?? (
        <Button buttonTheme="dark" onClick={hasEthereumProvider ? connectWallet : openMetamaskPage}>
          Connect wallet
        </Button>
      )}
    </span>
  );
};

export default ConnectWallet;

import React from 'react';

import useConnectWallet from './hooks/useConnectWallet';

import Button from 'shared/ui/Button';

const ConnectWallet: React.FC = () => {
  const { buttonText, onClick } = useConnectWallet();

  return (
    <Button buttonTheme="dark" onClick={onClick}>
      {buttonText}
    </Button>
  );
};

export default ConnectWallet;

import { useContext, useEffect, useState } from 'react';
import AlertContext from 'shared/context/Alert/AlertContext';

import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';

interface StatusBar {
  connected: boolean;
  buttonText: string;
  onClick: () => void;
}

const useStatusBar = (): StatusBar => {
  const { connected = false, account = '', contracts } = useContext(BlockchainContext);
  const [buttonText, setButtonText] = useState(account);

  const { spawnSuccessAlert, spawnErrorAlert } = useContext(AlertContext);

  const reduceAddress = (address: string): string =>
    `${address.slice(0, 5)}...${address.slice(-2)}`;

  useEffect(() => {
    setButtonText(reduceAddress(account));

    if (account.length) {
      contracts?.token.methods.balanceOf(account).call(console.log);
    }
  }, [account]);

  const onClick = (): void => {
    navigator.clipboard
      .writeText(account)
      .then(() => spawnSuccessAlert?.('Copied!'))
      .catch(() => spawnErrorAlert?.("Can't copy"));
  };

  return { connected, buttonText, onClick };
};

export default useStatusBar;

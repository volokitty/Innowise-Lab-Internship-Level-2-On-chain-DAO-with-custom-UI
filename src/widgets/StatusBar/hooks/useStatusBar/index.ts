import { useContext, useEffect, useState } from 'react';
import AlertContext from 'shared/context/Alert/AlertContext';

import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';

const useStatusBar = (): {
  connected: boolean;
  buttonText: string;
  ethBalance: string;
  onClick: () => void;
} => {
  const { connected = false, account = '0x0', ethBalance = '0' } = useContext(BlockchainContext);
  const [buttonText, setButtonText] = useState(account);

  const { spawnSuccessAlert, spawnErrorAlert } = useContext(AlertContext);

  const reduceAddress = (address: string): string =>
    `${address.slice(0, 5)}...${address.slice(-2)}`;

  useEffect(() => setButtonText(reduceAddress(account)), [account]);

  const onClick = (): void => {
    navigator.clipboard
      .writeText(account)
      .then(() => spawnSuccessAlert?.('Copied!'))
      .catch(() => spawnErrorAlert?.("Can't copy"));
  };

  return { connected, buttonText, ethBalance, onClick };
};

export default useStatusBar;

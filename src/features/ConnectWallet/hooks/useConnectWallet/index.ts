import { useContext, useEffect, useState } from 'react';
import AlertContext from 'shared/context/Alert/AlertContext';

import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';

const useConnectWallet = (): {
  buttonText: string;
  onClick: () => void;
} => {
  const {
    hasMetamask = false,
    connected = false,
    setAccount,
    setConnected,
    blockchain,
  } = useContext(BlockchainContext);

  const { spawnErrorAlert } = useContext(AlertContext);

  const openMetamaskPage = (): void => {
    blockchain?.openMetamaskPage();
  };

  const connect = (): void => {
    blockchain
      ?.connectWallet()
      .then((account) => {
        setAccount?.(account);
        setConnected?.(true);
      })
      .catch(({ message }) => spawnErrorAlert?.(message));
  };

  const disconnect = (): void => {
    setAccount?.('');
    setConnected?.(false);
  };

  const [state, setState] = useState<{ onClick: () => void; buttonText: string }>({
    onClick: connect,
    buttonText: 'Connect',
  });

  useEffect(() => {
    if (!hasMetamask) {
      setState({ onClick: openMetamaskPage, buttonText: 'Download Metamask' });
    } else if (hasMetamask && !connected) {
      setState({ onClick: connect, buttonText: 'Connect' });
    } else {
      setState({ onClick: disconnect, buttonText: 'Disconnect' });
    }
  }, [connected]);

  return state;
};

export default useConnectWallet;

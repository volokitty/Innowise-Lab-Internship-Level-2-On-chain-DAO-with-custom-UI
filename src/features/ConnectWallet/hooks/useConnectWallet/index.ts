import { useContext, useEffect, useState } from 'react';
import AlertContext from 'shared/context/Alert/AlertContext';

import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';

interface ConnectWallet {
  buttonText: string;
  onClick: () => void;
}

const useConnectWallet = (): ConnectWallet => {
  const { connected = false, setAccount, setConnected, web3 } = useContext(BlockchainContext);

  const { spawnSuccessAlert, spawnErrorAlert } = useContext(AlertContext);

  const hasMetamask = Boolean(web3?.givenProvider);

  const openMetamaskPage = (): void => {
    window.open('https://metamask.io/download/', '_blank');
  };

  const connect = (): void => {
    web3?.eth
      .requestAccounts()
      .then((accounts) => {
        const [account] = accounts;
        setAccount?.(account);
        setConnected?.(true);
      })
      .then(() => spawnSuccessAlert?.('Connected'))
      .catch(({ message }) => spawnErrorAlert?.(message));
  };

  const disconnect = (): void => {
    setConnected?.(false);
    spawnSuccessAlert?.('Disconnected');
  };

  const [state, setState] = useState<{ onClick: () => void; buttonText: string }>({
    onClick: connect,
    buttonText: 'Connect',
  });

  useEffect(() => {
    window.ethereum.on('accountsChanged', async (accounts: string[]) => {
      if (accounts.length > 0) {
        const accounts = await web3?.eth.getAccounts();

        if (accounts !== undefined) {
          setAccount?.(accounts[0]);
        }
      }
    });
  }, []);

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

import { useState, useEffect } from 'react';

import { BlockchainInit } from 'shared/lib/blockchain';

const useBlockchainProvider = (): {
  account: string;
  connected: boolean;
  hasMetamask: boolean;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  blockchain: any;
} => {
  const checkLocalStorageConnection = (): boolean =>
    localStorage.getItem('connection') === 'connected';

  const [account, setAccount] = useState('');
  const [connected, setConnected] = useState(checkLocalStorageConnection());

  const blockchain = BlockchainInit();
  const { hasMetamask, getAccounts, onDisconnect, setLocalStorageConnection } = blockchain;

  useEffect(() => {
    if (hasMetamask) {
      getAccounts()
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            if (checkLocalStorageConnection()) {
              setAccount(account[0]);
              setConnected(true);
            }
          }
        })
        .then(() =>
          onDisconnect(() => {
            setAccount('');
            setConnected(false);
          })
        )
        .catch((e) => console.log(e));
    }
  }, []);

  useEffect(() => {
    setLocalStorageConnection(connected);
  }, [connected]);

  return {
    account,
    connected,
    hasMetamask,
    setAccount,
    setConnected,
    blockchain,
  };
};

export default useBlockchainProvider;

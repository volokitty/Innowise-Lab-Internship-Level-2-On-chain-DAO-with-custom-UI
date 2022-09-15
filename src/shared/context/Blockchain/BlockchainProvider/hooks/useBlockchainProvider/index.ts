import { useState, useEffect, useContext } from 'react';

import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import { BlockchainInit } from 'shared/lib/blockchain';
import AlertContext from 'shared/context/Alert/AlertContext';

interface BlockchainProvider {
  account: string;
  connected: boolean;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  web3: Web3;
  contracts: {
    token: Contract;
    nft: Contract;
    dao: Contract;
  };
}

const useBlockchainProvider = (): BlockchainProvider => {
  const { spawnSuccessAlert } = useContext(AlertContext);
  const [account, setAccount] = useState('');
  const [connected, setConnected] = useState(false);

  const blockchain = BlockchainInit();
  const { web3, onDisconnect, contracts } = blockchain;

  const hasMetamask = Boolean(web3?.givenProvider);

  useEffect(() => {
    if (hasMetamask) {
      onDisconnect(() => {
        setConnected(false);
        spawnSuccessAlert?.('Disconnected');
      });
    }
  }, []);

  return {
    account,
    connected,
    setAccount,
    setConnected,
    web3,
    contracts,
  };
};

export default useBlockchainProvider;

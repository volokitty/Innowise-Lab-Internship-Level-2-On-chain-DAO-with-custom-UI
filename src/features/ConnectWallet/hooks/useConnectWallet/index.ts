import { useEffect, useState } from 'react';
import Web3 from 'web3';

const useConnectWallet = (): {
  hasEthereumProvider: boolean;
  connectWallet: () => void;
  account: string | undefined;
} => {
  const [account, setAccount] = useState<string>();

  const web3 = new Web3(Web3.givenProvider);

  const provider = Web3.givenProvider;
  const hasEthereumProvider = Boolean(provider);

  const connectWallet = (): void => {
    if (hasEthereumProvider) {
      const requestAccounts = async (): Promise<string> => {
        const [account] = await web3.eth.requestAccounts();
        return account;
      };

      requestAccounts()
        .then((account) => setAccount(account))
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    if (hasEthereumProvider) {
      web3.eth
        .getAccounts()
        .then((accounts) => setAccount(accounts[0]))
        .catch(console.log);
    }
  }, []);

  return { hasEthereumProvider, connectWallet, account };
};

export default useConnectWallet;

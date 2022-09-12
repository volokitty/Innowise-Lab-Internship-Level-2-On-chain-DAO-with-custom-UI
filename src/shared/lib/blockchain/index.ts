import Web3 from 'web3';

export interface BlockchainReturnType {
  openMetamaskPage: () => void;
  connectWallet: () => Promise<string>;
  setLocalStorageConnection: (connected: boolean) => void;
  onDisconnect: (callback: () => any) => void;
  getAccounts: () => Promise<string[]>;
  hasMetamask: boolean;
}

export const BlockchainInit = (): BlockchainReturnType => {
  const web3 = new Web3(Web3.givenProvider);

  const hasMetamask = Boolean(web3.givenProvider);

  const setLocalStorageConnection = (connected: boolean): void =>
    localStorage.setItem('connection', connected ? 'connected' : 'disconnected');

  const openMetamaskPage = (): void => {
    window.open('https://metamask.io/download/', '_blank');
  };

  const connectWallet = async (): Promise<string> => {
    const [account] = await web3.eth.requestAccounts();

    return account;
  };

  const onDisconnect = (callback: () => any): void =>
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        callback();
      }
    });

  const getAccounts = async (): Promise<string[]> => {
    return await web3.eth.getAccounts();
  };

  return {
    openMetamaskPage,
    connectWallet,
    setLocalStorageConnection,
    onDisconnect,
    getAccounts,
    hasMetamask,
  };
};

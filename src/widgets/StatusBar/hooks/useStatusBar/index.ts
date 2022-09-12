import { useContext } from 'react';

import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';

const useStatusBar = (): {
  connected: boolean;
  account: string;
  ethBalance: string;
  onClick: () => void;
} => {
  const { connected = false, account = '', ethBalance = '0' } = useContext(BlockchainContext);
  const onClick = (): void => {
    navigator.clipboard
      .writeText(account)
      .then(() => console.log('Copied successfully!'))
      .catch((e) => console.log(e));
  };

  return { connected, account, ethBalance, onClick };
};

export default useStatusBar;

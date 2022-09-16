import { useContext, useEffect, useState } from 'react';
import AlertContext from 'shared/context/Alert/AlertContext';

import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';

interface StatusBar {
  connected: boolean;
  buttonText: string;
  tokenBalance: string;
  ethBalance: string;
  onClick: () => void;
}

const useStatusBar = (): StatusBar => {
  const { connected = false, account = '', contracts, web3 } = useContext(BlockchainContext);
  const [ethBalance, setEthBalance] = useState('');
  const [tokenBalance, setTokenBalance] = useState('');
  const [buttonText, setButtonText] = useState(account);

  const { spawnSuccessAlert, spawnErrorAlert } = useContext(AlertContext);

  const reduceAddress = (address: string): string =>
    `${address.slice(0, 5)}...${address.slice(-2)}`;

  useEffect(() => {
    setButtonText(reduceAddress(account));

    if (account !== '') {
      web3?.eth
        .getBalance(account)
        .then((result) => {
          const eth = web3?.utils.fromWei(result, 'ether');

          setEthBalance(eth);
        })
        .catch((error) => spawnErrorAlert?.(error));

      contracts?.token.methods.balanceOf(account).call((error: any, result: string) => {
        if (error !== null) {
          spawnErrorAlert?.(error);
        }

        const eth = web3?.utils.fromWei(result, 'ether');

        if (eth !== undefined) {
          setTokenBalance?.(eth);
        }
      });
    }
  }, [account]);

  const onClick = (): void => {
    navigator.clipboard
      .writeText(account)
      .then(() => spawnSuccessAlert?.('Copied!'))
      .catch(() => spawnErrorAlert?.("Can't copy"));
  };

  return { connected, buttonText, ethBalance, tokenBalance, onClick };
};

export default useStatusBar;

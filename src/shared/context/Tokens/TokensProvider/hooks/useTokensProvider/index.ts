import { useContext, useEffect, useState } from 'react';

import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';
import AlertContext from 'shared/context/Alert/AlertContext';

interface TokensProvider {
  ethBalance: string;
  daotBalance: string;
  nfts: string[][];
  updateNFTs: () => void;
  updateDAOTBalance: () => void;
  updateETHBalance: () => void;
}

const useTokensProvider = (): TokensProvider => {
  const { web3, contracts, account = '' } = useContext(BlockchainContext);
  const { spawnErrorAlert } = useContext(AlertContext);

  const [ethBalance, setETHBalance] = useState('0');
  const [daotBalance, setDAOTBalance] = useState('0');
  const [nfts, setNFTs] = useState([['0', '0']]);

  const nftContract = contracts?.nft;
  const tokenContract = contracts?.token;

  const updateNFTs = (): void => {
    nftContract?.methods
      .getNFTs()
      .call({ from: account })
      .then((nfts: string[][]) => setNFTs(nfts))
      .catch(({ message }: { message: string }) => spawnErrorAlert?.(message));
  };

  const updateETHBalance = (): void => {
    if (account !== '') {
      web3?.eth
        .getBalance(account)
        .then((result) => {
          const eth = web3?.utils.fromWei(result, 'ether');

          setETHBalance(eth);
        })
        .catch((error) => spawnErrorAlert?.(error));
    }
  };

  const updateDAOTBalance = (): void => {
    if (account !== '') {
      tokenContract?.methods.balanceOf(account).call((error: any, result: string) => {
        if (error !== null) {
          spawnErrorAlert?.(error);
        }

        const eth = web3?.utils.fromWei(result, 'ether');

        if (eth !== undefined) {
          setDAOTBalance?.(eth);
        }
      });
    }
  };

  useEffect(() => {
    updateETHBalance();
    updateDAOTBalance();
    updateNFTs();
  }, [nfts, ethBalance, daotBalance]);

  return { ethBalance, updateETHBalance, daotBalance, updateDAOTBalance, nfts, updateNFTs };
};

export default useTokensProvider;

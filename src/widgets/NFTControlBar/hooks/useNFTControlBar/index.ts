import { useContext, useEffect, useState } from 'react';

import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';
import AlertContext from 'shared/context/Alert/AlertContext';

interface NFTControlBar {
  totalNFTPower: number;
}

const useNFTControlBar = (): NFTControlBar => {
  const { contracts, account } = useContext(BlockchainContext);
  const { spawnErrorAlert } = useContext(AlertContext);
  const nft = contracts?.nft;
  const [totalNFTPower, setTotalNFTPower] = useState(0);

  useEffect(() => {
    nft?.methods
      .getNFTs()
      .call({ from: account })
      .then((result: string[][]) => {
        setTotalNFTPower(
          result
            .map((nft) => [+nft[1]])
            .flat()
            .reduce((prev, curr) => prev + curr, 0)
        );
      })
      .catch(({ message }: { message: string }) => spawnErrorAlert?.(message));
  }, []);

  return { totalNFTPower };
};

export default useNFTControlBar;

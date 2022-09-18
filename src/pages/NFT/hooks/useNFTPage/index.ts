import { useContext } from 'react';

import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';
import TokensContext from 'shared/context/Tokens/TokensContext';

interface NFTPage {
  connected: boolean;
  nfts: string[][];
}

const useNFTPage = (): NFTPage => {
  const { connected = false } = useContext(BlockchainContext);
  const { nfts } = useContext(TokensContext);

  return { connected, nfts };
};

export default useNFTPage;

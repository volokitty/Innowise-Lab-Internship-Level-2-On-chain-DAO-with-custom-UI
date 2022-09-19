import { useContext, useEffect } from 'react';
import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';
import VotingContext from 'shared/context/Voting/VotingContext';

interface DAOPage {
  connected: boolean;
  votingEnded: boolean;
}

const useDAOPage = (): DAOPage => {
  const { connected = false } = useContext(BlockchainContext);
  const { updateVotingEnded, votingEnded } = useContext(VotingContext);

  useEffect(() => {
    if (connected) {
      updateVotingEnded();
    }
  }, [connected]);

  return { connected, votingEnded };
};

export default useDAOPage;

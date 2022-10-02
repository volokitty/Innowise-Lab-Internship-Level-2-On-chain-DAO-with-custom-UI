import { useContext, useEffect } from 'react';
import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';
import VotingContext from 'shared/context/Voting/VotingContext';

interface Voting {
  author: string;
  description: string;
  endTime: string;
  hash: string;
  negative: string;
  positive: string;
  startTime: string;
  votingType: string;
}

interface DAOPage {
  account: string;
  connected: boolean;
  votingEnded: boolean;
  lastVotingConfirmed: boolean;
  lastVoting: Voting | undefined;
}

const useDAOPage = (): DAOPage => {
  const { account = '', connected = false } = useContext(BlockchainContext);
  const {
    updateVotingEnded,
    votingEnded,
    updateLastVotingConfirmed,
    updateLastVoting,
    lastVotingConfirmed,
    lastVoting,
  } = useContext(VotingContext);

  useEffect(() => {
    if (connected) {
      updateVotingEnded();
      updateLastVoting();
      updateLastVotingConfirmed();
    }
  }, [connected]);

  return {
    account,
    connected,
    votingEnded,
    lastVotingConfirmed,
    lastVoting,
  };
};

export default useDAOPage;

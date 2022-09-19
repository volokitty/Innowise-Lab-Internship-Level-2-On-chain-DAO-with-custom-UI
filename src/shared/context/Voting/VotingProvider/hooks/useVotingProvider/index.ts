import { useContext, useState } from 'react';
import AlertContext from 'shared/context/Alert/AlertContext';
import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';

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

interface VotingProvider {
  votingEnded: boolean;
  lastVoting: Voting | undefined;
  lastVotingParameters: string[];
  updateVotingEnded: () => void;
  updateLastVoting: () => void;
  updateLastVotingParameters: () => void;
}

const useVotingProvider = (): VotingProvider => {
  const { spawnErrorAlert } = useContext(AlertContext);
  const { contracts } = useContext(BlockchainContext);
  const daoContract = contracts?.dao;

  const [lastVoting, setLastVoting] = useState<Voting>();
  const [votingEnded, setVotingEnded] = useState(true);
  const [lastVotingParameters, setLastVotingParameters] = useState(['']);

  const getLastVoting = (callback: (voting: Voting) => void): void => {
    daoContract?.methods
      .getVotingsLength()
      .call()
      .then((length: string) => {
        if (+length > 0) {
          daoContract.methods
            .votings(+length - 1)
            .call()
            .then(callback)
            .catch(({ message }: { message: string }) => spawnErrorAlert?.(message));
        }
      })
      .catch(({ message }: { message: string }) => spawnErrorAlert?.(message));
  };

  const updateLastVoting = (): void => {
    getLastVoting((voting: Voting) => setLastVoting(voting));
  };

  const updateLastVotingParameters = (): void => {
    daoContract?.methods
      .getLastVotingUniqueParameters()
      .call()
      .then((parameters: string[]) => setLastVotingParameters(parameters))
      .catch(({ message }: { message: string }) => spawnErrorAlert?.(message));
  };

  const updateVotingEnded = (): void => {
    getLastVoting((voting: Voting) => setVotingEnded(Date.now() / 1000 > +voting.endTime));
  };

  return {
    votingEnded,
    lastVoting,
    lastVotingParameters,
    updateLastVoting,
    updateVotingEnded,
    updateLastVotingParameters,
  };
};

export default useVotingProvider;

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
  confirmed: string | boolean;
}

interface VotingProvider {
  votingEnded: boolean;
  lastVoting: Voting | undefined;
  lastVotingParameters: string[];
  lastVotingConfirmed: boolean;
  updateLastVotingConfirmed: () => void;
  updateVotingEnded: () => void;
  updateLastVoting: () => void;
  updateLastVotingParameters: () => void;
  confirmVoting: () => void;
}

const useVotingProvider = (): VotingProvider => {
  const { spawnSuccessAlert, spawnErrorAlert } = useContext(AlertContext);
  const { contracts, account = '' } = useContext(BlockchainContext);
  const daoContract = contracts?.dao;

  const [lastVoting, setLastVoting] = useState<Voting>();
  const [votingEnded, setVotingEnded] = useState(true);
  const [lastVotingConfirmed, setLastVotingConfirmed] = useState(true);
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

  const updateLastVotingConfirmed = (): void => {
    getLastVoting((voting: Voting) => {
      const confirmed = voting.confirmed;

      if (confirmed === 'true' || confirmed === true) {
        setLastVotingConfirmed(true);
      } else {
        setLastVotingConfirmed(false);
      }
    });
  };

  const confirmVoting = (): void => {
    daoContract?.methods
      .confirmVoting()
      .send({ from: account })
      .then(() => spawnSuccessAlert?.('Confirmed voting'))
      .then(() => updateLastVotingConfirmed())
      .catch(({ message }: { message: string }) => spawnErrorAlert?.(message));
  };

  return {
    votingEnded,
    lastVoting,
    lastVotingParameters,
    lastVotingConfirmed,
    updateLastVoting,
    updateVotingEnded,
    updateLastVotingParameters,
    updateLastVotingConfirmed,
    confirmVoting,
  };
};

export default useVotingProvider;

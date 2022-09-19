import React, { useContext, useEffect, useState } from 'react';

import AlertContext from 'shared/context/Alert/AlertContext';
import BlockchainContext from 'shared/context/Blockchain/BlockchainContext';
import TokensContext from 'shared/context/Tokens/TokensContext';
import VotingContext from 'shared/context/Voting/VotingContext';

import contractsAddresses from 'shared/config/contracts';

interface Vote {
  description: string;
  lastVotingParameters: string[];
  votingType: string | undefined;
  voted: boolean;
  time: number;
  canVote: boolean;
  votePositive: () => void;
  voteNegative: () => void;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useVote = (): Vote => {
  const {
    updateVotingEnded,
    updateLastVoting,
    updateLastVotingParameters,
    lastVoting,
    lastVotingParameters,
  } = useContext(VotingContext);

  const { spawnSuccessAlert, spawnErrorAlert } = useContext(AlertContext);
  const { web3, contracts, account = '' } = useContext(BlockchainContext);
  const { daotBalance } = useContext(TokensContext);
  const daoContract = contracts?.dao;
  const tokenContract = contracts?.token;

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(1);
  const [votingType, setVotingType] = useState('');
  const [voted, setVoted] = useState(false);
  const [time, setTime] = useState(0);

  const vote = (isPositive: boolean): void => {
    tokenContract?.methods
      .approve(contractsAddresses.dao, web3?.utils.toWei(daotBalance, 'ether'))
      .send({ from: account })
      .then(() => {
        daoContract?.methods
          .vote(amount, isPositive)
          .send({ from: account })
          .then(() => spawnSuccessAlert?.('Voted'))
          .then(() => setVoted(true))
          .catch(({ message }: { message: string }) => spawnErrorAlert?.(message));
      })
      .catch(({ message }: { message: string }) => spawnErrorAlert?.(message));
  };

  const updateVoted = (): void => {
    daoContract?.methods
      .votingHashToVoters(lastVoting?.hash, account)
      .call()
      .then(({ amount }: { amount: string }) => setVoted(+amount > 0))
      .catch(({ message }: { message: string }) => spawnErrorAlert?.(message));
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setAmount(+e.target.value);

  const votePositive = (): void => vote(true);
  const voteNegative = (): void => vote(false);

  useEffect(() => {
    updateLastVoting();
    updateVotingEnded();
    updateLastVotingParameters();
  }, []);

  useEffect(() => {
    if (lastVoting !== undefined) {
      const { description, endTime } = lastVoting;
      setDescription(description);
      setVotingType(lastVoting.votingType === '0' ? 'DAOT' : 'NFT');
      updateVoted();

      setTime(+lastVoting.endTime - Math.floor(Date.now() / 1000));
      setInterval(() => setTime((prev) => prev - 1), 1000);

      setTimeout(() => updateVotingEnded(), +endTime * 1000 - Date.now());
    }
  }, [lastVoting]);

  return {
    description,
    lastVotingParameters,
    votePositive,
    voted,
    voteNegative,
    votingType,
    time,
    onAmountChange,
    canVote: +daotBalance > 0,
  };
};

export default useVote;

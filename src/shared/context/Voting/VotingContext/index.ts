import React from 'react';

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

export interface IVotingContext {
  votingEnded: boolean;
  lastVoting: Voting | undefined;
  lastVotingParameters: string[];
  updateVotingEnded: () => void;
  updateLastVoting: () => void;
  updateLastVotingParameters: () => void;
}

const VotingContext = React.createContext<IVotingContext>({
  votingEnded: true,
  lastVoting: undefined,
  lastVotingParameters: [''],
  updateVotingEnded: () => undefined,
  updateLastVoting: () => undefined,
  updateLastVotingParameters: () => undefined,
});

export default VotingContext;

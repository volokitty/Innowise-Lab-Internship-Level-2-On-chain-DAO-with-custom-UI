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
  lastVotingConfirmed: boolean;
  updateLastVotingConfirmed: () => void;
  updateVotingEnded: () => void;
  updateLastVoting: () => void;
  updateLastVotingParameters: () => void;
  confirmVoting: () => void;
}

const VotingContext = React.createContext<IVotingContext>({
  votingEnded: true,
  lastVoting: undefined,
  lastVotingParameters: [''],
  lastVotingConfirmed: false,
  updateLastVotingConfirmed: () => undefined,
  updateVotingEnded: () => undefined,
  updateLastVoting: () => undefined,
  updateLastVotingParameters: () => undefined,
  confirmVoting: () => undefined,
});

export default VotingContext;

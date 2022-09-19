import React from 'react';

import VotingContext from '../VotingContext';
import useVotingProvider from './hooks/useVotingProvider';

interface VotingProviderProps {
  children?: JSX.Element;
}

const VotingProvider: React.FC<VotingProviderProps> = ({ children }) => {
  const value = useVotingProvider();

  return <VotingContext.Provider value={value}>{children}</VotingContext.Provider>;
};

export default VotingProvider;

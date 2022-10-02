import { useContext } from 'react';

import VotingContext from 'shared/context/Voting/VotingContext';

interface ConfirmVoting {
  confirmVoting: () => void;
}

const useConfirmVoting = (): ConfirmVoting => {
  const { confirmVoting } = useContext(VotingContext);

  return { confirmVoting };
};

export default useConfirmVoting;

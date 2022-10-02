import React from 'react';

import CreateVoting from 'features/CreateVoting';
import Vote from 'features/Vote';
import ConfirmVoting from 'features/ConfirmVoting';

import style from './DAO.module.css';
import useDAOPage from './hooks/useDAOPage';

const DAO: React.FC = () => {
  const { dao } = style;
  const { account, connected, votingEnded, lastVotingConfirmed, lastVoting } = useDAOPage();

  if (!connected) {
    return (
      <div className={dao}>
        <h1>Connect wallet first</h1>
      </div>
    );
  }

  if (votingEnded && !lastVotingConfirmed) {
    return (
      <div className={dao}>
        {account === lastVoting?.author ? (
          <ConfirmVoting />
        ) : (
          <h1>Wait for the author to confirm the voting</h1>
        )}
      </div>
    );
  }

  return <div className={dao}>{votingEnded ? <CreateVoting /> : <Vote />}</div>;
};

export default DAO;

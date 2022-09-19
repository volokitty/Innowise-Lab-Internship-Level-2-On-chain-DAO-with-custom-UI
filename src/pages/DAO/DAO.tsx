import React from 'react';

import CreateVoting from 'features/CreateVoting';
import Vote from 'features/Vote';

import style from './DAO.module.css';
import useDAOPage from './hooks/useDAOPage';

const DAO: React.FC = () => {
  const { dao } = style;
  const { connected, votingEnded } = useDAOPage();

  if (!connected) {
    return (
      <div className={dao}>
        <h1>Connect wallet first</h1>
      </div>
    );
  }

  return <div className={dao}>{votingEnded ? <CreateVoting /> : <Vote />}</div>;
};

export default DAO;

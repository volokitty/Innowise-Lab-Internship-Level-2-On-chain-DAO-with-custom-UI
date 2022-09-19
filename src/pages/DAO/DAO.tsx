import React from 'react';

import CreateVoting from 'features/CreateVoting';

import style from './DAO.module.css';

const DAO: React.FC = () => {
  const { dao } = style;

  return (
    <div className={dao}>
      <CreateVoting />
    </div>
  );
};

export default DAO;

import React from 'react';

import Navbar from './Navbar';
import ConnectWallet from 'features/ConnectWallet';

import style from './Header.module.css';

const Header: React.FC = () => {
  const { header, logo } = style;

  return (
    <header className={header}>
      <div className={logo} />
      <div>
        <Navbar />
        <ConnectWallet />
      </div>
    </header>
  );
};

export default Header;

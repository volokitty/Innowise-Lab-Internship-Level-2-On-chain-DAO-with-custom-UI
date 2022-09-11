import React from 'react';

import Navbar from './Navbar';
import Button from 'shared/ui/Button';

import style from './Header.module.css';

const Header: React.FC = () => {
  const { header, logo } = style;

  return (
    <header className={header}>
      <div className={logo} />
      <div>
        <Navbar />
        <Button buttonTheme="dark">Connect wallet</Button>
      </div>
    </header>
  );
};

export default Header;

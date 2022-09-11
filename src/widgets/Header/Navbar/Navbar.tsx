import React from 'react';
import { Link } from 'react-router-dom';

import routes from 'shared/config/routes';

import style from './Navbar.module.css';

const Navbar: React.FC = () => {
  const { navbar } = style;

  return (
    <nav className={navbar}>
      {routes.map(({ to, name }) => (
        <Link to={to} key={to}>
          {name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;

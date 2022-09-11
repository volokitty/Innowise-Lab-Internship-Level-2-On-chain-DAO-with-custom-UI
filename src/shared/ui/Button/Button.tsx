import React from 'react';

import style from './Button.module.css';

interface ButtonProps {
  children: JSX.Element | string;
  buttonTheme: 'dark' | 'light';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, buttonTheme, onClick }) => {
  const { button, dark, light } = style;
  const theme = buttonTheme === 'dark' ? dark : light;

  return (
    <button className={`${button} ${theme}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

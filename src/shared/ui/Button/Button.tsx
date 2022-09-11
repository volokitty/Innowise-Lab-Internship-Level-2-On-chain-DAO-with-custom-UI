import React from 'react';

import style from './Button.module.css';

interface ButtonProps {
  children: JSX.Element | string;
  buttonTheme: 'dark' | 'light';
}

const Button: React.FC<ButtonProps> = ({ children, buttonTheme }) => {
  const { button, dark, light } = style;
  const theme = buttonTheme === 'dark' ? dark : light;

  return <button className={`${button} ${theme}`}>{children}</button>;
};

export default Button;

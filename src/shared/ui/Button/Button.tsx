import React from 'react';

import style from './Button.module.css';

interface ButtonProps {
  children: JSX.Element | string;
  theme: 'dark' | 'light';
  size: 'normal' | 'small';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, theme, size, onClick }) => {
  const { button, dark, light, normal, small } = style;
  const buttonTheme = theme === 'dark' ? dark : light;
  const buttonSize = size === 'normal' ? normal : small;

  return (
    <button className={`${button} ${buttonTheme} ${buttonSize}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

import React, { ButtonHTMLAttributes } from 'react';

import style from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: 'dark' | 'light';
  size: 'normal' | 'small';
}

const Button: React.FC<ButtonProps> = ({ theme, size, ...rest }) => {
  const { button, dark, light, normal, small } = style;
  const buttonTheme = theme === 'dark' ? dark : light;
  const buttonSize = size === 'normal' ? normal : small;

  return <button className={`${button} ${buttonTheme} ${buttonSize}`} {...rest}></button>;
};

export default Button;

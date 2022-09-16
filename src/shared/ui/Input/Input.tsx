import React, { InputHTMLAttributes } from 'react';

import style from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  elementSize: 'normal' | 'small';
}

const Input: React.FC<InputProps> = ({ elementSize, ...rest }) => {
  const { input, normal, small } = style;
  const inputSize = elementSize === 'normal' ? normal : small;

  return <input className={`${input} ${inputSize}`} {...rest} />;
};

export default Input;

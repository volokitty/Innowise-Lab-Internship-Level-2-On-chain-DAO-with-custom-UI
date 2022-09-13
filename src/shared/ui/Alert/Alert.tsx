import React from 'react';

import style from './Alert.module.css';

export interface AlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
}

const { success, warning, error } = style;

const typeClassName: Record<string, string> = {
  success,
  warning,
  error,
};

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const { alert } = style;

  return <div className={`${alert} ${typeClassName[type]}`}>{message}</div>;
};

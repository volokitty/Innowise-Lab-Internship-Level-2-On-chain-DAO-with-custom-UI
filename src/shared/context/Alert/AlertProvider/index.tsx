import React from 'react';
import AlertContext from '../AlertContext';
import Alerts from './Alerts';
import useAlertProvider from './hooks/useAlertProvider';

interface AlertProviderProps {
  alertDelay: number;
  children?: JSX.Element;
}

const AlertProvider: React.FC<AlertProviderProps> = ({ alertDelay, children }) => {
  const value = useAlertProvider(alertDelay);

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};

export { Alerts };

export default AlertProvider;

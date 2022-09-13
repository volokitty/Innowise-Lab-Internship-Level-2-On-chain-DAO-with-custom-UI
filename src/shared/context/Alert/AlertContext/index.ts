import React from 'react';
import { AlertProps } from 'shared/ui/Alert';

type spawnAlertType = (message: string) => void;

interface IAlertContext {
  alerts: AlertProps[];
  spawnSuccessAlert: spawnAlertType;
  spawnErrorAlert: spawnAlertType;
  spawnWarningAlert: spawnAlertType;
}

export type AlertContextType = Partial<IAlertContext>;

const AlertContext = React.createContext<AlertContextType>({});

export default AlertContext;

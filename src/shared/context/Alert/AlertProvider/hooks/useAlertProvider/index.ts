import { useEffect, useState } from 'react';
import { AlertContextType } from 'shared/context/Alert/AlertContext';
import { AlertProps } from 'shared/ui/Alert';

const useAlertProvider = (alertDelay: number): AlertContextType => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const spawnAlert = (alert: AlertProps): void => setAlerts([alert]);

  useEffect(() => {
    if (alerts.length > 0) {
      if (timer !== undefined) {
        clearTimeout(timer);
      }

      setTimer(setTimeout(() => setAlerts([]), alertDelay));
    }

    return () => clearTimeout(timer);
  }, [alerts]);

  const spawnSuccessAlert = (message: string): void => spawnAlert({ message, type: 'success' });
  const spawnErrorAlert = (message: string): void => spawnAlert({ message, type: 'error' });
  const spawnWarningAlert = (message: string): void => spawnAlert({ message, type: 'warning' });

  return { alerts, spawnSuccessAlert, spawnErrorAlert, spawnWarningAlert };
};

export default useAlertProvider;

import React, { useContext } from 'react';
import { Alert } from 'shared/ui/Alert';
import AlertContext from '../../AlertContext';

import style from './Alerts.module.css';

const Alerts: React.FC = () => {
  const { alerts } = useContext(AlertContext);

  return (
    <div className={style.alerts}>
      <div>
        {alerts?.map(({ message, type }) => (
          <Alert key={message} message={message} type={type} />
        ))}
      </div>
    </div>
  );
};

export default Alerts;

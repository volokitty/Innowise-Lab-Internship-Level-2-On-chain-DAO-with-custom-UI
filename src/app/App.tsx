import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AlertProvider, { Alerts } from 'shared/context/Alert/AlertProvider';
import BlockchainProvider from 'shared/context/Blockchain/BlockchainProvider';

import Header from 'widgets/Header';
import Router from 'app/Router';
// import StatusBar from 'widgets/StatusBar';

const App = (): JSX.Element => {
  return (
    <AlertProvider alertDelay={2000}>
      <BlockchainProvider>
        <BrowserRouter>
          <div className="App">
            <Header />
            {/* <StatusBar /> */}
            <Alerts />
            <main>
              <Router />
            </main>
          </div>
        </BrowserRouter>
      </BlockchainProvider>
    </AlertProvider>
  );
};

export default App;

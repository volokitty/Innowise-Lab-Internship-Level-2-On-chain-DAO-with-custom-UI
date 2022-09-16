import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AlertProvider, { Alerts } from 'shared/context/Alert/AlertProvider';
import BlockchainProvider from 'shared/context/Blockchain/BlockchainProvider';

import Header from 'widgets/Header';
import Page from 'app/Page';
import StatusBar from 'widgets/StatusBar';

const App = (): JSX.Element => {
  return (
    <AlertProvider alertDelay={2000}>
      <BlockchainProvider>
        <BrowserRouter>
          <div className="App">
            <Header />
            <StatusBar />
            <Alerts />
            <main>
              <Page />
            </main>
          </div>
        </BrowserRouter>
      </BlockchainProvider>
    </AlertProvider>
  );
};

export default App;

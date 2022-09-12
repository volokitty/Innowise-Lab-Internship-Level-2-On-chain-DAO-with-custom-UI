import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import BlockchainProvider from 'shared/context/Blockchain/BlockchainProvider';

import Header from 'widgets/Header';
import Router from 'app/Router';
import StatusBar from 'widgets/StatusBar';

const App = (): JSX.Element => {
  return (
    <BlockchainProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <StatusBar />
          <main>
            <Router />
          </main>
        </div>
      </BrowserRouter>
    </BlockchainProvider>
  );
};

export default App;

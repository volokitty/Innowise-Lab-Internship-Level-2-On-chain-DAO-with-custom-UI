import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from 'widgets/Header';
import Router from 'app/Router';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Router />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;

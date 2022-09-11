import React from 'react';
import { Routes, Route } from 'react-router-dom';

const A: React.FC = () => {
  return <div />;
};

const Router: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<A />} />
      </Routes>
    </>
  );
};

export default Router;

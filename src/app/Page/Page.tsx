import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AboutUs from 'pages/AboutUs';
import NFT from 'pages/NFT';
import DAO from 'pages/DAO';

const Page: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AboutUs />} />
        <Route path="/nft" element={<NFT />} />
        <Route path="/dao" element={<DAO />} />
      </Routes>
    </>
  );
};

export default Page;

import React from 'react';

import style from './AboutUs.module.css';

const AboutUs: React.FC = () => {
  const { aboutUs } = style;

  return (
    <div className={aboutUs}>
      <h1>Yet another useless DAO voting</h1>
      <h2>Vlad Volokitin, Innowise intership 2022</h2>
      <a
        href="https://github.com/volokitty/Innowise-Lab-Internship-Level-2-On-chain-DAO-with-custom-UI"
        target="_blank"
        rel="noreferrer"
      >
        Repository
      </a>
    </div>
  );
};

export default AboutUs;

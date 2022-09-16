import React from 'react';

import style from './LabelCaption.module.css';

interface LabelCaptionProps {
  label: string;
  caption: string;
  size: 'normal' | 'small';
}

const LabelCaption: React.FC<LabelCaptionProps> = ({ label, caption, size }) => {
  const { normal, small } = style;
  const labelSize = size === 'normal' ? normal : small;

  return <span className={labelSize}>{`${label}: ${caption}`}</span>;
};

export default LabelCaption;

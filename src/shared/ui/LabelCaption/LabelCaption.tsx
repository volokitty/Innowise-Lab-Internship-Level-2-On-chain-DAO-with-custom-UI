import React from 'react';

import style from './LabelCaption.module.css';

interface LabelCaptionProps {
  label: string;
  caption: string;
  theme: 'dark' | 'light';
  size: 'normal' | 'small';
}

const LabelCaption: React.FC<LabelCaptionProps> = ({ label, caption, theme, size }) => {
  const { normal, small, dark, light } = style;
  const labelSize = size === 'normal' ? normal : small;
  const labelTheme = theme === 'dark' ? dark : light;

  return <span className={`${labelSize} ${labelTheme}`}>{`${label}: ${caption}`}</span>;
};

export default LabelCaption;

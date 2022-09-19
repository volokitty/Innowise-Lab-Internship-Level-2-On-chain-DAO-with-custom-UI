import React, { useEffect, useState, InputHTMLAttributes } from 'react';

import style from './SegmentedDigitInput.module.css';

interface SegmentedDigitInputProps extends InputHTMLAttributes<HTMLInputElement> {
  length: number;
  register: any;
}

const SegmentedDigitInput: React.FC<SegmentedDigitInputProps> = ({ length, register }) => {
  const { segmentedInput, segment } = style;
  const [value, setValue] = useState('');
  const [digits, setDigits] = useState(new Array(length).fill(0));
  const [inputRef, setInputRef] = useState<React.RefObject<HTMLInputElement>>();

  useEffect(() => {
    setInputRef(register?.ref);
  }, [register]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    if (!Number.isNaN(+value) && value.length <= length) {
      setValue(value);
    }
  };

  useEffect(() => {
    const digits = value.split('').map((digit) => +digit);

    setDigits([...digits, ...new Array(length - digits.length).fill(0)]);
  }, [value]);

  const onClick = (): void => {
    inputRef?.current?.focus();
  };

  return (
    <div className={segmentedInput}>
      {digits.map((digit, index) => (
        <div key={index} className={segment} onClick={onClick}>
          {digit}
        </div>
      ))}
      <input
        value={value}
        ref={inputRef}
        name={register?.name}
        onChange={(e: any) => {
          onChange(e);
          register?.onChange(e);
        }}
        onBlur={register?.onBlur}
      />
    </div>
  );
};

export default SegmentedDigitInput;

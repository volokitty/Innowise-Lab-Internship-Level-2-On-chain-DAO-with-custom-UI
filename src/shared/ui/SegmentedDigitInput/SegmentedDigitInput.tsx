import React, { useEffect, useState, useRef } from 'react';

import style from './SegmentedDigitInput.module.css';

interface SegmentedDigitInputProps {
  length: number;
  onDigitsChange: (digits: number[]) => void;
}

const SegmentedDigitInput: React.FC<SegmentedDigitInputProps> = ({ length, onDigitsChange }) => {
  const { segmentedInput, segment, focusedSegment } = style;
  const [value, setValue] = useState('');
  const [digits, setDigits] = useState(new Array(length).fill(0));
  const [focused, setFocused] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    if (!Number.isNaN(+value) && value.length <= length) {
      setValue(value);
    }
  };

  useEffect(() => {
    const digits = value.split('').map((digit) => +digit);

    setDigits([...digits, ...new Array(length - digits.length).fill(0)]);

    if (digits.length === 0) {
      setFocusIndex(0);
    }

    if (digits.length > 0 && digits.length < length) {
      setFocusIndex(digits.length);
    }

    if (focusIndex === length - 1 && digits.length === length - 1) {
      setFocusIndex(focusIndex - 1);
    }
  }, [value]);

  useEffect(() => {
    onDigitsChange(digits);
  }, [digits]);

  const onClick = (): void => {
    if (inputRef.current !== null) {
      const length = value.length;

      inputRef.current.setSelectionRange(length, length);
      inputRef.current.focus();
      setFocused(true);
    }
  };

  return (
    <div className={segmentedInput}>
      {digits.map((digit, index) => (
        <div
          key={index}
          className={`${segment} ${index === focusIndex && focused ? focusedSegment : ''}`}
          onClick={onClick}
        >
          {digit}
        </div>
      ))}
      <input value={value} ref={inputRef} onChange={onChange} onBlur={() => setFocused(false)} />
    </div>
  );
};

export default SegmentedDigitInput;

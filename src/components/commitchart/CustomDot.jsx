import React, { useState } from 'react';

const CustomDot = (props) => {
  const { cx, cy, stroke, payload, onMouseEnter, onMouseLeave } = props;
  const [isHovered, setIsHovered] = useState(false);

  const dotSize = 6;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={dotSize}
      fill={isHovered ? stroke : '#fff'}
      strokeWidth={2}
      stroke={stroke}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter && onMouseEnter(payload);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave && onMouseLeave(payload);
      }}
    />
  );
};

export default CustomDot;

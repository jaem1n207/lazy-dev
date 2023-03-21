import React from 'react';

const spacerSizes = {
  xs: 'h-8 tablet:h-6',
  sm: 'h-12 tablet:h-10',
  base: 'h-24 tablet:h-20',
  lg: 'h-36 tablet:h-22',
  xl: 'h-48 tablet:h-40',
  '2xl': 'h-56 tablet:h-64',
};

interface SpacerProps {
  size: keyof typeof spacerSizes;
  className?: string;
}

const Spacer = ({ size, className = '' }: SpacerProps) => {
  return <div className={`${className} ${spacerSizes[size]}`} />;
};

export default Spacer;

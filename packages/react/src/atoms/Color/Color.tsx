import React from 'react';
import { Spacing } from 'design-system-foundation';

interface ColorProps {
  hexCode: string;
  width?: keyof typeof Spacing;
  height?: keyof typeof Spacing;
}

const Color: React.FC<ColorProps> = ({ width = Spacing.sm, height = Spacing.sm}) => {
  const className = `dse-width-${width} dse-height-${height}`
  return <div className={className} style={{ backgroundColor: 'green' }}></div>
}

export default Color;
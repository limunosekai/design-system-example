import React from 'react';
import Select from './Select';

import 'design-system-example/lib/Select.css';

const options = [{
  label: '1',
  value: 'black',
}, {
  label: '2',
  value: 'green',
}, {
  label: '3',
  value: 'red'
}];

export default {
  title: 'Molecules|Select',
}

export const Common = () => <Select options={options} />

export const RenderOption = () => 
  <Select 
    options={options} 
    renderOption={({ getOptionRecommendedProps, option, isSelected }) => 
      <span {...getOptionRecommendedProps()}>
          {option.label} {isSelected && 'selected'}
      </span>} 
  />

export const CustomLabel = () =>
  <Select label="Custom Text" options={options} />
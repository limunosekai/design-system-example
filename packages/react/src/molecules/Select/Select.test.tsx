/**
 * @jest-environment jsdom
 */

import React from 'react';
import Select from '.';

import { render, fireEvent } from '@testing-library/react';

const options = [{
    label: '1',
    value: '1',
}, {
    label: '2',
    value: '2',
}, {
    label: '3',
    value: '3'
}];

test('renders all options passed to it', () => {
    const { getAllByRole, getByTestId } = render(<Select options={options} />);
    
    fireEvent.click(getByTestId('DseSelectButton'));

    expect(getAllByRole('menuitemradio')).toHaveLength(options.length);
});

test('calls the onOptionSelected prop with the selected option and its index if passed', () => {

});

test('the button label changed to the selected option label', () => {

});

test('snapshot of the selected option state', () => {
    
});

test('snapshot of the base state', () => {
    
});

test('snapshot of the options menu open state', () => {
    
});
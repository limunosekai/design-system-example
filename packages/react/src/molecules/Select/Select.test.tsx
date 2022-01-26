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

test('renders options using custom renderOption method if passed as prop', () => {
    const { getAllByTestId, getByTestId} = render(<Select options={options} renderOption={({ option }) => {
        return <li key={option.value} data-testid="CustomRenderOption">{option.label}</li>
    }} />);

    fireEvent.click(getByTestId('DseSelectButton'));

    expect(getAllByTestId('CustomRenderOption')).toHaveLength(options.length);
});

test('calls the onOptionSelected prop with the selected option and its index if passed', () => {
    const onOptionSelected = jest.fn();
    const { getAllByRole, getByTestId } = render(<Select options={options} onOptionSelected={onOptionSelected} />);
    
    fireEvent.click(getByTestId('DseSelectButton'));
    fireEvent.click(getAllByRole('menuitemradio')[0]);

    expect(onOptionSelected).toHaveBeenCalledWith(options[0], 0);
});

test('the button label changed to the selected option label', () => {
    const { getAllByRole, getByTestId } = render(<Select options={options} />);
    
    fireEvent.click(getByTestId('DseSelectButton'));
    fireEvent.click(getAllByRole('menuitemradio')[0]);

    expect(getByTestId('DseSelectButton')).toHaveTextContent(options[0].label);
});

test('snapshot of the selected option state', () => {
    const { getAllByRole, getByTestId, asFragment } = render(<Select options={options} />);
    
    fireEvent.click(getByTestId('DseSelectButton'));
    fireEvent.click(getAllByRole('menuitemradio')[0]);

    expect(asFragment()).toMatchSnapshot();
});

test('snapshot of the base state', () => {
    const { asFragment } = render(<Select options={options} />);
    
    expect(asFragment()).toMatchSnapshot();
});

test('snapshot of the options menu open state', () => {
    const { getByTestId, asFragment } = render(<Select options={options} />);
    
    fireEvent.click(getByTestId('DseSelectButton'));

    expect(asFragment()).toMatchSnapshot();
});

test('can customize select label', () => {
    const { getByText } = render(<Select options={options} label='custom' />);

    expect(getByText(/custom/)).toBeInTheDocument();
});
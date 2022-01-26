import React from 'react';
import ReactDOM from 'react-dom';

import { Select } from '@limunosekai/dse-react';

import '@limunosekai/dse-scss/lib/Utilities.css';
import '@limunosekai/dse-scss/lib/Text.css';
import '@limunosekai/dse-scss/lib/Margin.css';
import '@limunosekai/dse-scss/lib/Select.css';
import '@limunosekai/dse-scss/lib/global.css';

const options = [{
    label: '1',
    value: '1',
}, {
    label: '2',
    value: '2',
}, {
    label: '3',
    value: '3'
}]

ReactDOM.render(
    <div style={{ padding: '40px' }}>
        <Select options={options} />
    </div>,
    document.querySelector('#root')
);

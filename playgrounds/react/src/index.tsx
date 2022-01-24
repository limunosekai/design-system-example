import React from 'react';
import ReactDOM from 'react-dom';

import { Select } from 'design-system-react';

import 'design-system-example/lib/Utilities.css';
import 'design-system-example/lib/Text.css';
import 'design-system-example/lib/Margin.css';
import 'design-system-example/lib/Select.css';
import 'design-system-example/lib/global.css';

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
        <Select options={options}/>
    </div>,
    document.querySelector('#root')
);

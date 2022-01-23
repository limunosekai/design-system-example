import React from 'react';
import ReactDOM from 'react-dom';

import { Text, Margin } from 'design-system-react';

import 'design-system-example/lib/Utilities.css';
import 'design-system-example/lib/Text.css';
import 'design-system-example/lib/Margin.css';
import 'design-system-example/lib/global.css';

ReactDOM.render(
    <div>
        <Margin left space="xl">
            <Text size="xs">something</Text>
        </Margin>
    </div>,
    document.querySelector('#root')
);

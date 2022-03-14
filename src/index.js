// eslint-disable-next-line no-undef
require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import ReactDOM from 'react-dom';

import Config from './config';

// Chakra-UI
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
    <ChakraProvider>
        <Config />
    </ChakraProvider>,
    document.getElementById('app')
);

// module.hot.accept()
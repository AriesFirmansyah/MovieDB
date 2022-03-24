// eslint-disable-next-line no-undef
require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import ReactDOM from 'react-dom';

import Config from './config';

// Chakra-UI
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './Themes';

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Config />
    </ChakraProvider>,
    document.getElementById('app')
);

// module.hot.accept()
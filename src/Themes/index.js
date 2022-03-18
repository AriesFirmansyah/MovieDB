import { extendTheme } from '@chakra-ui/react';
import defaultTheme from '@chakra-ui/theme';

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
    ...defaultTheme,
    modes: {
        dark: {
            background: '#000',
        },
        light: {
            background: '#fff',
        }
    },
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;
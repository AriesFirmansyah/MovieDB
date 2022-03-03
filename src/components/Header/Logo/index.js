
import { Link } from 'react-router-dom';
import Logo from './../../../images/logo.png';

import './logo.css';

// Chakra-UI
import {
    GridItem
} from '@chakra-ui/react';

const LogoHeader = () => {
    return (
        <>
            <GridItem colSpan={4} w="100%" height="80px" >
                <Link to="/" className="navigation-logo">
                    <img src={Logo} className="logo" />
                    <h1 className="logo-text">
                        RISDEV
                    </h1>
                </Link>
            </GridItem>
        </>
    );
};

export default LogoHeader;
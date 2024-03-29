import {
    Alert,
    Stack,
    AlertIcon
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    alertText: PropTypes.string,
    status: PropTypes.string
};

const AlertDialog = ({isOpen, setIsOpen, alertText, status}) => {
    const navigate = useNavigate();

    useEffect(() => {   
        if (isOpen) {
            setTimeout(() => {
                setIsOpen(!isOpen);
                if (window.location.pathname === '/') {
                    navigate(window.location.pathname, {});
                }
            }, 4000);
        }
    }, [isOpen]);
    return (
        isOpen === true ? (
            <Stack spacing={3}
                style={{
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    marginTop: '10px',
                    marginRight: '10px',
                    zIndex:2
                }}>
                <Alert status={status} variant='solid' style={{borderRadius: '15px'}}>
                    <AlertIcon />
                    {alertText}
                </Alert>
            </Stack>
        ) : null
    );
};

AlertDialog.propTypes = propTypes;

export default AlertDialog;
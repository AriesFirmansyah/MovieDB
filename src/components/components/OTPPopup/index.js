import { 
    PinInput, 
    PinInputField, 
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from '@chakra-ui/react';

import { useState } from 'react';

import PropTypes from 'prop-types';

const propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    phoneNumber: PropTypes.string,
    setIsValid: PropTypes.func,
    resendOTP: PropTypes.func
};

const OTP = ({
    isOpen,
    setIsOpen,
    phoneNumber,
    setIsValid,
    resendOTP
}) => {

    const [otpInput, setOtpInput] = useState('');
    const [loadingButton, setLoadingButton] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleChange = (value) => {
        setOtpInput(value);
        setIsError(false);
    };

    const submitOTP = (e) => {
        e.preventDefault();

        setLoadingButton(!loadingButton);

        window.confirmationResult.confirm(otpInput).then(() => {
            setIsOpen(!isOpen);
            setIsError(false);
            setIsValid(true);
        }).catch((error) => {
            setIsError(!isError);
            console.log('err', error);
        });
        setTimeout(() => {
            setLoadingButton(false);
        }, 10000);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        isOpen ? (
            <>
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={handleClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader style={{textAlign: 'center'}}>
                            Verify Phone
                        </ModalHeader>
                        <ModalCloseButton onClick={() => setIsOpen(!isOpen)} />
                        <ModalBody pb={6}>
                            <div
                                style={{
                                    textAlign: 'center',
                                    marginBottom: 20
                                }}>
                                <h4>
                                    {"Code is sent to " + phoneNumber} 
                                </h4>
                            </div>
                            <HStack
                                style={{
                                    justifyContent: 'center'
                                }}>

                                <PinInput onChange={handleChange}>
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                </PinInput>
                            </HStack>
                            {isError && (
                                <div
                                    style={{
                                        textAlign: 'center',
                                        marginTop: 20,
                                        fontSize: 13,
                                        color: "#CF3443"
                                    }}>
                                    <h4>
                                        {"Invalid code!"}
                                    </h4>
                                </div>
                            )}
                            <div
                                style={{
                                    textAlign: 'center',
                                    marginTop: 20,
                                    fontSize: 13
                                }}>
                                <h4>
                                    {"Didn't receive code? "}
                                    <span 
                                        style={{
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                        onClick={resendOTP}
                                    >
                                        <b>Resend code.</b>
                                    </span>
                                </h4>
                            </div>
                        </ModalBody>
                        
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3}
                                style={{width: "100%"}}
                                isLoading={loadingButton}
                                loadingText='Verifying'
                                spinnerPlacement='start'
                                onClick={(e) => submitOTP(e)}>
                                Verify and Register
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                
            </>
        ) : null
    );
};

OTP.propTypes = propTypes;

export default OTP;
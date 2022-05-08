/* eslint-disable react/no-children-prop */
import './Register.scss';

import { 
    SimpleGrid, 
    GridItem,
    Button,
    InputGroup,
    Input,
    InputRightElement,
    Container,
    FormControl,
    FormLabel,
    FormErrorMessage,
    InputLeftAddon
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import { Media } from 'react-breakpoints';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../../components/AlertDialog';

import OTP from '../../components/OTPPopup';
import { 
    getAuth, 
    signInWithPhoneNumber,
    RecaptchaVerifier
} from "firebase/auth";
// eslint-disable-next-line no-unused-vars
import { firebase } from '../../../firebase/config';

import { UserRegister } from '../../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';

import RegisterIcon from '../../../images/register/sideimage.png';
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [occupationError, setOccupationError] = useState(false);
    const [regionError, setRegionError] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUser] = useState({
        name: String,
        email: '',
        password: String,
        no_telp: Number,
        image: '',
        pekerjaan: '',
        asal_kota: '',
    });

    const userRedux = useSelector(state => state.user);

    const [submitLoading, setSubmitLoading] = useState(false);
    
    const [isOpen, setIsOpen] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [statusAlert, setStatusAlert] = useState('');
    
    const auth = getAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword(!showPassword);

    const captchaConfiguration = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                handleSubmit();
                console.log('recaptcha successed!');
                console.log('res', response);
            },
            defaultCountry: "ID"
        }, auth);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        
        if (!checkError()) {
            setSubmitLoading(!submitLoading);
            setTimeout(() => {
                setSubmitLoading(false);
                setIsOpen(!isOpen);
                sendOTP();
            }, 2000);
        }
    };

    const sendOTP = () => {
        captchaConfiguration();

        const phoneNumber = '+62' + user.no_telp;
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                setAlertText("OTP Sent!");
                setStatusAlert("success");
                setShowAlert(true);

                window.confirmationResult = confirmationResult;
            }).catch((error) => {
                console.log('err', error);
            });
    };

    const resendOTP = () => {
        const phoneNumber = '+62' + user.no_telp;
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                setAlertText("OTP Sent!");
                setStatusAlert("success");
                setShowAlert(true);

                window.confirmationResult = confirmationResult;
            }).catch((error) => {
                console.log('err', error);
            });
    };

    const checkError = () => {
        if (isSubmit) {
            if (nameError === false && 
                emailError === false && 
                passwordError === false && 
                phoneNumberError === false && 
                imageError === false &&
                occupationError === false &&
                regionError === false) {
                return false;
            } else {
                return true;
            }
        }
        return true;
    };

    const handleChange = (e, type) => {
        switch(type) {
        case 'name' : setUser({...user, name: e.target.value}); break;
        case 'email' : setUser({...user, email: e.target.value}); break;
        case 'password' : setUser({...user, password: e.target.value}); break;
        case 'phone_number' : setUser({...user, no_telp: e.target.value}); break;
        case 'image' : setUser({...user, image: e.target.files[0]}); break;
        case 'occupation' : setUser({...user, pekerjaan: e.target.value}); break;
        case 'region' : setUser({...user, asal_kota: e.target.value}); break;
        }
    };
    
    useEffect(() => {
        if (isSubmit) {
            user.name.length < 5 ? setNameError(true) : setNameError(false);
            user.email === '' ? setEmailError(true) : setEmailError(false);
            user.password.length < 8 ? setPasswordError(true) : setPasswordError(false);
            user.no_telp.length < 11 ? setPhoneNumberError(true) : setPhoneNumberError(false);
            user.pekerjaan === '' ? setOccupationError(true) : setOccupationError(false);
            user.asal_kota === '' ? setRegionError(true) : setRegionError(false);
            user.image === '' ? setImageError(true) : setImageError(false);
        }
    }, [user, isSubmit]);

    useEffect(() => { 
        if (isValid) {
            const userData = new FormData();
    
            userData.append("fullname", user.name);
            userData.append("email", user.email);
            userData.append("password", user.password);
            userData.append("phone_number", user.no_telp);
            userData.append('image', user.image);
            userData.append("occupation", user.pekerjaan);
            userData.append("region", user.asal_kota);

            dispatch(UserRegister(userData));

            setTimeout(() => {
                if (userRedux.error !== '') {
                    setAlertText(userRedux.error);
                    setStatusAlert("error");
                    setShowAlert(true);
                }
                if (userRedux.message !== '') {
                    navigate('/' , {
                        state : {
                            showAlert: true,
                            text: 'Register successed!',
                            status: 'success'
                        }
                    });
                }
                setIsValid(false);
            }, 3000);
        }
    }, [isValid]);

    return (
        <>
            <Container maxW='container.md'>
                <form onSubmit={handleSubmit}>
                    <div id="sign-in-button"></div>
                    <div className='register-container'>
                        <SimpleGrid columns={[6, 6, 10, 10, 10]} 
                            spacing={{base: '10px', sm: '10px', md: '40px', lg: '40px', xl : '40px' }}>
                            <GridItem colSpan={6} >
                                <h1 className='header-text'>Create Account</h1>
                                <h1 className='register-login-mobile'>
                                    Already have an account? 
                                    {" Let's "} 
                                    <span onClick={() => window.location.href = '/login'}>
                                        Sign in! 
                                    </span>
                                </h1>
                                <SimpleGrid columns={[10, 10, 10, 10, 10]} 
                                    spacing={4}>
                                    <GridItem colSpan={{base : 10, sm: 10, md: 5, lg: 5, xl : 5 }}>
                                        <FormControl isInvalid={nameError}>
                                            <FormLabel htmlFor='first-name'>First Name</FormLabel>
                                            <Input 
                                                type='text' 
                                                name='first_name'
                                                className='register-input' 
                                                onChange={(e) => handleChange(e, 'name')} 
                                            />
                                            {nameError && 
                                                <FormErrorMessage>Character must be more than 4.</FormErrorMessage>
                                            }
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={{base : 10, sm: 10, md: 5, lg: 5, xl : 5 }}>
                                        <FormControl>
                                            <FormLabel htmlFor='last-name'>Last Name</FormLabel>
                                            <Input 
                                                type='text' 
                                                className='register-input' 
                                                name='last_name' 
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={{base : 10, sm: 10, md: 5, lg: 5, xl : 5 }}>
                                        <FormControl isInvalid={occupationError}>
                                            <FormLabel htmlFor='occupation'>Occupation</FormLabel>
                                            <Input 
                                                type='text' 
                                                className='register-input' 
                                                name='occupation'
                                                onChange={(e) => handleChange(e, 'occupation')}
                                            />
                                            {occupationError && 
                                                <FormErrorMessage>Please fill occupation form!</FormErrorMessage>
                                            }
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={{base : 10, sm: 10, md: 5, lg: 5, xl : 5 }}>
                                        <FormControl isInvalid={regionError}>
                                            <FormLabel htmlFor='region'>Region</FormLabel>
                                            <Input 
                                                type='text' 
                                                className='register-input' 
                                                name='region' 
                                                onChange={(e) => handleChange(e, 'region')}
                                            />
                                            {regionError && 
                                                <FormErrorMessage>Please fill region form!</FormErrorMessage>
                                            }
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={10}>
                                        <FormControl isInvalid={phoneNumberError}>
                                            <FormLabel htmlFor='phone-number'>Phone Number</FormLabel>
                                            <InputGroup>
                                                <InputLeftAddon children='+62' />
                                                <Input 
                                                    type='number' 
                                                    className='register-input' 
                                                    name='phone_number'
                                                    onChange={(e) => handleChange(e, 'phone_number')}
                                                />
                                            </InputGroup>
                                            
                                            {phoneNumberError && 
                                                <FormErrorMessage>Phone number must be more than 10 digits.!</FormErrorMessage>
                                            }
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={10}>
                                        <FormControl isInvalid={imageError}>
                                            <FormLabel htmlFor='phone-number'>Image</FormLabel>
                                            <Input 
                                                type='file' 
                                                className='register-input' 
                                                name='image'
                                                accept=".png, .jpg"
                                                onChange={(e) => handleChange(e, 'image')}
                                            />
                                            {imageError && 
                                                <FormErrorMessage>Please choose file!</FormErrorMessage>
                                            }
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={10}>
                                        <FormControl isInvalid={emailError}>
                                            <FormLabel htmlFor='email'>Email Address</FormLabel>
                                            <Input 
                                                type='email' 
                                                className='register-input' 
                                                name='email' 
                                                onChange={(e) => handleChange(e, 'email')}
                                            />
                                            {emailError && 
                                                <FormErrorMessage>Please input email address!</FormErrorMessage>
                                            }
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={10}>
                                        <FormControl isInvalid={passwordError}>
                                            <FormLabel htmlFor='password'>Password</FormLabel>
                                            <InputGroup size='md'>
                                                <Input
                                                    pr='4.5rem'
                                                    type={showPassword ? 'text' : 'password'}
                                                    style={{zIndex: 0}}
                                                    className='register-input'
                                                    name='password'
                                                    onChange={(e) => handleChange(e, 'password')}
                                                />
                                                <InputRightElement width='4.5rem' sx={{zIndex: 1, marginRight: -3}}>
                                                    { 
                                                        showPassword ? 
                                                            <div onClick={handleShowPassword}>
                                                                <AiFillEye />
                                                            </div>
                                                            : 
                                                            <div onClick={handleShowPassword}>
                                                                <AiFillEyeInvisible />
                                                            </div>
                                                    }
                                                </InputRightElement>
                                            </InputGroup>
                                            {passwordError && 
                                                <FormErrorMessage>Please fill password!</FormErrorMessage>
                                            }
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={10}>
                                        <Button 
                                            isLoading={submitLoading}
                                            loadingText='Submitting'
                                            spinnerPlacement='start'
                                            colorScheme='blue' 
                                            className='register-submit' 
                                            type='submit'>
                                            Submit
                                        </Button>
                                    </GridItem>
                                </SimpleGrid>
                            </GridItem>
                            <Media>
                                {
                                    ({ breakpoints, currentBreakpoint }) => 
                                        breakpoints[currentBreakpoint] >= breakpoints.md ? (
                                            <GridItem colSpan={4} className="register-right-side">
                                                <h1 className='register-login'>
                                                    Already have an account? <br></br>
                                                    {"Let's "} 
                                                    <span onClick={() => window.location.href = '/login'}>
                                                        Sign in! 
                                                    </span>
                                                </h1>
                                                <h1 className='header-text'>Sign Up to Get Your Movies</h1>
                                                <img src={RegisterIcon} />
                                            </GridItem>
                                        ) : null
                                }
                            </Media>
                        </SimpleGrid>
                    </div>
                </form>
                <OTP 
                    isOpen={isOpen} 
                    setIsOpen={setIsOpen}
                    phoneNumber={`+62${user.no_telp}`}
                    setIsValid={setIsValid}
                    resendOTP={resendOTP} />

                <AlertDialog 
                    isOpen={showAlert} 
                    setIsOpen={setShowAlert} 
                    alertText={alertText}
                    status={statusAlert} />
            </Container>
        </>
    );
};

export default Register;
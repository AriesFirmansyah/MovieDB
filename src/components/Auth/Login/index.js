import React, { useState, useEffect } from 'react';
import './Login.scss';
import { GoogleLogin } from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { 
    SimpleGrid, 
    GridItem,
    Button,
    InputGroup,
    Input,
    InputRightElement,
    Divider,
    Container
} from '@chakra-ui/react';

import {
    FcGoogle
} from 'react-icons/fc';

import {
    BsFacebook
} from 'react-icons/bs';

import { AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';

import People from '../../../images/login/people.png';
import { useColorMode } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { 
    AuthLogin, 
    AuthOthersLogin,
    AuthFacebookLogin
} from '../../../redux/actions/auth';

import AlertDialog from '../../components/AlertDialog';

import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { colorMode } = useColorMode();
    const dispatch = useDispatch();
    const dataUser = useSelector(state => state.auth);

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [status, setStatus] = useState('');
    
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleGoogleLogin = async (res) => {  
        const profile = res?.profileObj;
        const token = res?.tokenId;

        try {
            await dispatch(AuthOthersLogin({data: { profile, token }}));

            if (dataUser.error !== '') {
                setAlertText(dataUser.error);
                setStatus('error');
                setIsOpen(!isOpen);
            } else if (dataUser.message !== '') {
                navigate('/' , {
                    state : {
                        showAlert: true,
                        text: dataUser.message,
                        status: 'success'
                    }
                });
            }
            // setTimeout(() => {
            //     if (dataUser.error !== '') {
            //         setAlertText(dataUser.error);
            //         setStatus('error');
            //         setIsOpen(!isOpen);
            //     }
            //     if (dataUser.message !== '') {
            //         navigate('/' , {
            //             state : {
            //                 showAlert: true,
            //                 text: dataUser.message,
            //                 status: 'success'
            //             }
            //         });
            //     }
            // }, 1500);

        } catch (err) {
            console.log(err);
        }
    };

    const handleGoogleFailure = () => {
        setAlertText("Login error!");
        setStatus('error');
        setIsOpen(!isOpen);
    };

    const handleFacebookLogin = async (response) => {
        try {
            await dispatch(AuthFacebookLogin(response));
            if (dataUser.error !== '') {
                setAlertText(dataUser.error);
                setStatus('error');
                setIsOpen(!isOpen);
            }else if (dataUser.message !== '') {
                navigate('/' , {
                    state : {
                        showAlert: true,
                        text: dataUser.message,
                        status: 'success'
                    }
                });
            }
            // setTimeout(() => {
            //     if (dataUser.error !== '') {
            //         setAlertText(dataUser.error);
            //         setStatus('error');
            //         setIsOpen(!isOpen);
            //     }
                
            //     if (dataUser.message !== '') {
            //         navigate('/' , {
            //             state : {
            //                 showAlert: true,
            //                 text: dataUser.message,
            //                 status: 'success'
            //             }
            //         });
            //     }
            // }, 1000);
        } catch (err) {
            console.log(err);
        }
    };
    
    const handleLogin = async () => {
        try {
            await dispatch(AuthLogin({data: { email, password }}));
            if (dataUser.error !== '') {
                setAlertText(dataUser.error);
                setStatus('error');
                setIsOpen(!isOpen);
            } else if (dataUser.profile !== '') {
                navigate('/' , {
                    state : {
                        showAlert: true,
                        text: dataUser.message,
                        status: 'success'
                    }
                });
            }
            // setTimeout(() => {
            //     if (dataUser.error !== '') {
            //         setAlertText(dataUser.error);
            //         setStatus('error');
            //         setIsOpen(!isOpen);
            //     }
            //     if (dataUser.profile !== '') {
            //         navigate('/' , {
            //             state : {
            //                 showAlert: true,
            //                 text: dataUser.message,
            //                 status: 'success'
            //             }
            //         });
            //     }
            // }, 400);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (user?.isAuth) {
            navigate('/' , {
                state : {
                    showAlert: true,
                    text: "Anda sudah login!",
                    status: 'info'
                }
            });
        }
    }, []);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <>
            <AlertDialog 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                alertText={alertText}
                status={status} />
            <div className='login-container'>
                <Container maxW='container.md'>
                    <SimpleGrid columns={[10, 10, 10, 10, 10]} 
                        spacing={{base: '10px', sm: '10px', md: '10px', lg: '0px', xl : '0px' }}>
                        <GridItem colSpan={{base : 10, sm: 10, md: 6, lg: 6, xl : 6 }} >

                            <h1 className='login-text-header'>Sign In to Get Your Movies</h1>
                            <div className="login-option">
                                <h1>
                                    {"Don't have an account ?"} <br></br>
                                    {"You can "}
                                    <span onClick={() => window.location.href = '/register'}>
                                        {"Register here!"}
                                    </span>
                                </h1>
                                <img src={People} />
                            </div>
                        </GridItem>
                        <GridItem colSpan={{base : 10, sm: 10, md: 4, lg: 4, xl : 4 }} >
                            <Input placeholder='Username' 
                                className={colorMode === 'dark' ? 
                                    'login-input input-dark' :
                                    'login-input input-light'
                                } 
                                type="email"
                                onChange={(e) => setEmail(e.target.value)} />
                            <br></br><br></br>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    style={{zIndex: 0}}
                                    className={colorMode === 'dark' ? 
                                        'login-input input-dark' :
                                        'login-input input-light'
                                    }
                                    onChange={(e) => setPassword(e.target.value)}
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

                            <Button colorScheme='blue' 
                                style={{marginTop: '30px', marginBottom: '30px', width: '100%'}}
                                onClick={handleLogin}>
                                Sign In
                            </Button>

                            <div className="login-option-mobile">
                                <h1>
                                    {"Don't have an account ? "}
                                    {" You can "} 
                                    <span onClick={() => window.location.href = '/register'}>
                                        {"Register here!"}
                                    </span>
                                </h1>
                            </div>

                            <SimpleGrid columns={10}>
                                <GridItem colSpan={{base : 2, sm: 3, md: 2, lg: 3, xl : 3 }}>
                                    <Divider />
                                </GridItem>
                                <GridItem colSpan={{base : 6, sm: 4, md: 6, lg: 4, xl : 4 }}>
                                    <h1 style={{color: 'gray', marginTop: '-12px', textAlign: 'center'}}>
                                        or continue with
                                    </h1>
                                </GridItem>
                                <GridItem colSpan={{base : 2, sm: 3, md: 2, lg: 3, xl : 3 }}>
                                    <Divider />
                                </GridItem>
                            </SimpleGrid>

                            <SimpleGrid columns={[5, 5, 5, 10, 10]}  style={{marginTop: '20px'}}
                                spacing={2}>
                                <GridItem colSpan={5}>
                                    <GoogleLogin
                                        // eslint-disable-next-line no-undef
                                        clientId={process.env.GOOGLE_CLIENT_ID}
                                        render={renderProps => (
                                            <Button disabled={renderProps.disabled}
                                                onClick={renderProps.onClick}
                                                sx={{
                                                    width: '100%',
                                                    backgroundColor: 'aliceblue', 
                                                    color: 'black'
                                                }}>
                                                <FcGoogle /> &nbsp;
                                                Google
                                            </Button>
                                        )}
                                        buttonText="Log in with Google"
                                        onSuccess={handleGoogleLogin}
                                        onFailure={handleGoogleFailure}
                                        cookiePolicy={'single_host_origin'} />
                                </GridItem>
                                <GridItem colSpan={5}>
                                    <FacebookLogin
                                        // eslint-disable-next-line no-undef
                                        appId={process.env.FACEBOOK_APP_ID}
                                        render={renderProps => (
                                            <Button disabled={renderProps.disabled}
                                                onClick={renderProps.onClick}
                                                sx={{
                                                    width: '100%',
                                                    backgroundColor: 'aliceblue', 
                                                    color: 'black',
                                                }}>
                                                <BsFacebook style={{color: 'blue'}}/> &nbsp;
                                                Facebook
                                            </Button>
                                        )}
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        // onClick={componentClicked}
                                        callback={handleFacebookLogin} />
                                </GridItem>
                            </SimpleGrid>
                        </GridItem>
                    </SimpleGrid>
                </Container>
            </div>
        </>
    );
};

export default Login;
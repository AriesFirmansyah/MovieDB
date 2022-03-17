import React, { useState, useEffect } from 'react';
import './Login.scss';
import { GoogleLogin, GoogleLogout, useGoogleLogout } from "react-google-login";
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
    FaFacebook,
    FaTwitter
} from 'react-icons/fa';

import {
    FcGoogle
} from 'react-icons/fc';

import {
    BsFacebook
} from 'react-icons/bs';

import { AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';

import People from './../../images/login/people.png';


const clientID = "15100114289-2rd2h4ses7ahd5cdcr40sbopcs1b4us6.apps.googleusercontent.com";
const facebookID = "5302591449775023";

const Login = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [dataFacebook, setDataFacebook] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    
    
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleGoogleLogin = (response) => {
        console.log('login success', response);
        setIsLogged(true);
    };

    const handleGoogleFailure = (response) => {
        console.log('Login Gagal', response);
    };

    const handleGoogleLogout = (response) => {
        console.log('logout', response);
    };

    const handleFacebookLogin = (response) => {
        
        console.log('facebook login', response);
        setDataFacebook(response);
        // window.location.href = '/';
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log('connected', response);
            } else if (response.status === 'not_authorized') {
                console.log('not authorized');
            } else {
                console.log('tes');
            }
        });
    };

    const tes = () => {
        FB.logout(function() {
            console.log('logout', response);
        });
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log('connected', response);
            } else if (response.status === 'not_authorized') {
                console.log('not authorized');
            } else {
                console.log('else', response);
            }
        });
    };


    useEffect(() => {
    }, []);

    return (
        <>
            {/* <p>Login</p> */}
            <div>
                {/* <GoogleLogout
                    clientId={clientID}
                    buttonText="Logout"
                    onLogoutSuccess={handleGoogleLogout}>
                </GoogleLogout> */}
                {/* <button onClick={tes}>
                    logout
                </button> */}
                {
                    dataFacebook && (
                        <h1>{dataFacebook.name}</h1>
                    )
                }
                
                
            </div>
            <div className='login-container'>
                <Container maxW='container.xl'>
                    <SimpleGrid columns={[10, 10, 10, 10, 10]} 
                        spacing={{base: '10px', sm: '10px', md: '10px', lg: '0px', xl : '0px' }}
                        style={{textAlign: 'center'}}>
                        <GridItem colSpan={{base : 10, sm: 10, md: 6, lg: 6, xl : 6 }} >

                            <h1 className='login-text-header'>Sign In to Get Your Movies</h1>
                            <div className="login-option">
                                <h1>
                                    Don't have an account ? <br></br>
                                    You can <span>Register here!</span>
                                </h1>
                                <img src={People} />
                            </div>
                        </GridItem>
                        <GridItem colSpan={{base : 10, sm: 10, md: 4, lg: 4, xl : 4 }} >
                            <Input placeholder='Enter email or phone number' 
                                className='login-input' />
                            <br></br><br></br>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    style={{zIndex: 0}}
                                    className='login-input'
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
                                style={{marginTop: '30px', marginBottom: '30px', width: '100%'}}>
                                Sign In
                            </Button>

                            <div className="login-option-mobile">
                                <h1>
                                    Don't have an account ? 
                                    You can <span>Register here!</span>
                                </h1>
                            </div>

                            <SimpleGrid columns={10}>
                                <GridItem colSpan={{base : 2, sm: 3, md: 2, lg: 3, xl : 3 }}>
                                    <Divider />
                                </GridItem>
                                <GridItem colSpan={{base : 6, sm: 4, md: 6, lg: 4, xl : 4 }}>
                                    <h1 style={{color: 'gray', marginTop: '-12px'}}>
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
                                        clientId={clientID}
                                        render={renderProps => (
                                            <Button disabled={renderProps.disabled}
                                                onClick={renderProps.onClick}
                                                sx={{
                                                    width: '100%',
                                                    backgroundColor: 'aliceblue', 
                                                    // marginTop: '30px',
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
                                        appId={facebookID}
                                        render={renderProps => (
                                            <Button disabled={renderProps.disabled}
                                                onClick={renderProps.onClick}
                                                sx={{
                                                    width: '100%',
                                                    backgroundColor: 'aliceblue', 
                                                    // marginTop: '10px',
                                                    color: 'black',
                                                    // marginLeft: '10px'
                                                }}>
                                                <BsFacebook style={{color: 'blue'}}/> &nbsp;
                                                Facebook
                                            </Button>
                                        )}
                                        // autoLoad={true}
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
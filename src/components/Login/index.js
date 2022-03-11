import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout, useGoogleLogout } from "react-google-login";
import FacebookLogin from 'react-facebook-login';

const clientID = "15100114289-2rd2h4ses7ahd5cdcr40sbopcs1b4us6.apps.googleusercontent.com";
const facebookID = "5302591449775023";

// const { signOut } = useGoogleLogout();

const Login = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [dataFacebook, setDataFacebook] = useState(null);

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
        window.location.href = '/';
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

    const facebookIntegrate = async () => {
        window.FB.init({
            appId: facebookID, 
            status: true, 
            cookie: true, 
            xfbml: true  
        });
        FB.getLoginStatus(function(response) {
            console.log(response);
        }, true);
    };

    useEffect(() => {
    }, []);

    return (
        <>
            <p>Login</p>
            <div>
                <GoogleLogin
                    clientId={clientID}
                    buttonText="Log in with Google"
                    onSuccess={handleGoogleLogin}
                    onFailure={handleGoogleFailure}
                    cookiePolicy={'single_host_origin'}>

                </GoogleLogin>
                {/* <GoogleLogout
                    clientId={clientID}
                    buttonText="Logout"
                    onLogoutSuccess={handleGoogleLogout}>
                </GoogleLogout> */}
                <button onClick={tes}>
                    logout
                </button>
                {
                    dataFacebook && (
                        <h1>{dataFacebook.name}</h1>
                    )
                }
                
                <FacebookLogin
                    appId={facebookID}
                    // autoLoad={true}
                    fields="name,email,picture"
                    // onClick={componentClicked}
                    callback={handleFacebookLogin} />
            </div>
        </>
    );
};

export default Login;
import './Register.scss';

import { 
    SimpleGrid, 
    GridItem,
    Button,
    InputGroup,
    Input,
    InputRightElement,
    Divider,
    Container,
    FormControl,
    FormLabel
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import { Media } from 'react-breakpoints';


import RegisterIcon from '../../../images/register/sideimage.png';
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <>
            <Container maxW='container.md'>
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
                                    <FormControl>
                                        <FormLabel htmlFor='first-name'>First Name</FormLabel>
                                        <Input type='text' className='register-input' />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={{base : 10, sm: 10, md: 5, lg: 5, xl : 5 }}>
                                    <FormControl>
                                        <FormLabel htmlFor='last-name'>Last Name</FormLabel>
                                        <Input type='text' className='register-input' />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={{base : 10, sm: 10, md: 5, lg: 5, xl : 5 }}>
                                    <FormControl>
                                        <FormLabel htmlFor='occupation'>Occupation</FormLabel>
                                        <Input type='text' className='register-input' />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={{base : 10, sm: 10, md: 5, lg: 5, xl : 5 }}>
                                    <FormControl>
                                        <FormLabel htmlFor='region'>Region</FormLabel>
                                        <Input type='text' className='register-input' />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={10}>
                                    <FormControl>
                                        <FormLabel htmlFor='phone-number'>Phone Number</FormLabel>
                                        <Input type='number' className='register-input' />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={10}>
                                    <FormControl>
                                        <FormLabel htmlFor='email'>Email Address</FormLabel>
                                        <Input type='email' className='register-input' />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={10}>
                                    <FormControl>
                                        <FormLabel htmlFor='password'>Password</FormLabel>
                                        <InputGroup size='md'>
                                            <Input
                                                pr='4.5rem'
                                                type={showPassword ? 'text' : 'password'}
                                                style={{zIndex: 0}}
                                                className='register-input'
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
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={10}>
                                    <Button colorScheme='blue' className='register-submit'>
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
            </Container>
        </>
    );
};

export default Register;
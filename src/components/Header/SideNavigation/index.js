import  './SideNavigation.scss';

// Chakra-UI
import {
    Menu,
    MenuButton,
    MenuList,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    GridItem,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Image
} from '@chakra-ui/react';

import { 
    HamburgerIcon,
    Search2Icon,
} from '@chakra-ui/icons';
import { FaSun, FaMoon } from 'react-icons/fa';
import { RiMovie2Fill, RiLoginBoxFill, RiLogoutBoxFill } from 'react-icons/ri';
import { MdOutlineLocalMovies, MdDateRange, MdFavorite } from 'react-icons/md';
import { HiOutlineGlobe } from 'react-icons/hi';
import { ImUserPlus } from 'react-icons/im';
import moment from 'moment';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetSearch } from '../../../redux/actions/search';
import { Media } from 'react-breakpoints';
import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const poster_BaseURL = 'https://image.tmdb.org/t/p/original';

const propTypes = {
    isDark: PropTypes.bool,
    toggleColorMode: PropTypes.func,
    handleSearch: PropTypes.func,
    handleMovie: PropTypes.func,
    handleNavigate: PropTypes.func,
    handleLogout: PropTypes.func,
};

const SideNavigation = ({
    isDark, 
    toggleColorMode, 
    handleSearch, 
    handleMovie,
    handleNavigate,
    handleLogout
}) => {
    const [dataResults, setDataResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [user, setUser] = useState('');

    const dispatch = useDispatch();
    const search = useSelector(state => state.search);

    const location = useLocation();

    const FetchRedux = async (query) => {
        dispatch(GetSearch(query));
    };

    const handleChange = (e) => {
        e.preventDefault();
        setLoading(true);
        const temp = e.target.value.toLowerCase();
        if (temp !== '') {
            FetchRedux(temp);
            setTimeout(() => {
                const results = search.data.results.filter((item) => {
                    return item.title.toLowerCase().includes(temp);
                });
                setDataResults(results);
                setLoading(false);
            }, 300);
        } 
        else {
            setDataResults([]);
            setLoading(false);
        }
        setSearchInput(temp);
    };
    const handleFocus = (isBlur, routes) => {
        if(!isBlur) {
            handleSearch(routes);
            setTimeout(() => {
                setIsFocus(false);
            }, 1000);
        } else {
            setTimeout(() => {
                setIsFocus(false);
            }, 100);
        }
        
    };
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    return (
        <GridItem colSpan={{base : 4, sm: 12, md: 12, lg: 12, xl : 4 }} w="100%" height="80px" 
            className="component side-navigation-container">
            {
                searchInput !== '' && isFocus ? (
                    <div className='side-navigation-input-cont'>
                        <InputGroup>
                            <InputRightElement
                                pointerEvents="none">
                                <Button isLoading={loading} 
                                    spinnerPlacement='end'
                                    sx={{
                                        width: '100%',
                                        background: 'transparent',
                                        justifyContent: 'right'
                                    }}
                                    className="no-shadow"
                                >
                                    <Search2Icon color="gray.300" />
                                </Button>
                            </InputRightElement>
                            <Input type="text" placeholder="Search..." 
                                style={{ 
                                    color: 'aliceblue', 
                                    border: 'none',
                                    zIndex: 0
                                }}
                                value={searchInput} 
                                onChange={(e) => handleChange(e)}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => handleFocus(true)}
                                className='no-shadow' />
                        </InputGroup>
                        <div className='side-navigation-results-cont'>
                            {
                                dataResults && dataResults.map ((e, index) => {
                                    return (
                                        e.poster_path && (
                                            <div className='side-navigation-results' key={index}>
                                                <img src={`${poster_BaseURL}${e.poster_path}`} 
                                                    className='side-navigation-result-image' 
                                                    onClick={() => handleFocus(false, e)} />
                                                <div className='side-navigation-results-text-cont'>
                                                    <h1 className='side-navigation-results-text'
                                                        onClick={() => {
                                                            handleSearch(e);
                                                        } }>
                                                        {e.title} ({moment(e.release_date).format('YYYY')})
                                                    </h1>
                                                    <h1 className='side-navigation-results-rating'>
                                                        ⭐{e.vote_average.toFixed(1)}
                                                    </h1>
                                                </div>
                                            </div>
                                        )
                                        
                                    );
                                })
                            }
                        </div>
                    </div>
                ) : (
                    <div className='side-navigation-input-cont-empty'>
                        <InputGroup>
                            <InputRightElement
                                pointerEvents="none">
                                <Button isLoading={loading} 
                                    spinnerPlacement='end'
                                    sx={{
                                        width: '100%',
                                        background: 'transparent',
                                        justifyContent: 'right'
                                    }}
                                    className="no-shadow">
                                    <Search2Icon color="gray.300" />
                                </Button>
                            </InputRightElement>
                            <Input type="text" placeholder="Search..." 
                                style={{ 
                                    color: 'aliceblue', 
                                    border: 'none',
                                    borderRadius: '20px'
                                }}
                                value={searchInput} 
                                onChange={(e) => handleChange(e)}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => handleFocus(true)}
                                className='no-shadow' />
                        </InputGroup>
                    </div>
                )
            }
            <IconButton icon={isDark ? <FaSun /> : <FaMoon />}
                onClick={toggleColorMode}
                style={{backgroundColor: '', marginRight: 10, marginLeft: 10}} />
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                />
                <MenuList sx={{padding : 0}}>
                    {user?.isAuth && (
                        <div className='side-navigation-user'>
                            <Image
                                borderRadius='full'
                                boxSize='50px'
                                src={`${user?.profile?.image}`}
                                alt={user?.profile?.fullname}
                            />
                            <h1>{user?.profile?.fullname}</h1>
                        </div>
                    )}
                    <Media>
                        {
                            ({ breakpoints, currentBreakpoint }) => 
                                breakpoints[currentBreakpoint] <= breakpoints.sm ? (
                                    <>
                                        <Accordion allowMultiple>
                                            <AccordionItem className='no-border'>
                                                <AccordionButton className='no-box side-navigation-movies'
                                                    _expanded={{ bg: 'teal' }}>
                                                    <RiMovie2Fill style={{marginRight : '10px'}} />
                                                    <Box flex='1' textAlign='left'>
                                                        <b>Movies</b>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                                <AccordionPanel pb={4}>
                                                    <div className='side-navigation-movies-expand'>
                                                        <h1 onClick={() => handleMovie('movies')}>All Movies</h1>
                                                        <h1 onClick={() => handleMovie('trending')}>Trending</h1>
                                                        <h1 onClick={() => handleMovie('now-playing')}>Now Playing</h1>
                                                        <h1 onClick={() => handleMovie('popular')}>Popular</h1>
                                                    </div>
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>
                                        <div className='side-navigation-items'
                                            onClick={() => handleNavigate('/movies/genres')}>
                                            <MdOutlineLocalMovies className='side-navigation-items-icon' />
                                            <Box flex='1' textAlign='left'>
                                                Genres
                                            </Box>
                                        </div>
                                        <div className='side-navigation-items'
                                            onClick={() => handleNavigate('/movies/country')}>
                                            <HiOutlineGlobe className='side-navigation-items-icon' />
                                            <Box flex='1' textAlign='left'>
                                                Country
                                            </Box>
                                        </div>
                                        <div className='side-navigation-items'
                                            onClick={() => handleNavigate('/movies/years')}>
                                            <MdDateRange className='side-navigation-items-icon' />
                                            <Box flex='1' textAlign='left'>
                                                Years
                                            </Box>
                                        </div>
                                    </>
                                ) : null
                        }   
                    </Media>
                    {user?.isAuth && (
                        <div className='side-navigation-items'
                            onClick={() => handleNavigate(`${user?.profile?.fullname}/favorite`)}>
                            <MdFavorite className='side-navigation-items-icon' />
                            <Box flex='1' textAlign='left'>
                                Favorites
                            </Box>
                        </div>
                    )}
                    {!user?.isAuth && (
                        <div className='side-navigation-auth-cont'>
                            <div className='side-navigation-login pointer'
                                onClick={() => handleNavigate('/login')}>
                                <RiLoginBoxFill className='side-navigation-login-icon'/>
                                <Box flex='1' textAlign='left'>
                                    Log in
                                </Box>
                            </div>
                        </div>
                    )}
                    {user?.isAuth && (
                        <div className='side-navigation-auth-cont'>
                            <div className='side-navigation-logout pointer'
                                onClick={() => handleLogout()}>
                                <RiLogoutBoxFill className='side-navigation-logout-icon' />
                                <Box flex='1' textAlign='left'>
                                    Log out
                                </Box>
                            </div>
                        </div>
                    )}
                    {!user?.isAuth && (
                        <div className='side-navigation-auth-cont'>
                            <div className='side-navigation-register pointer'
                                onClick={() => handleNavigate('/register')}>
                                <ImUserPlus className='side-navigation-register-icon' />
                                <Box flex='1' textAlign='left'>
                                    Register
                                </Box>
                            </div>
                        </div>
                    )}
                </MenuList>
            </Menu>
        </GridItem>
    );
};

SideNavigation.propTypes = propTypes;

export default SideNavigation;

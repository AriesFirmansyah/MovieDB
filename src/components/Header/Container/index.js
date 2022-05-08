// CSS
import './container.scss';

// React
import { useEffect, useState } from 'react';
import moment from 'moment';


// Chakra-UI
import {
    SimpleGrid,
} from '@chakra-ui/react';

import { useColorMode } from '@chakra-ui/color-mode';
// import { FaSun, FaMoon } from 'react-icons/fa'

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GetGenres } from '../../../redux/actions/genres';
import { GetCountries } from '../../../redux/actions/countries';
import { AuthLogout } from '../../../redux/actions/auth';

import LogoHeader from '../Logo';
import MoviesNavigation from '../MoviesNavigation';
import GenresNavigation from '../GenresNavigation';
import CountryNavigation from '../CountryNavigation';
import YearsNavigation from '../YearsNavigation';
import SideNavigation from '../SideNavigation';

import { useNavigate } from 'react-router-dom';
import Loading from './skeleton';

const Nav = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    const countries = useSelector(state => state.countries);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const FetchRedux = async () => {
        dispatch(GetGenres());
        dispatch(GetCountries());
    };
    const handleCountry = (routes) => {
        navigate(`/movies/${routes.english_name}`, {
            state: {
                name: routes.english_name,
                key: routes.iso_3166_1,
                type: 'country'
            },
        });
        navigate(0);
    };
    const handleYear = (routes) => {
        navigate(`/movies/${routes}`, {
            state: {
                name: `Year (${routes})`,
                key: routes,
                type: 'year'
            },
        });
        navigate(0);
    };
    const handleGenre = (routes) => {
        navigate(`/movies/${routes.name}`, {
            state: {
                name: `Genre (${routes.name})`,
                key: routes.id,
                type: 'genre'
            },
        });
        navigate(0);
    };
    const handleMovie = (routes) => {
        if(routes === 'movies') {
            navigate('/movies/all', {
                state: {
                    name: '',
                    key: routes,
                    type: routes
                },
            });
        } else {
            navigate(`/movies/${routes}`, {
                state: {
                    name: routes,
                    key: routes,
                    type: routes
                },
            });
        }
        navigate(0);
    };
    const handleSearch = (routes) => {
        navigate(`/movie-details/${routes.original_title}(${moment(routes.release_date).format('YYYY')})`, {
            state : {
                name : routes.original_title,
                key : routes.id
            }
        });
        navigate(0);
    };
    
    const handleNavigate = (routes) => {
        navigate(routes);
        navigate(0);
    };

    const handleLogout = () => {
        dispatch(AuthLogout());

        if (window.location.pathname === '/') {
            navigate(window.location.pathname, {
                state : {
                    showAlert: true,
                    text: "Logout successed!",
                    status: 'info'
                }
            });
        } else {
            navigate('/', {
                state : {
                    showAlert: true,
                    text: "Logout successed!",
                    status: 'info'
                }
            });
        }
        navigate(0);
    };

    useEffect(() => {
        if(loading){
            FetchRedux();
            setTimeout(() => {
                setLoading(!loading);
            }, 1000);
        }
    }, []);

    return (
        loading ? (
            <Loading />
        )
            :
            (
                <div style={{width: '100%'}}>
                    <SimpleGrid columns={[4, 12, 12, 12, 16]} spacing="40px" className="cont1">
                        <LogoHeader />
                        <MoviesNavigation handleMovie={handleMovie} />
                        <GenresNavigation genres={genres} handleGenre={handleGenre} />
                        <CountryNavigation countries={countries} handleCountry={handleCountry} />
                        <YearsNavigation handleYear={handleYear} />
                        <SideNavigation 
                            isDark={isDark} 
                            toggleColorMode={toggleColorMode}
                            handleSearch={handleSearch}
                            handleMovie={handleMovie}
                            handleNavigate={handleNavigate}
                            handleLogout={handleLogout} />
                    </SimpleGrid>
                </div>
            ) 
    );
};

export default Nav;
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

import LogoHeader from '../Logo';
import MoviesNavigation from '../MoviesNavigation';
import GenresNavigation from '../GenresNavigation';
import CountryNavigation from '../CountryNavigation';
import YearsNavigation from '../YearsNavigation';
import SideNavigation from '../SideNavigation';

import { useNavigate } from 'react-router-dom';

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
    const HandleCountry = (routes) => {
        navigate(`/movies/${routes.english_name}`, {
            state: {
                name: routes.english_name,
                key: routes.iso_3166_1,
                type: 'country'
            },
        });
        navigate(0);
    };
    const HandleYear = (routes) => {
        navigate(`/movies/${routes}`, {
            state: {
                name: `Year (${routes})`,
                key: routes,
                type: 'year'
            },
        });
        navigate(0);
    };
    const HandleGenre = (routes) => {
        navigate(`/movies/${routes.name}`, {
            state: {
                name: `Genre (${routes.name})`,
                key: routes.id,
                type: 'genre'
            },
        });
        navigate(0);
    };
    const HandleMovie = (routes) => {
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
    const HandleSearch = (routes) => {
        navigate(`/movie-details/${routes.original_title}(${moment(routes.release_date).format('YYYY')})`, {
            state : {
                name : routes.original_title,
                key : routes.id
            }
        });
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
            <p>load</p>
        )
            :
            (
                <div style={{width: '100%'}}>
                    <SimpleGrid columns={[3, 8, 12, 16]} spacing="40px" className="cont1">
                        <LogoHeader />
                        <MoviesNavigation handleMovie={HandleMovie} />
                        <GenresNavigation genres={genres} handleGenre={HandleGenre} />
                        <CountryNavigation countries={countries} handleCountry={HandleCountry} />
                        <YearsNavigation handleYear={HandleYear} />
                        <SideNavigation isDark={isDark} toggleColorMode={toggleColorMode}
                            handleSearch={HandleSearch}  />
                    </SimpleGrid>
                </div>
            ) 
    );
};

export default Nav;
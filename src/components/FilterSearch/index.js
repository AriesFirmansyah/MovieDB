import './FilterSearch.css';

import { 
    useLocation,
    useNavigate
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { 
    GetMoviesCountry,
    GetMoviesYear,
    GetMoviesGenre,
    GetMovies,
    GetMoviesNowPlaying,
    GetMoviesPopular,
    GetMoviesTrending
} from '../../redux/actions/discover';

import { useEffect, useState } from 'react';

import FilterTitle from './../../images/popularTitle1.png';
import moment from 'moment';
import PlayButton from './../../images/play-button.png';
import {
    Heading,
    SimpleGrid,
    GridItem,
    Skeleton
} from '@chakra-ui/react';
import Loading from './skeleton';

import { 
    AddFavorite,
    GetAllFavorite,
    DeleteFavorite
} from '../../redux/actions/favorite';

import {
    MdFavoriteBorder,
    MdFavorite
} from 'react-icons/md';

import AlertDialog from '../components/AlertDialog';

// Base URL
const poster_BaseURL = 'https://image.tmdb.org/t/p/original';

const FilterSearch = () => {    
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const discover = useSelector(state => state.discover);

    const favorite = useSelector(state => state.favorite);
    const [user, setUser] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [alertText, setAlertText] = useState('');

    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState([]);
    
    const FetchRedux = async () => {
        switch(location.state.type) {
        case 'year': dispatch(GetMoviesYear(location.state.key)); break;
        case 'country': dispatch(GetMoviesCountry(location.state.key)); break;
        case 'genre': dispatch(GetMoviesGenre(location.state.key)); break;
        case 'movies': dispatch(GetMovies()); break;
        case 'trending': dispatch(GetMoviesTrending()); break;
        case 'now-playing': dispatch(GetMoviesNowPlaying()); break;
        case 'popular':dispatch(GetMoviesPopular()); break;
        default: break;
        }
    };

    const handleItems = (item) => {
        navigate(`/movie-details/${item.original_title}(${moment(item.release_date).format('YYYY')})`, {
            state : {
                name : item.title,
                key : item.id
            }
        });
    };

    const handleImageLoaded = (e, index) => {
        e.preventDefault();
        setImageLoading(item => ({
            ...item,
            [index]: false
        }));
    };

    const ImageLoader = () => {
        return (
            <Skeleton sx={{borderRadius: '20px'}}>
                <div style={{height: '270px'}} />
            </Skeleton>
        );
    };

    const handleFavorite = (e, movie) => {
        e.preventDefault();

        if (user?.isAuth) {
            const found = favorite?.data?.data?.find(e => e.movie_id === movie.id.toString());
            if (found) {
                dispatch(DeleteFavorite({
                    data: {
                        id: found.movie_id,
                        uid: found.uid
                    }
                }));

                setTimeout(() => {
                    dispatch(GetAllFavorite());
                }, 500);

                setTimeout(() => {
                    if (favorite.message !== '') {
                        setAlertText(favorite.message);
                        setStatus('success');
                        setIsOpen(true);
                    }
                }, 1500);
            } else {
                dispatch(AddFavorite({ 
                    data: {
                        movie: movie,
                        uid: user.profile.email
                    }
                }));

                setTimeout(() => {
                    dispatch(GetAllFavorite());
                }, 1000);

                setTimeout(() => {
                    if (favorite.message !== '') {
                        setAlertText(favorite.message);
                        setStatus('success');
                        setIsOpen(true);
                    }
                }, 2500);
            }
        } else {
            setAlertText("Please login first!");
            setStatus('error');
            setIsOpen(true);
        }
    };
	
	
    const Fill = (id) => {
        const found = favorite?.data?.data?.find(e => e.movie_id === id.toString());
        return (
            found?.uid ? (
                <MdFavorite className='fill'/>
            ) : (
                <MdFavoriteBorder/>
            )
        );
    };


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    useEffect(() => {
        if (user?.isAuth) {
            dispatch(GetAllFavorite());
        }
    }, [user]);

    useEffect(() => {
        if (loading) {
            FetchRedux();
            setTimeout(() => {
                setLoading(!loading);
                discover.data.results.map(() => {
                    setImageLoading(old => [
                        ...old, 
                        true
                    ]);
                });
            }, 1000);
        }

        if (location.state === null) {
            navigate('/notfound');
        }

    }, []);

    return (
        loading ? (
            <Loading />
        ) : (
            <>
                <div className="search-filter-title">
                    <img src={FilterTitle} style={{marginRight: '10px'}} />
                    <Heading as='h4' size='xl'>
                        {location.state.name.toString().toUpperCase()} MOVIES
                    </Heading>
                </div>
                <div className="search-filter-cont">
                    <SimpleGrid columns={[2, 4, 4, 4, 6]}  
                        spacing={{base: '40px', sm: '40px', md: '40px', lg: '40px', xl : '40px' }}>
                        {
                            discover.data.results && discover.data.results.map((e, index) => {
                                return (
                                    e.poster_path && (
                                        <GridItem colSpan={1} w="100%" sx={{textAlign: 'center'}} 
                                            key={index} > 
                                            <div className='search-filter-film'>
                                                <img src={`${poster_BaseURL}${e.poster_path}`} 
                                                    className={!imageLoading[index] ?
                                                        'search-filter-image pointer' :
                                                        'hide'
                                                    }
                                                    onLoad={(e) => handleImageLoaded(e, index)}
                                                    onClick={() => handleItems(e)} />
                                                {imageLoading[index] && <ImageLoader />}
                                                <img src={PlayButton} className='search-filter-playing-button'
                                                    onClick={() => handleItems(e)} />
                                                <div className='search-filter-rating pointer'>⭐{e.vote_average.toFixed(1)}</div>
                                                <div className='now-playing-favorite'
                                                    onClick={(i) => {
                                                        handleFavorite(i, e);
                                                    }}>
                                                    {Fill(e.id)}
                                                </div>
                                                <h1 className='search-filter-film-title pointer'>
                                                    {e.title} ({moment(e.release_date).format('YYYY')})
                                                </h1>
                                            </div>
                                        </GridItem>
                                    )
                                );
                            })
                        }
                    </SimpleGrid>
                    <AlertDialog 
                        isOpen={isOpen} 
                        setIsOpen={setIsOpen} 
                        alertText={alertText}
                        status={status} />
                </div>
            </>
        )
    );
};

export default FilterSearch;
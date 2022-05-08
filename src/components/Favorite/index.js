import './favorite.scss';

import { 
    useLocation,
    useNavigate
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { GetUserFavorite } from '../../redux/actions/favorite';

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
    DeleteFavorite
} from '../../redux/actions/favorite';

import {
    MdFavorite
} from 'react-icons/md';

import AlertDialog from '../components/AlertDialog';

// Base URL
const poster_BaseURL = 'https://image.tmdb.org/t/p/original';

const Favorite = () => {    
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const favorite = useSelector(state => state.favorite);
    const [user, setUser] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [alertText, setAlertText] = useState('');

    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState([]);
    
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
            dispatch(DeleteFavorite({
                data: {
                    id: movie.movie_id,
                    uid: movie.uid
                }
            }));

            setTimeout(() => {
                dispatch(GetUserFavorite({
                    uid: user.profile.email
                }));
                if (favorite.message !== '') {
                    setAlertText(favorite.message);
                    setStatus('success');
                    setIsOpen(true);
                }
            }, 500);
        } else {
            navigate('/' , {
                state : {
                    showAlert: true,
                    text: 'Please login first!',
                    status: 'error'
                }
            });
        }
    };
	
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    useEffect(() => {
        if (user?.isAuth) {
            dispatch(GetUserFavorite({
                uid: user.profile.email
            }));
        } else {
            if(user === null) {
                navigate('/' , {
                    state : {
                        showAlert: true,
                        text: 'Please login first!',
                        status: 'error'
                    }
                });
            }
        }
    }, [user]);

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(!loading);
                favorite.data.map(() => {
                    setImageLoading(old => [
                        ...old, 
                        true
                    ]);
                });
            }, 1000);
        }
    }, []);

    return (
        loading ? (
            <Loading />
        ) : (
            favorite.data.length !== 0 ? (
                <>
                    <div className="search-filter-title">
                        <img src={FilterTitle} style={{marginRight: '10px'}} />
                        <Heading as='h4' size='xl'>
                            Favorite Movies
                        </Heading>
                    </div>
                    <div className="search-filter-cont">
                        <SimpleGrid columns={[2, 4, 4, 4, 6]}  
                            spacing={{base: '40px', sm: '40px', md: '40px', lg: '40px', xl : '40px' }}>
                            {
                                favorite.data && favorite.data.map ((e, index) => {
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
                                                        <MdFavorite className='fill'/>
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

            ) : (
                <>
                    <div className="search-filter-title">
                        <img src={FilterTitle} style={{marginRight: '10px'}} />
                        <Heading as='h4' size='xl'>
                            Favorite Movies
                        </Heading>
                    </div>
                    <h1 
                        style={{
                            textAlign: 'center',
                            paddingBottom: 30
                        }}>
                        <i>There is no favorite movies.</i>
                    </h1>
                </>
            )
        )
    );
};

export default Favorite;
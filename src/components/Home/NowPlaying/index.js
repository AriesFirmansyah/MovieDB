import './nowplaying.scss';
import { useEffect, useState } from 'react';
import Loading from './skeleton';

import PopularTitle from './../../../images/popularTitle1.png';
import PlayButton from './../../../images/play-button.png';

import { 
    SimpleGrid, 
    GridItem,
    Heading,
    Skeleton
} from '@chakra-ui/react';

import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
    GetNowPlaying
} from './../../../redux/actions/movies';

import PropTypes from 'prop-types';

import {
    MdFavoriteBorder,
    MdFavorite
} from 'react-icons/md';

import { 
    AddFavorite,
    GetAllFavorite,
    DeleteFavorite
} from '../../../redux/actions/favorite';
// Base URL
const poster_BaseURL = 'https://image.tmdb.org/t/p/original';

const propTypes = {
    handleFilm: PropTypes.func,
    setIsOpen: PropTypes.func,
    setAlertText: PropTypes.func,
    setStatus: PropTypes.func
};

const NowPlaying = ({
    handleFilm,
    setIsOpen,
    setAlertText,
    setStatus
}) => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies);
    const favorite = useSelector(state => state.favorite);
    
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState([]);

    const [user, setUser] = useState('');

    const FetchRedux = async () => {
        dispatch(GetNowPlaying());
    };
    
    const handleImageLoaded = (e, index) => {
        e.preventDefault();
        setImageLoading(item => ({
            ...item,
            [index]: false
        }));
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
                }, 200);

                setTimeout(() => {
                    if (favorite.message !== '') {
                        setAlertText(favorite.message);
                        setStatus('success');
                        setIsOpen(true);
                    }
                }, 500);
            } else {
                dispatch(AddFavorite({ 
                    data: {
                        movie: movie,
                        uid: user.profile.email
                    }
                }));
                setTimeout(() => {
                    dispatch(GetAllFavorite());
                }, 200);
                setTimeout(() => {
                    if (favorite.message !== '') {
                        setAlertText(favorite.message);
                        setStatus('success');
                        setIsOpen(true);
                    }
                }, 500);
            }
        } else {
            setAlertText("Please login first!");
            setStatus('error');
            setIsOpen(true);
        }
    };

    useEffect(() => {
        if(loading) {
            FetchRedux();
            setTimeout(() => {
                setLoading(false);
                movies.now_playing.map(() => {
                    setImageLoading(old => [
                        ...old, 
                        true
                    ]);
                });
            }, 1000);
        }
    }, []);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    useEffect(() => {
        if (user?.isAuth) {
            dispatch(GetAllFavorite());
        }
    }, [user]);

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

    const ImageLoader = () => {
        return (
            <Skeleton sx={{borderRadius: '20px'}}>
                <div style={{height: '240px'}} />
            </Skeleton>
        );
    };
    return (
        <>
            <div className="nowPlayingTitle">
                <img src={PopularTitle} style={{marginRight: '10px'}} />
                <Heading as='h4' size='xl'>
                    NOW PLAYING
                </Heading>
            </div>
            {
                loading === true ? (
                    <Loading /> 
                ) : (

                    <div className="nowPlayingFilmCont">
                        <SimpleGrid columns={[2, 4, 4, 4, 6]}  
                            spacing={{base: '40px', sm: '40px', md: '40px', lg: '40px', xl : '40px' }}
                        >
                            {
                                movies.now_playing.map((nowPlayingData, index) => {
                                    return (
                                        <GridItem colSpan={1} w="100%" sx={{textAlign: 'center'}}
                                            key={nowPlayingData.id}> 
                                            <div className='nowPlayingFilm'>
                                                <img src={`${poster_BaseURL}${nowPlayingData.poster_path}`} 
                                                    className={!imageLoading[index] ? 'nowPlayingImage pointer' : 'hide'}
                                                    onLoad={(e) => handleImageLoaded(e, index)}
                                                    onClick={() => handleFilm(nowPlayingData)} />
                                                {imageLoading[index] && <ImageLoader />}
                                                <img src={PlayButton} className='nowPlayingButton' 
                                                    onClick={() => handleFilm(nowPlayingData)} />
                                                <div className='now-playing-rating'>⭐{nowPlayingData.vote_average.toFixed(1)}</div>
                                                <div className='now-playing-favorite'
                                                    onClick={(e) => {
                                                        handleFavorite(e, nowPlayingData);
                                                    }}>
                                                    {Fill(nowPlayingData.id)}
                                                </div>
                                                <h1 className='now-playing-title pointer'>
                                                    {nowPlayingData.title} ({moment(nowPlayingData.release_date).format('YYYY')})
                                                </h1>
                                            </div>
                                        </GridItem>

                                    );
                                })
                            }
                        </SimpleGrid>
                    </div>
                )
            }
        </>
    );
};

NowPlaying.propTypes = propTypes;

export default NowPlaying;
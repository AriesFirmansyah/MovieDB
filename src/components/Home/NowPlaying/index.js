// CSS
import './nowplaying.css';

// React
import React, { useEffect, useState } from 'react';

// Components
import Loading from './skeleton';

// Assets
import PopularTitle from './../../../images/popularTitle1.png';
import PlayButton from './../../../images/play-button.png';

// Chakra-UI
import { 
    SimpleGrid, 
    GridItem,
    Heading,
    Skeleton
} from '@chakra-ui/react';

import moment from 'moment';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    GetNowPlaying
} from './../../../redux/actions/movies';

import PropTypes from 'prop-types';


// Base URL
const poster_BaseURL = 'https://image.tmdb.org/t/p/original';

const propTypes = {
    handleFilm: PropTypes.func
};

const NowPlaying = ({handleFilm}) => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies);
  
    const [loading, setLoading] = React.useState(true);
    const [imageLoading, setImageLoading] = useState([]);

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
                                            key={nowPlayingData.id} onClick={() => handleFilm(nowPlayingData)}> 
                                            <div className='nowPlayingFilm'>
                                                <img src={`${poster_BaseURL}${nowPlayingData.poster_path}`} 
                                                    className={!imageLoading[index] ? 'nowPlayingImage pointer' : 'hide'}
                                                    onLoad={(e) => handleImageLoaded(e, index)} />
                                                {imageLoading[index] && <ImageLoader />}
                                                <img src={PlayButton} className='nowPlayingButton' />
                                                <div className='now-playing-rating'>⭐{nowPlayingData.vote_average.toFixed(1)}</div>
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
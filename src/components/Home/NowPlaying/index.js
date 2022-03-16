// CSS
import './nowplaying.css';

// React
import React, { useEffect } from 'react';

// Components
import Loading from './skeleton';

// Assets
import PopularTitle from './../../../images/popularTitle1.png';
import PlayButton from './../../../images/play-button.png';

// Chakra-UI
import { 
    SimpleGrid, 
    GridItem,
    Heading
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
  
    const FetchRedux = async () => {
        dispatch(GetNowPlaying());
    };

    useEffect(() => {
        if(loading) {
            FetchRedux();
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    
    }, []);
    return (
        loading === true ?
            <>
                <Loading />
            </>
            :
            <>
                <div className="nowPlayingTitle">
                    <img src={PopularTitle} style={{marginRight: '10px'}} />
                    <Heading as='h4' size='xl'>
                        NOW PLAYING
                    </Heading>
                </div>
                <div className="nowPlayingFilmCont">
                    <SimpleGrid columns={[2, 4, 4, 4, 6]}  
                        spacing={{base: '40px', sm: '40px', md: '40px', lg: '40px', xl : '40px' }}
                    >
                        {
                            movies.now_playing.map(nowPlayingData => {
                                return (
                                    <GridItem colSpan={1} w="100%" sx={{textAlign: 'center'}}
                                        key={nowPlayingData.id} onClick={() => handleFilm(nowPlayingData)}> 
                                        <div className='nowPlayingFilm'>
                                            <img src={`${poster_BaseURL}${nowPlayingData.poster_path}`} 
                                                className='nowPlayingImage pointer' />
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
            </>
    );
};

NowPlaying.propTypes = propTypes;

export default NowPlaying;
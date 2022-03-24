// CSS
import './popular.css';

// React
import React, { useEffect, useState } from 'react';
import moment from 'moment';

// Assets
import PopularTitle from './../../../images/popularTitle1.png';
import PlayButton from './../../../images/play-button.png';

// Components
import Loading from './skeleton';

// Chakra-UI
import { 
    SimpleGrid, 
    GridItem,
    Heading,
    Skeleton
} from '@chakra-ui/react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    GetPopular
} from './../../../redux/actions/movies';

import PropTypes from 'prop-types';

// Base URL
const poster_BaseURL = 'https://image.tmdb.org/t/p/original';

const propTypes = {
    handleFilm: PropTypes.func
};

const Popular = ({handleFilm}) => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies);
  
    const [loading, setLoading] = React.useState(true);
    const [imageLoading, setImageLoading] = useState([]);
  
    const FetchRedux = async () => {
        dispatch(GetPopular());
    };

    useEffect(() => {
        if(loading) {
            FetchRedux();
            setTimeout(() => {
                setLoading(false);
                movies.popular.map(() => {
                    setImageLoading(old => [
                        ...old, 
                        true
                    ]);
                });
            }, 1000);
        }
    }, []);
    

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
                <div style={{height: '240px'}} />
            </Skeleton>
        );
    };

    return (
        <>
            <div className="popularTitle">
                <img src={PopularTitle} style={{marginRight: '10px'}} />
                <Heading as='h4' size='xl'>
                    POPULAR
                </Heading>
            </div>
            {
                loading === true ? (
                    <Loading />
                ) : (
                    <div className="popularFilmCont">
                        <SimpleGrid columns={[2, 4, 4, 4, 6]}  
                            spacing={{base: '40px', sm: '40px', md: '40px', lg: '40px', xl : '40px' }}>
                            {
                                movies.popular.map((popularData, index) => {
                                    return (
                                        <GridItem colSpan={1} w="100%" sx={{textAlign: 'center'}}
                                            key={popularData.id} onClick={() => handleFilm(popularData)}> 
                                            <div className='popularFilm'>
                                                <img src={`${poster_BaseURL}${popularData.poster_path}`} 
                                                    className={!imageLoading[index] ? 'popularImage pointer' : 'hide'} 
                                                    onLoad={(e) => handleImageLoaded(e, index)} />
                                                {imageLoading[index] && <ImageLoader />}
                                                <img src={PlayButton} className='popularButton' />
                                                <div className='popular-rating pointer'>⭐{popularData.vote_average.toFixed(1)}</div>
                                                <h1 className='popular-item-title pointer'>
                                                    {popularData.title} ({moment(popularData.release_date).format('YYYY')})
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

Popular.propTypes = propTypes;

export default Popular;
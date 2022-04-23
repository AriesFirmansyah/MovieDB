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

// Base URL
const poster_BaseURL = 'https://image.tmdb.org/t/p/original';

const FilterSearch = () => {    
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const discover = useSelector(state => state.discover);

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

    useEffect(() => {
        if(loading) {
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
                                            key={index} onClick={() => handleItems(e)} > 
                                            <div className='search-filter-film'>
                                                <img src={`${poster_BaseURL}${e.poster_path}`} 
                                                    className={!imageLoading[index] ?
                                                        'search-filter-image pointer' :
                                                        'hide'
                                                    }
                                                    onLoad={(e) => handleImageLoaded(e, index)}/>
                                                {imageLoading[index] && <ImageLoader />}
                                                <img src={PlayButton} className='search-filter-playing-button' />
                                                <div className='search-filter-rating pointer'>⭐{e.vote_average.toFixed(1)}</div>
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
                </div>
            </>
        )
    );
};

export default FilterSearch;
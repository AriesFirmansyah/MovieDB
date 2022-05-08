import './carousel.scss';

import { useEffect, useState } from 'react';

import { 
    SimpleGrid, 
    GridItem,
    Image,
    Button
} from '@chakra-ui/react';

import moment from 'moment';
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

import AlertDialog from '../../components/AlertDialog';

import { useSelector, useDispatch } from 'react-redux';

const poster_BaseURL = 'https://image.tmdb.org/t/p/original';

const propTypes = {
    movie: PropTypes.object
};

const Carousel = ({movie}) => {
    // console.log(movie);

    const dispatch = useDispatch();

    const favorite = useSelector(state => state.favorite);
    const [user, setUser] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [status, setStatus] = useState('');

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

    const Fill = (movie) => {
        const found = favorite?.data?.data?.find(e => e.movie_id === movie.id.toString());
        return (
            found?.uid ? (
                <Button 
                    colorScheme='pink' 
                    leftIcon={
                        <MdFavorite className='fill'
                            style={{fontSize: '20px'}}/>
                    }
                    style={{
                        borderRadius: "10px 0px 0px 10px"
                    }}
                    onClick={(e) => handleFavorite(e, movie)}>
                    Remove from Favorites
                </Button>
            ) : (
                <Button 
                    colorScheme='pink' 
                    leftIcon={
                        <MdFavoriteBorder 
                            style={{fontSize: '20px'}}/>
                    }
                    style={{
                        borderRadius: "0px 0px 0px 10px"
                    }}
                    onClick={(e) => handleFavorite(e, movie)}>
                    Add to Favorites
                </Button>
                
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

    return (
        <>
            <div style={{position: 'relative'}}>
                <Image src={`${poster_BaseURL}${movie.details_backdrop}`} 
                    className="movieDetailsCarousel-image" w="100%" />
                <div className='moviedetails-favorite'>
                    {Fill(movie.details)}
                </div>
            </div>
            <div className='moviedetails-carousel1'>
                <SimpleGrid columns={[10, 10, 10, 7, 7]} 
                    spacing={{base: '10px', sm: '10px', md: '40px', lg: '40px', xl : '40px' }} 
                    className='moviedetails-carousel2'>
                    <GridItem colSpan={{base : 10, sm: 10, md: 10, lg: 2, xl : 2 }} >
                        <h1 className='movie-details-title'>
                            {movie.details.original_title} ({moment(movie.details.release_date).format('YYYY')})
                        </h1>
                    </GridItem>
                    <GridItem colSpan={{base : 2, sm: 2, md: 2, lg: 1, xl : 1 }} >
                        <h1 style={{color: '#616161'}}>DURATION</h1>
                        <h2 style={{fontWeight: '500'}}>
                            {movie.details.runtime} m
                        </h2>
                    </GridItem>
                    <GridItem colSpan={{base : 2, sm: 2, md: 2, lg: 1, xl : 1 }} >
                        <h1 style={{color: '#616161'}}>RATING</h1>
                        <h2 style={{fontWeight: '500'}}>
                            {movie.details.vote_average}
                        </h2>
                    </GridItem>
                    <GridItem colSpan={{base : 3, sm: 3, md: 3, lg: 2, xl : 2 }} >
                        <h1 style={{color: '#616161'}}>
                            GENRE
                        </h1>
                        <div>
                            {
                                movie.details_genre && movie.details_genre.map((dataGenre, index) => {
                                    return (
                                        <h2 style={{display: 'inline-block', fontWeight: '500'}}
                                            key={index}>
                                            {dataGenre.name} 
                                            {index < movie.details.genres.length-1 ? ',' : '' } 
                                            &nbsp;&nbsp;
                                        </h2>
                                    );
                                })
                            }
                        </div>
                    </GridItem>
                    <GridItem colSpan={{base : 3, sm: 3, md: 3, lg: 1, xl : 1 }} >
                        <h1 style={{color: '#616161'}}>
                            RELEASE DATE
                        </h1>
                        <h2 style={{fontWeight: '500'}}>
                            { moment(movie.details.release_date).format('LL') } (US)
                        </h2>
                    </GridItem>
                </SimpleGrid>
            </div>
            <AlertDialog 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                alertText={alertText}
                status={status} />
        </>
    );
};

Carousel.propTypes = propTypes;

export default Carousel;
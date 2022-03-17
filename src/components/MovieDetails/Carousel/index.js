import './carousel.scss';

import { 
    SimpleGrid, 
    GridItem,
    Image,
} from '@chakra-ui/react';

import moment from 'moment';
import PropTypes from 'prop-types';

const poster_BaseURL = 'https://image.tmdb.org/t/p/original';

const propTypes = {
    movie: PropTypes.object
};

const Carousel = ({movie}) => {
    // console.log(movie);
    return (
        <>
            <Image src={`${poster_BaseURL}${movie.details_backdrop}`} 
                className="movieDetailsCarousel-image" w="100%" />
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
        </>
    );
};

Carousel.propTypes = propTypes;

export default Carousel;
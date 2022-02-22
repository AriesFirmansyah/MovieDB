import './carousel.css';

import { 
    SimpleGrid, 
    GridItem,
    Image,
} from '@chakra-ui/react';

import moment from 'moment';

const poster_BaseURL = "https://image.tmdb.org/t/p/original";

const propTypes = {
}

const Carousel = ({movie}) => {
    return (
        <>
            <Image src={`${poster_BaseURL}${movie.details_backdrop}`} 
                className="movieDetailsCarousel-image" w="100%" />
            <div className='moviedetails-carousel1'>
                <SimpleGrid columns={[7, 7, 7, 7, 7]} 
                    spacing={{base: "10px", sm: "10px", md: "40px", lg: "40px", xl : "40px" }} 
                    className='moviedetails-carousel2'>
                    <GridItem colSpan={{base : 2, sm: 2, md: 2, lg: 2, xl : 2 }} >
                        <h1 style={{fontSize: '30px', marginTop: '3px'}}>
                            {movie.details.original_title} <br></br>
                            ({moment(movie.details.release_date).format('YYYY')})
                        </h1>
                    </GridItem>
                    <GridItem colSpan={{base : 1, sm: 1, md: 1, lg: 1, xl : 1 }} >
                        <h1 style={{color: '#616161'}}>DURATION</h1>
                        <h2 style={{fontWeight: '500'}}>
                            {movie.details.runtime} m
                        </h2>
                    </GridItem>
                    <GridItem colSpan={{base : 1, sm: 1, md: 1, lg: 1, xl : 1 }} >
                        <h1 style={{color: '#616161'}}>RATING</h1>
                        <h2 style={{fontWeight: '500'}}>
                            {movie.details.vote_average}
                        </h2>
                    </GridItem>
                    <GridItem colSpan={{base : 2, sm: 2, md: 2, lg: 2, xl : 2 }} >
                        <h1 style={{color: '#616161'}}>
                            GENRE
                        </h1>
                        <div>
                            {
                                movie.details_genre && movie.details_genre.map((dataGenre, index) => {
                                    return (
                                        <h2 style={{display: 'inline-block', fontWeight: '500'}}>
                                            {dataGenre.name} 
                                            {index < movie.details.genres.length-1 ? ',' : '' } 
                                            &nbsp;&nbsp;
                                        </h2>
                                    );
                                })
                            }
                        </div>
                    </GridItem>
                    <GridItem colSpan={{base : 1, sm: 1, md: 1, lg: 1, xl : 1 }} >
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
    )
}

Carousel.propTypes = propTypes;

export default Carousel;
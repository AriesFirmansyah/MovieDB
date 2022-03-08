import './recomendation.css';

import { Container } from '@chakra-ui/react';
import moment from 'moment';
import PlayButton from '../../../images/play-button.png';
import PropTypes from 'prop-types';
const photo_BaseURL = 'https://image.tmdb.org/t/p/original';

const propTypes = {
    movie: PropTypes.object,
    navigation: PropTypes.func
};

const Recomendation = ({movie, navigation}) => {
    return (
        <>
            <Container maxW='container.xl'>
                <div className='recommendation-container'>
                    <h1>Recommendations</h1>
                    <div className='card-flex-recommendation'>
                        {
                            movie.details_recommendation && movie.details_recommendation.map ((e, index) => {
                                return(
                                    <div key={index}>
                                        <div className='card-item-recommendation' 
                                            onClick={() => navigation(e)}>
                                            <img src={`${photo_BaseURL}${e.poster_path}`}
                                                className='recommendation-image' />
                                            <img src={PlayButton} className='recommendation-play-button' />
                                            <div className='recommendation-rating'>⭐{e.vote_average.toFixed(1)}</div>
                                            <h1 className='recommendation-title'>
                                                {e.original_title} ({moment(e.release_data).format('YYYY')})
                                            </h1>
                                        </div>
                                    </div>

                                );
                            })
                        }
                    </div>
                </div>

            </Container>
        </>
    );
};

Recomendation.propTypes = propTypes;

export default Recomendation;

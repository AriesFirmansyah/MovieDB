import Slider from 'react-slick';

import './companies.scss';
import PropTypes from 'prop-types';
import { Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const photo_BaseURL = 'https://image.tmdb.org/t/p/original';

const propTypes = {
    movie: PropTypes.object
};

const Companies = ({movie}) => {
    const [length, setLength] = useState(0);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    
    useEffect(() => {
        movie.details.production_companies &&
        movie.details.production_companies.map (e => {
            if(e.logo_path !== null) {
                setLength(length + 1);
            }
        });
    }, []);
    
    return (
        length > 0 ? (
            <div className="companies-container">
                <Slider {...settings}>
                    {
                        movie.details.production_companies && 
                        movie.details.production_companies.map(e => {
                            if(e.logo_path !== null) {
                                return (
                                    <div className="companies-item" key={e.id}>
                                        <Container maxW='container.sm'>
                                            <img src={`${photo_BaseURL}${e.logo_path}`} 
                                                className="companies-image" />
                                        </Container>
                                    </div>
                                );
                            }
                        })
                    }
                </Slider>
            </div>
        ) : null
    );
};

Companies.propTypes = propTypes;

export default Companies;

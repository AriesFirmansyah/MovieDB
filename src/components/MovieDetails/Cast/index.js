import './cast.scss';

import { 
    Container
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import Slider from 'react-slick';
import PropTypes from 'prop-types';
import Loading from './skeleton';

import castNull from './../../../images/movie-details/cast null.png';

const photo_BaseURL = 'https://image.tmdb.org/t/p/original';

const propTypes = {
    movie: PropTypes.object
};

const Cast = ({movie}) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        responsive : [
            {   
                breakpoint: 379,
                settings : {
                    slidesToShow: 1,
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToScroll: 1,
                    arrows: false,
                    swipeToSlide: true,
                }
            },
            {   
                breakpoint: 536,
                settings : {
                    slidesToShow: 2,
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToScroll: 1,
                    arrows: false,
                    swipeToSlide: true,
                }
            },
            {   
                breakpoint: 756,
                settings : {
                    slidesToShow: 3,
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToScroll: 1,
                    arrows: false,
                    swipeToSlide: true,
                }
            },
            {   
                breakpoint: 992,
                settings : {
                    slidesToShow: 4,
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToScroll: 1,
                    arrows: false,
                    swipeToSlide: true,
                }
            },
            {   
                breakpoint: 1200,
                settings : {
                    slidesToShow: 6,
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToScroll: 1,
                    arrows: false,
                    swipeToSlide: true,
                }
            },
            {   
                breakpoint: 1400,
                settings : {
                    slidesToShow: 7,
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToScroll: 1,
                    arrows: false,
                    swipeToSlide: true,
                }
            },
        ]
    };

    const [imageLoading, setImageLoading] = useState([]);
    const handleImageLoaded = (e, index) => {
        e.preventDefault();
        setImageLoading(item => ({
            ...item,
            [index]: false
        }));
    };

    useEffect(() => {
        movie.details_credit.cast.map(() => {
            setImageLoading(old => [
                ...old, 
                true
            ]);
        });
    }, []);

    return (
        <>
            {/* <p>Total updates: {slideIndex} </p> */}
      
            <Container maxW='container.xl'>
                <div className='cast-container'>
                    <h1 className='title-cast'>Cast</h1>
                    <Slider {...settings}
                        style={{width : '100%' }}>
                        {
                            movie.details_credit.cast.map((e, index) => {
                                return (
                                    <div className='cast-card-gap' key={index}>
                                        <div className='cast-card-container'>
                                            {
                                                e.profile_path != null ? (
                                                    <div>
                                                        {imageLoading[index] && (
                                                            <Loading />
                                                        )}
                                                        <img src={`${photo_BaseURL}${e.profile_path}`} 
                                                            className={!imageLoading[index] ? 'cast-image' : 'hide'}
                                                            // style={{display: imageLoading[index] ? 'none' : 'block'}}
                                                            onLoad={(e) => handleImageLoaded(e, index)} />
                                                        
                                                    </div>
                                                ) : 
                                                    (
                                                        <img src={castNull} className='cast-image' 
                                                            style={{background: 'white'}}/>
                                                    )
                                            }
                                            <div className='cast-text'>
                                                <h1>{e.original_name}</h1>
                                                <p>{e.character}</p>
                                            </div>
                                        </div>
                                    </div>
                
                                );
                            })
                        }
                    </Slider>
                    <br></br>
                </div>
            </Container>
        </>
    );
};

Cast.propTypes = propTypes;

export default Cast;

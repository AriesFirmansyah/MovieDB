// CSS
import './carousel.scss';

// React
import React, { useEffect } from 'react';

// Chakra-UI
import { 
    SimpleGrid, 
    GridItem,
    Image,
} from '@chakra-ui/react';

// React Slick Carousel

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

// Assets
import ChakraLogo from './../../../images/logolibrary/chakrauilogo.png';
import NodeJsLogo from './../../../images/logolibrary/nodejslogo.png';
import ReactLogo from './../../../images/logolibrary/reactjslogo.png';
import ReduxLogo from './../../../images/logolibrary/reactreduxlogo.png';

// Components
import Loading from './skeleton';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    GetTrendingData
} from './../../../redux/actions/trending';

import PropTypes from 'prop-types';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper";


// Base URL
const poster_BaseURL = 'https://image.tmdb.org/t/p/original';

const propTypes = {
    handleFilm: PropTypes.func
};

const Carousel = ({handleFilm}) => {
    const dispatch = useDispatch();
    const trending = useSelector(state => state.trending);
  
    // console.log("trending", trending);
  
    const [loading, setLoading] = React.useState(true);
  
    const FetchRedux = async () => {
        dispatch(GetTrendingData());
    };

    useEffect(() => {
        if(loading) {
            FetchRedux();
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    
    }, []);
      
    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 5000,
    //     pauseOnHover: true,
    
    //     className: 'center',
    //     centerMode: true,
    //     centerPadding: '0px',
    // };
    
    const settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        rtl: true,
        focusOnSelect: true,
    
        // className: 'center',
        // centerPadding: '60px',
        swipeToSlide: true,
        arrows: false,
        swipe: false,

        responsive : [
            {   
                breakpoint: 576,
                settings : {
                    slidesToShow: 1,
                }
            },
            {   
                breakpoint: 768,
                settings : {
                    slidesToShow: 2,
                }
            },
            {   
                breakpoint: 992,
                settings : {
                    slidesToShow: 3
                }
            },
        ]

    };
    return (
        loading === true ? 
            <>
                <Loading />
            </>
            :
            <>
                
                <SimpleGrid columns={1} spacing="40px" className='home-carousel-container'>
                    <GridItem colSpan={1} w="100%" className="carousel1-grid">
                        <Swiper 
                            navigation={true} 
                            modules={[
                                Navigation,
                                Autoplay
                            ]} 
                            loop={true} 
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            className="mySwiper"
                            style={{
                                zIndex: '0',
                                "--swiper-navigation-color": "#fff",
                            }}>
                            {/* <SwiperSlide>Slide 1</SwiperSlide> */}
                            {
                                trending.data.map(trending => {
                                    return (
                                        <SwiperSlide onClick={() => handleFilm(trending)} className="pointer-cursor"
                                            style={{zIndex: '0'}} 
                                            key={trending.id}>
                                            <h4 className="carousel1-title">
                                                {trending.original_title}
                                            </h4>
                                            <Image src={`${poster_BaseURL}${trending.backdrop_path}`}   
                                                w='100%' className="carousel1-image" />
                                        </SwiperSlide>
                                    );
                                })
                            }
                        </Swiper>
                        <br></br>
                        {/* <Slider {...settings} style={{zIndex: '0'}}>
                            {
                                trending.data.map(trending => {
                                    return (
                                        <div onClick={() => handleFilm(trending)} className="pointer-cursor"
                                            style={{zIndex: '0'}} 
                                            key={trending.id}>
                                            <h4 className="carousel1-title">
                                                {trending.original_title}
                                            </h4>
                                            <Image src={`${poster_BaseURL}${trending.backdrop_path}`}   
                                                w='100%' className="carousel1-image" />
                                        </div>
                                    );
                                })
                            }

                        </Slider> */}
                    </GridItem>
                    <GridItem colSpan={1} w="100%" height="90" 
                        sx={{textAlign: 'center', marginTop: -4}} >
                        <Slider {...settings2}>
                            <div className='tech-image'>
                                <Image src={ChakraLogo} alt='Chakra UI' className='chakraui' />
                            </div>
                            <div className='tech-image'>
                                <Image src={ReactLogo} alt='React JS' className='reactjs' />
                            </div>
                            <div className='tech-image'>
                                <Image src={ReduxLogo} alt='Redux' className='redux' />
                            </div>
                            <div className='tech-image'>
                                <Image src={NodeJsLogo} alt='Node JS'  className='nodejs' />
                            </div>
                            <div className='tech-image'>
                                <Image src={ReduxLogo} alt='Redux2'  className='redux' />
                            </div>
                        </Slider>
                    </GridItem>
                </SimpleGrid>
            </>
    );
};

Carousel.propTypes = propTypes;

export default Carousel;
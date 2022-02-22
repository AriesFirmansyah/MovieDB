// CSS
import './carousel.css';

// React
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

// Chakra-UI
import { 
    SimpleGrid, 
    GridItem,
    Image,
} from '@chakra-ui/react';

// React Slick Carousel

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

// Base URL
const poster_BaseURL = "https://image.tmdb.org/t/p/original";


const Carousel = ({handleFilm}) => {
    const dispatch = useDispatch();
    const trending = useSelector(state => state.trending);
  
    // console.log("trending", trending);
  
    const [loading, setLoading] = React.useState(true);
  
    const FetchRedux = async () => {
      dispatch(GetTrendingData());
    }

    useEffect(() => {
        if(loading) {
            FetchRedux();
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }
    
    }, []);
      
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
    
        className: "center",
        centerMode: true,
        centerPadding: "0px",
      };
    
      const settings2 = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        rtl: true,
        focusOnSelect: true,
    
        className: "center",
        centerPadding: "60px",
        swipeToSlide: true,
        nextArrow: <HiddenArrow  />,
        prevArrow: <HiddenArrow  />
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
                        <Slider {...settings} style={{zIndex: '0'}}>
                            {
                            trending.data.map(trending => {
                                return (
                                <div onClick={() => handleFilm(trending)} className="pointer-cursor"
                                style={{zIndex: '0'}}>
                                    <h4 className="carousel1-title">
                                    {trending.original_title}
                                    </h4>
                                    <Image src={`${poster_BaseURL}${trending.backdrop_path}`}   
                                    w='100%' className="carousel1-image" />
                                </div>
                                );
                            })
                            }

                        </Slider>
                    </GridItem>
                    <GridItem colSpan={1} w="100%" height="90" 
                        sx={{textAlign: 'center', marginTop: -4}} >
                        <Slider {...settings2}>
                            <div>
                                <Image src={ChakraLogo} alt='Dan Abramov'  style={{margin: 'auto'}}  
                                    w='200px' h="50px" />
                            </div>
                            <div>
                                <Image src={ReactLogo} alt='Dan Abramov'  style={{margin: 'auto', marginTop: -10}} 
                                    w='190px' h="80px" />
                            </div>
                            <div>
                                <Image src={ReduxLogo} alt='Dan Abramov'  
                                    style={{margin: 'auto',  marginTop: -23}} 
                                    w='300px' h="100px" />
                            </div>
                            <div>
                                <Image src={NodeJsLogo} alt='Dan Abramov'  
                                    style={{margin: 'auto', marginTop: -22, marginLeft: 35}} 
                                    w='200px' h="90px" />
                            </div>
                            <div>
                                <Image src={ReduxLogo} alt='Dan Abramov'  
                                    style={{margin: 'auto',  marginTop: -23}} 
                                    w='300px' h="100px" />
                            </div>
                        </Slider>
                    </GridItem>
                </SimpleGrid>
            </>
    )
}



const HiddenArrow = () => {
    return (
        <div
            style={{ display: "none", background: "red" }}
        />
);


  
 
  }

  export default Carousel;
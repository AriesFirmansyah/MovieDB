import { 
    SimpleGrid, 
    GridItem,
} from '@chakra-ui/react';

import './videos.css';

import Slider from 'react-slick';

import PropTypes from 'prop-types';


const propTypes = {
    data: PropTypes.array,
    handleOpen: PropTypes.func,
    handleSlide: PropTypes.func
};

const Videos = ({data, handleOpen, handleSlide}) => {
  
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 9000,
        pauseOnHover: true,
        //   rtl: true,
        focusOnSelect: true,
        className: 'center',
        centerPadding: '0px',
        swipeToSlide: true,
        nextArrow: <HiddenArrow  />,
        prevArrow: <HiddenArrow  />
    };
    return (
        data.length != 0 ? (
            <>
                <SimpleGrid columns={1} spacing="0px">
                    <GridItem colSpan={1} w="100%" height="290" 
                        sx={{textAlign: 'center', marginTop: 4}}>
                        <Slider {...settings}>
                            {
                                data && data.map(movies => {
                                    return ( 
                                        <div className="video-slider1" key={movies.key}>
                                            <img src={`//img.youtube.com/vi/${movies.key}/maxresdefault.jpg`} 
                                                onClick={() =>  {
                                                    handleSlide(movies.key);
                                                    handleOpen();
                                                }} />
                                        </div>
                                    );
                                })
                            }
                        
                        </Slider>
                    </GridItem>
                </SimpleGrid>
            </>
        ) : 
            (
                <p><i>&nbsp;&nbsp;&nbsp;&nbsp;There is no video!</i></p>
            )
    );
};

Videos.propTypes = propTypes;

const HiddenArrow = () => {
    return (
        <div
            style={{ display: 'none', background: 'red' }}
        />
    );
};


export default Videos;
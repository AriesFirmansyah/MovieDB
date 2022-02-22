import './cast.css';

import { 
    Container
} from '@chakra-ui/react';

import Slider from "react-slick";

import castNull from './../../../images/movie-details/cast null.png';

const photo_BaseURL = "https://image.tmdb.org/t/p/original";

const Cast = ({movie}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
  };

  return (
    <>
      {/* <p>Total updates: {slideIndex} </p> */}
      
      <Container maxW='container.xl' className='cast-padding-container'>
        <div className='cast-container'>
        <h1 className='title-cast'>Cast</h1>
        <Slider {...settings}
          style={{width : '100%' }}>
          {
            movie.details_credit.cast.map(e => {
              return (
                <div className='cast-card-gap'>
                  <div className='cast-card-container'>
                    {
                      e.profile_path != null ? (
                        <img src={`${photo_BaseURL}${e.profile_path}`} 
                          className='cast-image' />
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
                
              )
            })
          }
        </Slider>
        <br></br>
        {/* <input onChange={handleClick} value={slideIndex}
          type="range" min={0} max={maxRange}
          className='slider' /> */}
        </div>
      </Container>
    </>
  );
}



export default Cast;

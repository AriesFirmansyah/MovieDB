import { useState, useEffect } from 'react';
import  './photos.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const poster_BaseURL = "https://image.tmdb.org/t/p/original";

const Photos = (props) => {
    
    const [dataImages, setDataImages] = useState({
        imageIndex: 0,
        isOpen: false,
    })
    const [images, setImages] = useState([]);

    const getIndex = (link) => {
      return images.findIndex(index => index === link);
    }
  
    const handleImage = (link) => {
      const temp = getIndex(link);
      setDataImages({...dataImages, imageIndex: temp, isOpen: true});
    }
    
    useEffect(() => {
      setTimeout(() => {
        props.data.map((photos) => {
          if(photos.iso_639_1 === "en"){
            const temp = `${poster_BaseURL}${photos.file_path}`;
            setImages(oldImages => [...oldImages, temp])
          }
        })
      }, 400)
    }, [])
    
    return (
      <>
        <div className='photos-container1'>
          {dataImages.isOpen && (
              <Lightbox
                  mainSrc={images[dataImages.imageIndex]}
                  nextSrc={images[(dataImages.imageIndex + 1) % images.length]}
                  prevSrc={images[(dataImages.imageIndex + images.length - 1) % images.length]}
                  onCloseRequest={() => setDataImages({...dataImages, isOpen: false })}
                  onMovePrevRequest={() =>
                      setDataImages({
                          ...dataImages,
                          imageIndex: (dataImages.imageIndex + images.length - 1) % images.length,
                      })
                  }
                  onMoveNextRequest={() =>
                      setDataImages({
                          ...dataImages,
                          imageIndex: (dataImages.imageIndex + 1) % images.length
                      })
                  }
              />
          )}
        
          <div className='photos-container2'>
              {
                props.data && props.data.map((movies, index) => {
                    if(movies.iso_639_1 === "en") {
                      return ( 
                          <img src={`${poster_BaseURL}${movies.file_path}`} 
                            className='image-size'
                            onClick={() => handleImage(`${poster_BaseURL}${movies.file_path}`)} />
                      )
                    }
                })
              }
          </div>
        </div>
      </>
    );
}


export default Photos;

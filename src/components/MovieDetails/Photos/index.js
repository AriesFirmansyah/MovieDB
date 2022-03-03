import { useState, useEffect } from 'react';
import  './photos.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import PropTypes from 'prop-types';
const poster_BaseURL = 'https://image.tmdb.org/t/p/original';

const propTypes = {
    data: PropTypes.array
};
const Photos = ({data}) => {
    console.log(data);
    const [dataImages, setDataImages] = useState({
        imageIndex: 0,
        isOpen: false,
    });
    const [images, setImages] = useState([]);

    const getIndex = (link) => {
        return images.findIndex(index => index === link);
    };
  
    const handleImage = (link) => {
        const temp = getIndex(link);
        setDataImages({...dataImages, imageIndex: temp, isOpen: true});
    };
    
    useEffect(() => {
        setTimeout(() => {
            data.map((photos) => {
                if(photos.iso_639_1 === 'en'){
                    const temp = `${poster_BaseURL}${photos.file_path}`;
                    setImages(oldImages => [...oldImages, temp]);
                } else {
                    const temp = `${poster_BaseURL}${photos.file_path}`;
                    setImages(oldImages => [...oldImages, temp]);
                }   
            });
        }, 400);
    }, []);
    
    return (
        data.length != 0 ? (
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
                            data && data.length > 10 ? (
                                data && data.map((movies, index) => {
                                    if(movies.iso_639_1 === 'en') {
                                        return ( 
                                            <img src={`${poster_BaseURL}${movies.file_path}`} 
                                                className='image-size'
                                                onClick={() => handleImage(`${poster_BaseURL}${movies.file_path}`)}
                                                key={index} />
                                        );
                                    } 
                                })
                            ) : 
                                (   
                                    data && data.map((movies, index) => {
                                        return ( 
                                            <img src={`${poster_BaseURL}${movies.file_path}`} 
                                                className='image-size'
                                                onClick={() => handleImage(`${poster_BaseURL}${movies.file_path}`)} 
                                                key={index} />
                                        );
                                    })
                                )
                        }
                    </div>
                </div>
            </>
        ) :
            (
                <p><i>&nbsp;&nbsp;&nbsp;&nbsp;There is no poster!</i></p>
            )
    );
};

Photos.propTypes = propTypes;

export default Photos;

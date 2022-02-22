import FsLightbox from 'fslightbox-react';
import './lightbox.css';

const Lightbox = ({isOpen, data, slide}) => {
    // console.log(movie)
    return (
        <>
            <FsLightbox
                toggler={isOpen}
                sources={data}
                slide={slide}
                maxYoutubeVideoDimensions={{ width: 1920, height: 1080}}
                />
        </>

    )
}

export default Lightbox;
import FsLightbox from 'fslightbox-react';
import './lightbox.css';
import PropTypes from 'prop-types';

const propTypes = {
    isOpen: PropTypes.bool,
    data: PropTypes.array,
    slide: PropTypes.number
};

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

    );
};

Lightbox.propTypes = propTypes;

export default Lightbox;
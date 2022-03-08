import React, { useEffect, useState} from 'react';
import moment from 'moment';
import { 
    useNavigate, 
    useLocation 
} from 'react-router-dom';

// import './../movie.css';


import Carousel from '../Carousel';
import Content from '../Content';
import Cast from '../Cast';
import Companies from '../Companies';
import Lightbox from '../Lightbox';
import Recommendation from '../Recommendation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    GetMovieDetails,
    GetImageMovieDetails,
    GetVideoMovieDetails,
    GetCreditMovieDetails,
    GetSocialMediaMovieDetails,
    GetKeywordMovieDetails,
    GetReviewMovieDetails,
    GetRecomendationMovieDetails
} from './../../../redux/actions/movies';


const Movies = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const movie = useSelector(state => state.movies);

    const [dataLightbox, setDataLightbox] = useState([]);
    const [dataIndexLightbox, setDataIndexLightbox] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [slideLightbox, setSlideLightbox]= useState(1);
  
    const FetchRedux = async () => {
        dispatch(GetMovieDetails(location.state.key));
        dispatch(GetImageMovieDetails(location.state.key));
        dispatch(GetVideoMovieDetails(location.state.key));
        dispatch(GetCreditMovieDetails(location.state.key));
        dispatch(GetSocialMediaMovieDetails(location.state.key));
        dispatch(GetKeywordMovieDetails(location.state.key));
        dispatch(GetReviewMovieDetails(location.state.key));
        dispatch(GetRecomendationMovieDetails(location.state.key));
    };

    const handleLightBox = () => {
        setIsOpen(!isOpen);
    };
    const handleSlideLightbox = (key) => {
        let temp = dataIndexLightbox.findIndex(index => index === key);
        setSlideLightbox(temp + 1);
    };
    const navigation = (routes) => {
        navigate(`/movie-details/${routes.original_title}(${moment(routes.release_date).format('YYYY')})`, {
            state : {
                name : routes.original_title,
                key : routes.id
            }
        });
        navigate(0);
    };

    useEffect(() => {
        if(loading) {
            FetchRedux();
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        setTimeout(() => {
            movie.details_video.map(e => {
                const temp = `https://www.youtube.com/embed/${e.key}`;
                setDataLightbox(data => [...data, temp]);
                setDataIndexLightbox(data => [...data, e.key]);
            });
        }, 1000);
    }, []);

    return (
        loading === true ?
            <>
                <p>Loading</p>
            </>
            :
            <> 
                <Carousel movie={movie} />
                <Companies movie={movie} />
                <Content movie={movie} handleOpen={handleLightBox}
                    handleSlide={handleSlideLightbox} />
                <Cast movie={movie} />
                <Lightbox isOpen={isOpen} data={dataLightbox} 
                    slide={slideLightbox} />
                <Recommendation movie={movie} navigation={navigation} />
            </>
    );
};
export default Movies;
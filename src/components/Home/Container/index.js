import Carousel from '../Carousel';
import NowPlaying from '../NowPlaying';
import Popular from '../Popular';

import { 
    useNavigate,
    // useLocation,
} from 'react-router-dom';
import moment from 'moment';

const Container = () => {
    const navigate = useNavigate();
    const handleFilm = (item) => {
        navigate(`/movie-details/${item.original_title}(${moment(item.release_date).format('YYYY')})`, {
            state : {
                name : item.original_title,
                key : item.id
            }
        });
    };
    return (
        <>
            <Carousel handleFilm={handleFilm} />
            <NowPlaying handleFilm={handleFilm} />
            <Popular handleFilm={handleFilm} />
        </>
    );
};

export default Container;
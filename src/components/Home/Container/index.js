import Carousel from '../Carousel';
import NowPlaying from '../NowPlaying';
import Popular from '../Popular';
import { 
    useNavigate,
    useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';

import AlertDialog from '../AlertDialog';

const Container = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);
    const [alertText, setAlertText] = useState('');

    const handleFilm = (item) => {
        navigate(`/movie-details/${item.original_title}(${moment(item.release_date).format('YYYY')})`, {
            state : {
                name : item.original_title,
                key : item.id
            }
        });
    };

    useEffect(() => {   
        if (location.state) {
            if(location.state.showAlert) {
                setIsOpen(true);
                setAlertText(location.state.text);
            }
        }
    }, []);
    
    return (
        <div>
            <AlertDialog 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                alertText={alertText} />
            <Carousel handleFilm={handleFilm} />
            <NowPlaying handleFilm={handleFilm} />
            <Popular handleFilm={handleFilm} />
        </div>
    );
};

export default Container;
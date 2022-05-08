import {
    GridItem,
    SimpleGrid,
    Container,
    Heading
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from './skeleton';
import { Media } from 'react-breakpoints';
import NotFound from '../../NotFound';

import GenresTitle from '../../../images/popularTitle1.png';

import { GetGenres } from '../../../redux/actions/genres';

import './genres.scss';

const Genres = () => {
    const dispatch = useDispatch();

    const genres = useSelector(state => state.genres);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const FetchRedux = async () => {
        dispatch(GetGenres());
    };

    const handleClick = (routes) => {
        navigate(`/movies/${routes.name}`, {
            state: {
                name: `Genre (${routes.name})`,
                key: routes.id,
                type: 'genre'
            },
        });
    };

    useEffect(() => {
        if(loading) {
            FetchRedux();
            setTimeout(() => {
                setLoading(!loading);
            }, 1000);
        }
    }, []);
    return (
        <Media>
            {
                ({ breakpoints, currentBreakpoint }) => 
                    breakpoints[currentBreakpoint] <= breakpoints.sm ? (
                        loading ? (
                            <Loading />
                        ) : (
                            <Container maxW='container.md'>
                                <div className="genres-title">
                                    <img src={GenresTitle} style={{marginRight: '10px'}} />
                                    <Heading as='h4' size='xl'>
                                        GENRES
                                    </Heading>
                                </div>
                                <SimpleGrid columns={[2, 3, 3, 3, 3]} spacing="30px" 
                                    style={{padding : '50px 20px 50px 20px', textAlign: 'center', justifyContent: 'center'}}>
                                    {
                                        genres.data.map((e) => {
                                            return (
                                                <div className='genres-navigation-item'
                                                    onClick={() => handleClick(e)}
                                                    key={e.id}>
                                                    <GridItem colSpan={1} key={e.id}>
                                                        <h1 className='genres-navigation-text'>{e.name}</h1>
                                                    </GridItem>
                                                </div>
                                            );
                                        })
                                    }
                                </SimpleGrid>
                            </Container>
                        )
                    ) : <NotFound />
            }
        </Media>
    );
};

export default Genres;
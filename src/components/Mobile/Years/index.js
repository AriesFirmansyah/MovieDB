import {
    GridItem,
    SimpleGrid,
    Container,
    Heading
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './skeleton';
import { Media } from 'react-breakpoints';
import NotFound from '../../NotFound';

import YearsTitle from '../../../images/popularTitle1.png';

import './years.scss';

const maxOffset = 20;
const Years = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState([]);

    const handleYear = (routes) => {
        navigate(`/movies/${routes}`, {
            state: {
                name: `Year (${routes})`,
                key: routes,
                type: 'year'
            },
        });
        navigate(0);
    };

    useEffect(() => {
        if(loading) {
            for(let i = 0; i <= maxOffset; i++) {
                const temp = 2022 - i;
                setYear(value => [...value, temp]);
            }
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
                                <div className="years-title">
                                    <img src={YearsTitle} style={{marginRight: '10px'}} />
                                    <Heading as='h4' size='xl'>
                                        YEARS
                                    </Heading>
                                </div>
                                <SimpleGrid columns={[2, 3, 3, 3, 3]} spacing="40px" 
                                    style={{padding : '10px 20px 100px 20px'}}>
                                    {
                                        year.map((e, index) => {
                                            return(
                                                <div className='years-navigation-item'
                                                    onClick={() => handleYear(e)}
                                                    key={index}>
                                                    <GridItem colSpan={1} key={index}>
                                                        <h1 className='years-navigation-text'>{e}</h1>
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

export default Years;
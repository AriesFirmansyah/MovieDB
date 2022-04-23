
import './country.scss';
import { useState, useEffect } from 'react';

// Chakra-UI
import {
    GridItem,
    SimpleGrid,
    InputGroup,
    InputRightElement,
    Input,
    Container,
    Heading
} from '@chakra-ui/react';

import { 
    Search2Icon
} from '@chakra-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GetCountries } from '../../../redux/actions/countries';
import CountryTitle from '../../../images/popularTitle1.png';
import Loading from './skeleton';
import { Media } from 'react-breakpoints';
import NotFound from '../../NotFound';

const Country = () => {
    
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);

    const [filter, setFilter] = useState('');
    const [dataCountries, setDataCountries] = useState('');

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const filterOnChange = (e) => {
        e.preventDefault();
        const temp = e.target.value.toLowerCase();
        if (filter !== '') {
            const results = countries.data.filter((item) => {
                return item.english_name.toLowerCase().includes(temp);
            });
            setDataCountries(results);
        } 
        else {
            setDataCountries(countries.data);
        }
        setFilter(temp);
    };

    const FetchRedux = async () => {
        dispatch(GetCountries);
    };
    const handleCountry = (routes) => {
        navigate(`/movies/${routes.english_name}`, {
            state: {
                name: routes.english_name,
                key: routes.iso_3166_1,
                type: 'country'
            },
        });
    };

    useEffect(() => {
        if(loading) {
            FetchRedux();
            setTimeout(() => {
                setLoading(!loading);
                setDataCountries(countries.data);
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
                                <div className="country-title">
                                    <img src={CountryTitle} style={{marginRight: '10px'}} />
                                    <Heading as='h4' size='xl'>
                                        COUNTRY
                                    </Heading>
                                </div>
                                <div className='country-search'>
                                    <InputGroup style={{maxWidth: '100%'}}>
                                        <InputRightElement
                                            pointerEvents="none">
                                            <Search2Icon color="gray.300" />
                                        </InputRightElement>
                                        <Input type="text" placeholder="Search country..." 
                                            style={{ 
                                                color: 'aliceblue', 
                                                background:'#ffffff10',
                                                border: 'none'
                                            }} 
                                            value={filter}
                                            onChange={(e) => filterOnChange(e)}
                                            className="country-no-focus"
                                        />
                                    </InputGroup>
                                </div>
                                <SimpleGrid columns={[2, 3, 3, 3, 3]} spacing="30px" 
                                    style={{padding : '10px 20px 10px 20px'}}>
                                    {
                                        dataCountries && dataCountries.length > 0 ? (
                                            dataCountries.map((e, index) => {
                                                return(
                                                    <div className='country-item' key={index} 
                                                        onClick={() => handleCountry(e)}>
                                                        <GridItem colSpan={1}>
                                                            <h1 className='country-text'>{e.english_name}</h1>
                                                        </GridItem>
                                                    </div>
                                                );
                                            })
                                        ) 
                                            : 
                                            (
                                                <div className='country-item'>
                                                    <h1 className='country-text'>No results found! </h1>
                                                </div>
                                            )
                                    }
                                </SimpleGrid>
                            </Container>
                        )
                    ) : <NotFound />
            }
        </Media>
    );
};

export default Country;
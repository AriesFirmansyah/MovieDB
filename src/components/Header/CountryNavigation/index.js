// Assets
import Country from './../../../images/country.png';

import './CountryNavigation.css';

import { useState } from 'react';

// Chakra-UI
import {
    Menu,
    MenuButton,
    MenuList,
    Button,
    GridItem,
    SimpleGrid,
    InputGroup,
    InputRightElement,
    Input
} from '@chakra-ui/react';

import { 
    ChevronDownIcon, 
    Search2Icon
} from '@chakra-ui/icons';

import PropTypes from 'prop-types';

const propTypes = {
    countries: PropTypes.object,
    handleCountry: PropTypes.func
};

const CountryNavigation = ({countries, handleCountry}) => {
    const [filter, setFilter] = useState('');
    const [dataCountries, setDataCountries] = useState(countries.data);

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
    return (
        <>
            <GridItem colSpan={2} w="100%" height="80px" className="component hideNav">
                <Menu isLazy>
                    <MenuButton>
                        <Button colorScheme="none" className="no-box" 
                            rightIcon={<ChevronDownIcon style={{fontSize: 30}} />}>
                            <div className="component">
                                <img src={Country} className="component-image" />
                                <p style={{marginLeft: 5, color: 'aliceblue'}}>
                                    Country
                                </p>
                            </div>
                        </Button>
                    </MenuButton>
                    <MenuList 
                        sx={{
                            background: '#00000070',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '15px',
                        }}>
                        <div className='country-navigation-search'>
                            <InputGroup style={{maxWidth: '100%'}}>
                                <InputRightElement
                                    pointerEvents="none">
                                    <Search2Icon color="gray.300" />
                                </InputRightElement>
                                <Input type="tel" placeholder="Search country..." 
                                    style={{ 
                                        color: 'aliceblue', 
                                        background:'#ffffff50',
                                        border: 'none'
                                    }} 
                                    value={filter}
                                    onChange={(e) => filterOnChange(e)}
                                />
                            </InputGroup>
                        </div>
                        <div className='country-navigation-overflow'>
                            <SimpleGrid columns={2} spacing="30px" 
                                style={{padding : '10px 20px 10px 20px'}}>
                                {
                                    dataCountries && dataCountries.length > 0 ? (
                                        dataCountries.map((e, index) => {
                                            return(
                                                <div className='country-navigation-item' key={index} 
                                                    onClick={() => handleCountry(e)}>
                                                    <GridItem colSpan={1}>
                                                        <h1 className='country-navigation-text'>{e.english_name}</h1>
                                                    </GridItem>
                                                </div>
                                            );
                                        })
                                    ) 
                                        : 
                                        (
                                            <div className='country-navigation-item'>
                                                <h1 className='country-navigation-text'>No results found! </h1>
                                            </div>
                                        )
                                }
                            </SimpleGrid>
                        </div>
                    </MenuList>
                </Menu>
            </GridItem>
        </>
    );

};

CountryNavigation.propTypes = propTypes;

export default CountryNavigation;
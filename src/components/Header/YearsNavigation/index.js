// Assets
import Year from './../../../images/year.png';

import './YearsNavigation.css';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Chakra-UI
import {
    Menu,
    MenuButton,
    MenuList,
    Button,
    GridItem,
    SimpleGrid
} from '@chakra-ui/react';

import { 
    ChevronDownIcon, 
} from '@chakra-ui/icons';

import { Media } from 'react-breakpoints';

const maxOffset = 20;
const propTypes = {
    handleYear: PropTypes.func
};

const YearsNavigation = ({handleYear}) => {
    const [year, setYear] = useState([]);

    useEffect(() => {
        for(let i = 0; i <= maxOffset; i++) {
            const temp = 2022 - i;
            setYear(value => [...value, temp]);
        }
    }, []);
    return (
        <Media>
            {
                ({ breakpoints, currentBreakpoint }) => 
                    breakpoints[currentBreakpoint] >= breakpoints.md ? (
                        <GridItem colSpan={2} w="100%" height="80px" className="component hideNav hideNav1">
                            <Menu isLazy>
                                <MenuButton>
                                    <Button colorScheme="none" className="no-box" 
                                        rightIcon={<ChevronDownIcon style={{fontSize: 30, color: 'black'}} />}>
                                        <div className="component">
                                            <img src={Year} className="component-image" />
                                            <p style={{marginLeft: 5, color: 'aliceblue'}}>
                                                Years
                                            </p>
                                        </div>
                                    </Button>
                                </MenuButton>
                                <MenuList 
                                    sx={{
                                        background: '#00000070',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '15px'
                                    }}>
                                    <div className='years-navigation-overflow'>
                                        <SimpleGrid columns={3} spacing="40px" 
                                            style={{padding : '10px 20px 10px 20px'}}>
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
                                    </div>
                                </MenuList>
                            </Menu>
                        </GridItem>
                    ) : null
            }
        </Media>
    );
};

YearsNavigation.propTypes = propTypes;

export default YearsNavigation;
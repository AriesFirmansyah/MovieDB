import './genres.css';

// Assets
import Genre from './../../../images/genre.png';


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

import PropTypes from 'prop-types';

import { Media } from 'react-breakpoints';

const propTypes = {
    genres: PropTypes.object,
    handleGenre: PropTypes.func
};

const GenresNavigation = ({genres, handleGenre}) => {
    // console.log(genres);
    return (
        <Media>
            {
                ({ breakpoints, currentBreakpoint }) => 
                    breakpoints[currentBreakpoint] !== breakpoints.mobile ? (
                        <GridItem colSpan={2} w="100%" height="80px" className="component">
                            <Menu isLazy>
                                <MenuButton>
                                    <Button colorScheme="none" className="no-box" 
                                        rightIcon={<ChevronDownIcon style={{fontSize: 30}} />}>
                                        <div className="component">
                                            <img src={Genre} className="component-image" />
                                            <p style={{marginLeft: 5, color: 'aliceblue'}}>
                                                Genres
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
                                    <SimpleGrid columns={3} spacing="30px" 
                                        style={{padding : '10px 20px 10px 20px'}}>
                                        {
                                            genres.data.map((e) => {
                                                return (
                                                    <div className='genres-navigation-item'
                                                        onClick={() => handleGenre(e)}
                                                        key={e.id}>
                                                        <GridItem colSpan={1} key={e.id}>
                                                            <h1 className='genres-navigation-text'>{e.name}</h1>
                                                        </GridItem>
                                                    </div>
                                                );
                                            })
                                        }
                                    </SimpleGrid>
                                </MenuList>
                            </Menu>
                        </GridItem>
                    ) : null
            }
        </Media>
    );
};


GenresNavigation.propTypes = propTypes;

export default GenresNavigation;
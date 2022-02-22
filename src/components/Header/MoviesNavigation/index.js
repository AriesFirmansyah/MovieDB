// Assets
import Movies from './../../../images/movies.png';

import './MoviesNavigation.css';


// Chakra-UI
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Image,
    GridItem,
    SimpleGrid
  } from "@chakra-ui/react";

import { 
    ChevronDownIcon, 
} from '@chakra-ui/icons';

const MoviesNavigation = ({handleMovie}) => {
    return (
        <>
            <GridItem colSpan={2} w="100%" height="80px" className="component hideNav">
                <Menu isLazy>
                    <MenuButton>
                        <Button colorScheme="none" className="no-box" 
                            rightIcon={<ChevronDownIcon style={{fontSize: 30}} />}>
                            <div className="component">
                                <img src={Movies} className="component-image" />
                                <p style={{marginLeft: 5, color: 'aliceblue'}}>
                                    Movies
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
                        <SimpleGrid columns={1} spacing="20px" 
                            style={{padding : '10px 20px 10px 20px'}}>
                            <div className='movies-navigation-item'
                                onClick={() => handleMovie('movies')}>
                                <GridItem colSpan={1}>
                                    <h1 className='movies-navigation-text'>All Movies</h1>
                                </GridItem>
                            </div>
                            <div className='movies-navigation-item'
                                onClick={() => handleMovie('trending')}>
                                <GridItem colSpan={1}>
                                    <h1 className='movies-navigation-text'>Trending</h1>
                                </GridItem>
                            </div>
                            <div className='movies-navigation-item'
                                onClick={() => handleMovie('now-playing')}>
                                <GridItem colSpan={1}>
                                    <h1 className='movies-navigation-text'>Now Playing</h1>
                                </GridItem>
                            </div>
                            <div className='movies-navigation-item'
                                onClick={() => handleMovie('popular')}>
                                <GridItem colSpan={1}>
                                    <h1 className='movies-navigation-text'>Popular</h1>
                                </GridItem>
                            </div>
                        </SimpleGrid>
                    </MenuList>
                </Menu>
            </GridItem>
        </>
    )
}

export default MoviesNavigation;
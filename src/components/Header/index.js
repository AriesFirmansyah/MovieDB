// CSS
import './header.css';

// React
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';


// Assets
import Country from './../../images/country.png';
import Year from './../../images/year.png';
import Genre from './../../images/genre.png';
import Movies from './../../images/movies.png';
import Logo from './../../images/logo.png';

// Chakra-UI
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    SimpleGrid,
    GridItem
  } from "@chakra-ui/react";

import { 
    ChevronDownIcon, 
    HamburgerIcon, 
    AddIcon,
    ExternalLinkIcon,
    RepeatIcon,
    EditIcon,
    Search2Icon
} from '@chakra-ui/icons'

import { useColorMode } from '@chakra-ui/color-mode'
import { FaSun, FaMoon } from 'react-icons/fa'

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GetGenres } from '../../redux/actions/genres';


const Nav = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark";

    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);

    const [loading, setLoading] = useState(true);

    const FetchRedux = async () => {
        dispatch(GetGenres());
    }
    console.log(genres);
    useEffect(() => {
        if(loading){
            FetchRedux();
            setTimeout(() => {
                setLoading(!loading);
            }, 100);
        }
    }, []);

    return (
        <div style={{width: '100%'}}>
            <SimpleGrid columns={[3, 8, 12, 16]} spacing="40px" className="cont1">
                <GridItem colSpan={4} w="100%" height="80px" >
                    <Link to="/" className="component">
                        <img src={Logo} className="logo" />
                        <h1 className="logo-text">
                            RISDEV
                        </h1>
                    </Link>
                </GridItem>
                <GridItem colSpan={2} w="100%" height="80px" className="component hideNav">
                    {/* <Link 
                    to={`/movies/1-s`} > */}
                        <img src={Movies} className="component-image" />
                        <p style={{marginLeft: 5, color: 'aliceblue'}}>
                            Movies
                        </p>
                    {/* </Link> */}
                </GridItem>
                <GridItem colSpan={2} w="100%" height="80px" className="component hideNav">
                    <Menu isLazy>
                        <MenuButton>
                            <Button colorScheme="none" className="no-box" 
                                rightIcon={<ChevronDownIcon style={{fontSize: 30}} />}>
                                <div className="component">
                                    <img src={Genre} className="component-image" />
                                    <p style={{marginLeft: 5, color: 'aliceblue'}}>
                                        Genre
                                    </p>
                                </div>
                            </Button>
                        </MenuButton>
                        <MenuList>
                            <MenuItem minH="48px">
                                <Image
                                    boxSize="2rem"
                                    borderRadius="full"
                                    src="https://placekitten.com/100/100"
                                    alt="Fluffybuns the destroyer"
                                    mr="12px"
                                />
                                <span>Fluffybuns the Destroyer</span>
                            </MenuItem>
                            <MenuItem minH="40px">
                            <Image
                                boxSize="2rem"
                                borderRadius="full"
                                src="https://placekitten.com/120/120"
                                alt="Simon the pensive"
                                mr="12px"
                            />
                            <span>Simon the pensive</span>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </GridItem>
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
                        <MenuList>
                            <MenuItem minH="48px">
                                <Image
                                    boxSize="2rem"
                                    borderRadius="full"
                                    src="https://placekitten.com/100/100"
                                    alt="Fluffybuns the destroyer"
                                    mr="12px"
                                />
                                <span>Fluffybuns the Destroyer</span>
                            </MenuItem>
                            <MenuItem minH="40px">
                            <Image
                                boxSize="2rem"
                                borderRadius="full"
                                src="https://placekitten.com/120/120"
                                alt="Simon the pensive"
                                mr="12px"
                            />
                            <span>Simon the pensive</span>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </GridItem>
                <GridItem colSpan={2} w="100%" height="80px" className="component hideNav hideNav1">
                    <Menu isLazy>
                        <MenuButton>
                            <Button colorScheme="none" className="no-box" 
                                rightIcon={<ChevronDownIcon style={{fontSize: 30}} />}>
                                <div className="component">
                                    <img src={Year} className="component-image" />
                                    <p style={{marginLeft: 5, color: 'aliceblue'}}>
                                        Year
                                    </p>
                                </div>
                            </Button>
                        </MenuButton>
                        <MenuList>
                            <MenuItem minH="48px">
                                <Image
                                    boxSize="2rem"
                                    borderRadius="full"
                                    src="https://placekitten.com/100/100"
                                    alt="Fluffybuns the destroyer"
                                    mr="12px"
                                />
                                <span>Fluffybuns the Destroyer</span>
                            </MenuItem>
                            <MenuItem minH="40px">
                            <Image
                                boxSize="2rem"
                                borderRadius="full"
                                src="https://placekitten.com/120/120"
                                alt="Simon the pensive"
                                mr="12px"
                            />
                            <span>Simon the pensive</span>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </GridItem>
                <GridItem colSpan={{base : 4, md: 12, lg: 4, xl : 4 }} w="100%" height="80px" className="component">
                    <InputGroup style={{width: 4300}}>
                        <InputRightElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}/>
                        <Input type="tel" placeholder="Search..." 
                        style={{ color: 'aliceblue', backgroundColor:'rgba(255, 255, 255, 0.2)'}} />
                    </InputGroup>
                    <IconButton icon={isDark ? <FaSun /> : <FaMoon />}
                    onClick={toggleColorMode}
                    style={{backgroundColor: '', marginRight: 10, marginLeft: 10}} />
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HamburgerIcon />}
                            variant="outline"
                        />
                        <MenuList>
                            <MenuItem icon={<AddIcon />} command="⌘T">
                            New Tab
                            </MenuItem>
                            <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
                            New Window
                            </MenuItem>
                            <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
                            Open Closed Tab
                            </MenuItem>
                            <MenuItem icon={<EditIcon />} command="⌘O">
                            Open File...
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </GridItem>
            </SimpleGrid>
        </div>
    )
}

export default Nav;
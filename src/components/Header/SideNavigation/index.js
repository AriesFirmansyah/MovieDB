import  './SideNavigation.css';

// Chakra-UI
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    GridItem,
    SimpleGrid,
    Button
  } from "@chakra-ui/react";

import { 
    HamburgerIcon, 
    AddIcon,
    ExternalLinkIcon,
    RepeatIcon,
    EditIcon,
    Search2Icon,
} from '@chakra-ui/icons';
import { FaSun, FaMoon } from 'react-icons/fa'
import moment from 'moment';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetSearch } from '../../../redux/actions/search';

const poster_BaseURL = "https://image.tmdb.org/t/p/original";

const SideNavigation = ({isDark, toggleColorMode, handleSearch}) => {
    const [dataResults, setDataResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const dispatch = useDispatch();
    const search = useSelector(state => state.search)

    const FetchRedux = async (query) => {
        dispatch(GetSearch(query));
    }

    const handleChange = (e) => {
        e.preventDefault();
        setLoading(true);
        const temp = e.target.value.toLowerCase();
        if (temp !== '') {
            FetchRedux(temp);
            setTimeout(() => {
                const results = search.data.results.filter((item) => {
                    return item.title.toLowerCase().includes(temp);
                });
                setDataResults(results);
                setLoading(false);
            }, 300)
        } 
        else {
            setDataResults([]);
            setLoading(false);
        }
        setSearchInput(temp);
    }
    const handleFocus = (isBlur, routes) => {
        if(!isBlur) {
            handleSearch(routes);
            setTimeout(() => {
                setIsFocus(false);
            }, 100)
        } else {
            setTimeout(() => {
                setIsFocus(false);
            }, 100)
        }
        
    }
    return (
        <GridItem colSpan={{base : 4, md: 12, lg: 4, xl : 4 }} w="100%" height="80px" className="component">
            {
                searchInput !== '' && isFocus ? (
                    <div className='side-navigation-input-cont'>
                        <InputGroup>
                            <InputRightElement
                            pointerEvents="none"
                            children={
                                <Button isLoading={loading} 
                                    spinnerPlacement='end'
                                    sx={{
                                        width: '100%',
                                        background: 'transparent',
                                        justifyContent: 'right'
                                        }}
                                    className="no-shadow"
                                        >
                                    <Search2Icon color="gray.300" />
                                </Button>
                            }/>
                            <Input type="tel" placeholder="Search..." 
                                style={{ 
                                    color: 'aliceblue', 
                                    border: 'none',
                                }}
                                value={searchInput} 
                                onChange={(e) => handleChange(e)}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => handleFocus(true)}
                                className='no-shadow' />
                        </InputGroup>
                        <div className='side-navigation-result'>
                            {
                                dataResults && dataResults.map (e => {
                                    return (
                                        e.poster_path && (

                                            <SimpleGrid columns={12} spacing="30px" 
                                                style={{padding : '10px 20px 10px 20px'}}>
                                                <GridItem colSpan={{base : 1, sm: 1, md: 2, lg: 2, xl : 2 }} >
                                                    <img src={`${poster_BaseURL}${e.poster_path}`} 
                                                        className='side-navigation-result-image' 
                                                        onClick={() => handleFocus(false, e)} />
                                                </GridItem>
                                                <GridItem colSpan={{base : 11, sm: 11, md: 10, lg: 10, xl : 10 }}>
                                                    <h1 className='side-navigation-results-text'
                                                        onClick={() => handleSearch(e)}>
                                                        {e.title} ({moment(e.release_date).format('YYYY')})
                                                    </h1>
                                                    <h1 className='side-navigation-results-rating'>
                                                        ⭐{e.vote_average.toFixed(1)}
                                                    </h1>
                                                </GridItem>
                                            </SimpleGrid>
                                        )
                                        
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : (
                    <div className='side-navigation-input-cont-empty'>
                        <InputGroup>
                            <InputRightElement
                            pointerEvents="none"
                            children={
                                <Button isLoading={loading} 
                                    spinnerPlacement='end'
                                    sx={{
                                        width: '100%',
                                        background: 'transparent',
                                        justifyContent: 'right'
                                        }}
                                    className="no-shadow">
                                    <Search2Icon color="gray.300" />
                                </Button>
                            }/>
                            <Input type="tel" placeholder="Search..." 
                                style={{ 
                                    color: 'aliceblue', 
                                    border: 'none',
                                    borderRadius: '20px'
                                }}
                                value={searchInput} 
                                onChange={(e) => handleChange(e)}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => handleFocus(true)}
                                className='no-shadow' />
                        </InputGroup>
                    </div>
                )
            }
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
    )
}

export default SideNavigation;

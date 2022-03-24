import {
    SimpleGrid,
    Skeleton,
    GridItem,
    
} from '@chakra-ui/react';


import { Media } from 'react-breakpoints';

const Loading = () => {
    return (
        <SimpleGrid columns={[4, 12, 12, 12, 16]} spacing="40px" className="cont1"
            sx={{padding: '30px'}}>
            <GridItem colSpan={{base : 4, sm: 12, md: 4, lg: 4, xl : 4 }} 
                w="100%" height="50px" >
                <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
            </GridItem>
            <Media>
                {
                    ({ breakpoints, currentBreakpoint }) => 
                        breakpoints[currentBreakpoint] >= breakpoints.md ? (
                            <>
                                <GridItem colSpan={2} w="100%" height="50px">
                                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                                </GridItem>
                                <GridItem colSpan={2} w="100%" height="50px">
                                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                                </GridItem>
                                <GridItem colSpan={2} w="100%" height="50px">
                                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                                </GridItem>
                                <GridItem colSpan={2} w="100%" height="50px">
                                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                                </GridItem>
                            </>
                        ) : null
                }
            </Media>
            <GridItem colSpan={{base : 4, sm: 12, md: 12, lg: 12, xl : 4 }} w="100%" height="50px">
                <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
            </GridItem>
        </SimpleGrid>
    );
};

export default Loading;
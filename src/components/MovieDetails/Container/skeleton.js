import { 
    Skeleton
} from '@chakra-ui/react';

import { 
    SimpleGrid, 
    GridItem,
    Container
} from '@chakra-ui/react';

import { Media } from 'react-breakpoints';

const Loading = () => {
    return (   
        <>
            <SimpleGrid columns={1} spacing="40px">
                <GridItem colSpan={1} w="100%" height="400px" sx={{textAlign: 'center'}}>
                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                </GridItem>
                <GridItem colSpan={1}>
                    <Skeleton 
                        sx={{
                            borderRadius: '13px', 
                            height: '70px', 
                            width: '300px',
                            margin: 'auto',
                            marginTop: '25px'
                        }} 
                    />
                </GridItem>
            </SimpleGrid>
            <Container maxW='container.xl' sx={{marginTop: '110px'}}>
                <SimpleGrid 
                    columns={[8, 8, 8, 8, 8]} 
                    row={[1, 1, 5, 5, 5]} 
                    spacing={{base: '10px', sm: '10px', md: '20px', lg: '40px', xl : '40px' }} 
                    sx={{padding: '0px 30px 40px 30px'}}
                    height="800px">
                    <GridItem 
                        rowSpan={{base : 1, sm: 1, md: 5, lg: 5, xl : 5 }}
                        colSpan={{base : 8, sm: 8, md: 5, lg: 5, xl : 5 }}>
                        <Skeleton 
                            sx={{
                                width: '100%', 
                                height: '100%', 
                                borderRadius: '15px',
                                padding: '20px 30px 0px 30px'
                            }} 
                        />
                    </GridItem>
                    <GridItem 
                        rowSpan={{base : 1, sm: 1, md: 3, lg: 3, xl : 3 }} 
                        colSpan={{base : 8, sm: 5, md: 3, lg: 3, xl : 3 }}>
                        <Skeleton 
                            sx={{
                                width: '100%', 
                                height: '100%', 
                                borderRadius: '15px',
                                padding: '20px 20px 20px 30px',
                            }} 
                        />
                    </GridItem>
                    <GridItem 
                        rowSpan={{base : 1, sm: 1, md: 1, lg: 1, xl : 1 }} 
                        colSpan={{base : 8, sm: 3, md: 3, lg: 3, xl : 3 }}>
                        <Skeleton 
                            sx={{
                                width: '100%', 
                                height: '100%', 
                                borderRadius: '15px',
                                padding: '20px 20px 20px 30px',
                            }} 
                        />
                    </GridItem>
                    <GridItem 
                        rowSpan={{base : 1, sm: 1, md: 1, lg: 1, xl : 1 }} 
                        colSpan={{base : 8, sm: 8, md: 3, lg: 3, xl : 3 }} >
                        <Skeleton 
                            sx={{
                                width: '100%', 
                                height: '100%', 
                                borderRadius: '15px',
                                padding: '20px 20px 20px 30px',
                            }} 
                        />
                    </GridItem>
                </SimpleGrid>
                <Skeleton sx={{
                    width: '130px', 
                    height: '60px', 
                    borderRadius: '10px', 
                    marginLeft: '30px',
                    marginTop: '20px'}} />
            </Container>
            <SimpleGrid 
                columns={[1, 2, 4, 4, 4]} 
                spacing={{base: '40px', sm: '40px', md: '40px', lg: '40px', xl : '40px' }}
                sx={{padding: '60px'}}>
                <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                </GridItem>
                <Media>
                    {
                        ({ breakpoints, currentBreakpoint }) => 
                            breakpoints[currentBreakpoint] >= breakpoints.md ? (
                                <>
                                    <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                                        <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                                    </GridItem>
                                    <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                                        <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                                    </GridItem>
                                </>
                            ) : null
                    }
                </Media>
                <Media>
                    {
                        ({ breakpoints, currentBreakpoint }) => 
                            breakpoints[currentBreakpoint] >= breakpoints.sm ? (
                                <>
                                    <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                                        <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                                    </GridItem>
                                </>
                            ) : null
                    }
                </Media>
            </SimpleGrid>
            <Container maxW='container.xl' sx={{marginTop: '10px'}}>
                <Skeleton sx={{
                    width: '130px', 
                    height: '60px', 
                    borderRadius: '10px', 
                    marginLeft: '30px',
                    marginTop: '20px'}} />
            </Container>
            <SimpleGrid 
                columns={[1, 2, 4, 4, 4]} 
                spacing={{base: '40px', sm: '40px', md: '40px', lg: '40px', xl : '40px' }}
                sx={{padding: '60px'}}>
                <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                </GridItem>
                <Media>
                    {
                        ({ breakpoints, currentBreakpoint }) => 
                            breakpoints[currentBreakpoint] >= breakpoints.md ? (
                                <>
                                    <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                                        <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                                    </GridItem>
                                    <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                                        <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                                    </GridItem>
                                </>
                            ) : null
                    }
                </Media>
                <Media>
                    {
                        ({ breakpoints, currentBreakpoint }) => 
                            breakpoints[currentBreakpoint] >= breakpoints.sm ? (
                                <>
                                    <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                                        <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                                    </GridItem>
                                </>
                            ) : null
                    }
                </Media>
            </SimpleGrid>
        </>
    );
};

export default Loading;
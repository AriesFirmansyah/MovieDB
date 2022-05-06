import {
    SimpleGrid,
    Skeleton,
    GridItem,
    
} from '@chakra-ui/react';

const Loading = () => {
    return (
        <>  
            <div style={{padding: '30px', marginTop: '20px'}}>
                <Skeleton sx={{width: '200px', height: '50px', borderRadius: '10px'}} />                
            </div>
            <SimpleGrid 
                columns={[2, 4, 4, 4, 6]} 
                spacing={{base: '40px', sm: '40px', md: '40px', lg: '40px', xl : '40px' }}
                sx={{padding: '0px 30px 30px 30px'}}>
                <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                </GridItem>
                <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                </GridItem>
                <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                </GridItem>
                <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                </GridItem>
                <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                </GridItem>
                <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                </GridItem>
                <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                </GridItem>
                <GridItem colSpan={1} w="100%" height="250px" sx={{textAlign: 'center'}}>
                    <Skeleton sx={{width: '100%', height: '100%', borderRadius: '10px'}} />
                </GridItem>
            </SimpleGrid>
        </>
    );
};

export default Loading;
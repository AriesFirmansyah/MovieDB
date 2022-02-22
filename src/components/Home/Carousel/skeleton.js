import { 
    Skeleton
} from '@chakra-ui/react';

import { 
    SimpleGrid, 
    GridItem,
} from '@chakra-ui/react';


const Loading = () => {
    return (
        <>

            <Skeleton sx={{borderRadius: '13px', height: '400px', marginTop: '30px'}} />
        
            <SimpleGrid columns={4} 
                spacing={{base: "10px", md: "40px", lg: "40px", xl : "40px" }} 
                sx={{marginTop: '30px'}}>
                <GridItem colSpan={1}>
                    <Skeleton sx={{borderRadius: '13px', height: '60px'}} />
                </GridItem>
                <GridItem colSpan={1}>
                    <Skeleton sx={{borderRadius: '13px', height: '60px'}} />
                </GridItem>
                <GridItem colSpan={1}>
                    <Skeleton sx={{borderRadius: '13px', height: '60px'}} />
                </GridItem>
                <GridItem colSpan={1}>
                    <Skeleton sx={{borderRadius: '13px', height: '60px'}} />
                </GridItem>
            </SimpleGrid>
        </>
    );
}

export default Loading;
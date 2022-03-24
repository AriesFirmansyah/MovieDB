import { 
    Skeleton,
    SimpleGrid,
    Container,
    GridItem
} from '@chakra-ui/react';

const Loading = () => {
    return (
        <>
            <Container maxW='container.md'>
                <Skeleton 
                    sx={{
                        borderRadius: '10px', 
                        width: '150px', 
                        height: '50px',
                        marginTop: '50px'
                    }} 
                />

                <SimpleGrid columns={[2, 3, 3, 3, 3]} spacing="30px" 
                    style={{padding : '40px 20px 150px 20px'}}>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Skeleton sx={{ borderRadius: '10px', width: '100%', height: '40px'}} />
                    </GridItem>
                </SimpleGrid>
            </Container>
        </>
    );
};

export default Loading;
import './notfound.scss';

import {
    GridItem,
    SimpleGrid,
    Container,
} from '@chakra-ui/react';

import ErrorImage from '../../images/error/errorpage.png';

const NotFound = () => {
    return (
        <div style={{padding: '30px 0px 30px 0px'}}>
            <Container maxW='container.md'>
                <div className='notfound-container'>
                    <div className='notfound-error'>
                        <SimpleGrid columns={[1, 1, 2, 2, 2]} spacing="30px" 
                            style={{padding : '200px 20px 150px 20px'}}>
                            <GridItem colSpan={1} style={{textAlign: 'center'}}>
                                <img src={ErrorImage} />
                            </GridItem>
                            <GridItem colSpan={1}>
                                <div className='notfound-text'>
                                    <h1>WHOOPS!</h1>
                                    <h2>
                                        Congratulations! Your journey has failed. 
                                        You went to the wrong site, please click {' '} 
                                        <span>
                                            <a href="/">
                                                {'here'}
                                            </a>
                                        </span> {' '}
                                        to start your journey.
                                    </h2>
                                </div>
                            </GridItem>
                        </SimpleGrid>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default NotFound;
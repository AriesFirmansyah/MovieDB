// CSS
import './footer.css';

// Chakra-UI
import { 
    SimpleGrid, 
    GridItem,
    Divider
} from '@chakra-ui/react';

// Assets
import Logo from './../../images/logo.png';


const Footer = () => {
    return (
        <>  
            <Divider/>
            <div className='footerContainer'>
                <SimpleGrid columns={[1, 1, 3, 3, 3]} 
                    spacing={{base: '10px',sm: '10px', md: '10px', lg: '10px', xl : '10px' }} >
                    <GridItem colSpan={1}>
                        <div style={{display: 'flex'}}>
                            <img src={Logo} className="logoFooter" />
                            <h1 className="logo-textFooter">
                                RISDEV
                            </h1>
                        </div>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <h2 className='footerDescription color-footer1'> 
                            RISDEV merupakan sebuah website yang menampilkan 
                            sebuah film dari berbagai negara. Website ini 
                            memudahkan para pengguna melihat daftar film 
                            yang tersedia pada website ini dan juga dapat 
                            memasukkan film yang disukainya ke list favorite 
                            jika sudah melakukan login.
                        </h2>

                        <h2 className='color-footer1'>
                            Copyright © 2021 by RISDEV. All Rights Reserved
                        </h2>
                    </GridItem>
                </SimpleGrid>
            </div>
        </>
    );
};

export default Footer;
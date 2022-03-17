import NumberFormat from 'react-number-format';
import moment from 'moment';
import './content.css';


import Videos from '../Videos';
import Photos from '../Photos';

import { 
    SimpleGrid, 
    GridItem,
    Container,
    Tooltip,
    Tag,
    CircularProgress,
    CircularProgressLabel
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';

import Title1 from './../../../images/popularTitle1.png';

const propTypes = {
    movie: PropTypes.object,
    handleOpen: PropTypes.func,
    handleSlide: PropTypes.func,
};

const Content = ({movie, handleOpen, handleSlide}) => {
    // console.log(movie);
    let writer = 0;
    let review = 0;

  
    return (
        <>
            <div className="content-container">
                <Container maxW='container.xl'>
                    <SimpleGrid 
                        columns={[8, 8, 8, 8, 8]} 
                        row={[1, 1, 5, 5, 5]} 
                        spacing={{base: '10px', sm: '10px', md: '20px', lg: '40px', xl : '40px' }} 
                        sx={{
                            padding: '0px 30px 40px 30px',}}>
                        <GridItem 
                            rowSpan={{base : 1, sm: 1, md: 5, lg: 5, xl : 5 }}
                            colSpan={{base : 8, sm: 8, md: 5, lg: 5, xl : 5 }} 
                            style={{background: '#1D3540', padding: '20px 30px 0px 30px',
                                borderRadius: '15px'}}>
                            <h1 style={{fontWeight: '700', fontSize: '25px', paddingBottom: '30px'}}>
                                Description
                            </h1>
                            <p style={{textAlign: 'justify', paddingBottom: '40px'}}>
                                {movie.details.overview}
                            </p>

                            <h1 style={{fontWeight: '700'}}>
                                Director : &nbsp;
                                {
                                    movie.details_credit.crew.map((e) => {
                                        if(e.job === 'Director') {
                                            return e.original_name;
                                        }
                                    }) 
                                }
                            </h1>
                            <h1 style={{fontWeight: '700'}}>
                                Writers : &nbsp;
                                {
                                    movie.details_credit.crew.map((e) => {
                                        if(e.job === 'Writer') {
                                            if(writer === 0) {
                                                writer++;
                                                return e.original_name;
                                            } else {
                                                return ', ' + e.original_name;
                                            }
                                            
                                        }
                                    })       
                                    
                                }    
                            </h1>
                            <h1>
                                <span style={{fontWeight: '700'}}>Tagline : </span> 
                                <span><i>{movie.details.tagline}</i></span>
                            </h1>
                            <div>
                                <div className="headingTitle1">
                                    <img src={Title1} style={{marginRight: '10px'}} />
                                    <h1>Videos</h1>
                                </div>
                                <Videos data={movie.details_video} handleOpen={handleOpen}
                                    handleSlide={handleSlide} />
                            </div>
                            
                            <div>
                                <div className="headingTitle1">
                                    <img src={Title1} style={{marginRight: '10px'}} />
                                    <h1>Photos</h1>
                                </div>
                                <Photos data={movie.details_image} />
                            </div>
                        </GridItem>
                        <GridItem 
                            rowSpan={{base : 1, sm: 1, md: 3, lg: 3, xl : 3 }} 
                            colSpan={{base : 8, sm: 5, md: 3, lg: 3, xl : 3 }} 
                            style={{background: '#1D3540', padding: '20px 20px 20px 30px',
                                borderRadius: '15px'}}>
                            <h1 style={{fontSize: '25px'}}><b>Reviews</b></h1><br></br>
                            {
                                movie.details_review.length === 0 && (
                                    <p><i>{"There's no review."}</i></p>
                                )
                            }
                            {   
                                movie.details_review.map((data, index) => {
                                    // if(data.author_details.rating != null) {
                                    if(review === 0){
                                        review++;
                                        return (
                                            <>  
                                                <div style={{display: 'flex'}} key={index}>
                                                    {
                                                        data.author_details.rating != null ? (
                                                            <CircularProgress value={data.author_details.rating * 10}
                                                                color='orange.400' size='60px'>
                                                                <CircularProgressLabel>
                                                                    {data.author_details.rating}.0
                                                                </CircularProgressLabel>
                                                            </CircularProgress>
                                                        ) 
                                                            :
                                                            (
                                                                <CircularProgress value={100}
                                                                    color='orange.400' size='60px'>
                                                                    <CircularProgressLabel>
                                                                        0/0
                                                                    </CircularProgressLabel>
                                                                </CircularProgress>
                                                            )
                                                    }
                                                        
                                                    <h1 
                                                        style={{textTransform: 'capitalize',
                                                            padding: '15px'}}>
                                                        <b><i>{data.author}</i></b>
                                                    </h1>
                                                </div>
                                                <br></br>
                                                <div className="content-review-text">
                                                    <p style={{fontSize: '14px', textAlign: 'justify'}}>
                                                        <i>{'"'}{data.content}{'"'}</i>
                                                    </p>
                                                </div>
                                                <br></br>
                                                <h2 style={{textAlign: 'right',
                                                    paddingRight: '20px'}}>
                                                    <b><i>{moment(data.created_at).format('LL')}.</i></b>
                                                </h2>
                                            </>
                                        );
                                    }
                                    // }
                                })
                            }

                        </GridItem>
                        <GridItem 
                            rowSpan={{base : 1, sm: 1, md: 1, lg: 1, xl : 1 }} 
                            colSpan={{base : 8, sm: 3, md: 3, lg: 3, xl : 3 }} 
                            style={{background: '#1D3540', padding: '20px 20px 20px 30px',
                                borderRadius: '15px'}}>
                            <div>
                                <h1><b>Original Language</b></h1>
                                <h1>
                                    <i>
                                        {
                                            movie.details.spoken_languages.length != 0 ? (
                                                movie.details.spoken_languages[0].name
                                            ) : 
                                                (
                                                    "-"
                                                )
                                        }
                                    </i>
                                </h1> <br></br>

                                <h1><b>Budget</b></h1>
                                {
                                    movie.details.budget !== 0 ? (
                                        <h1>
                                            <NumberFormat
                                                value={movie.details.budget}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                renderText={value => <span><i>{value}</i></span>} />
                                        </h1>
                                    ) :
                                        (
                                            <h1>-</h1>
                                        )
                                }
                                
                                <br></br>

                                <h1><b>Revenue</b></h1>
                                {
                                    movie.details.revenue !== 0 ? ( 
                                        <h1>
                                            <NumberFormat
                                                value={movie.details.revenue}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                renderText={value => <span><i>{value}</i></span>} />
                                        </h1> 
                                    ) : 
                                        (
                                            <h1>-</h1>
                                        )
                                }
                                
                                <br></br>

                                <h1><b>Status</b></h1> 
                                <h1><i>{movie.details.status}</i></h1> <br></br>
                            </div>
                           
                            <div style={{display: 'flex'}}>
                                <div style={{marginRight: '10px'}}> 
                                    <Tooltip label="instagram" fontSize='md'>
                                        <a href={`https://www.instagram.com/${movie.details_social_media.instagram_id}`}
                                            target="_blank" rel="noreferrer">
                                            <BsInstagram style={{fontSize: '30px'}} /> 
                                        </a>
                                    </Tooltip>
                                </div>
                                <div style={{marginRight: '10px'}}> 
                                    <Tooltip label="facebook" fontSize='md'>
                                        <a href={`https://www.facebook.com/${movie.details_social_media.facebook_id}`}
                                            target="_blank" rel="noreferrer">
                                            <BsFacebook style={{fontSize: '30px'}} /> 
                                        </a>
                                    </Tooltip>
                                </div>
                                <div> 
                                    <Tooltip label="twitter" fontSize='md'>
                                        <a href={`https://www.twitter.com/${movie.details_social_media.twitter_id}`}
                                            target="_blank" rel="noreferrer">
                                            <BsTwitter style={{fontSize: '30px'}} /> 
                                        </a>
                                    </Tooltip>
                                </div>
                            </div>
                        </GridItem>
                        <GridItem 
                            rowSpan={{base : 1, sm: 1, md: 1, lg: 1, xl : 1 }} 
                            colSpan={{base : 8, sm: 8, md: 3, lg: 3, xl : 3 }} 
                            style={{background: '#1D3540', padding: '20px 20px 20px 30px',
                                borderRadius: '15px'}}>
                            <h1><b>Keywords</b></h1>
                            {
                                movie.details_keyword.keywords.map((data, index) => {
                                    return (
                                        <Tag sx={{margin: '5px 5px 5px 0px'}} key={index}>
                                            {data.name}
                                        </Tag>
                                    );
                                })
                            }
                        </GridItem>
                    </SimpleGrid>
                </Container>
            </div>
        </>
    );
};

Content.propTypes = propTypes;

export default Content;
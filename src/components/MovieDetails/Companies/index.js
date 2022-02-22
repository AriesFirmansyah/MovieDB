import Slider from "react-slick";

import './companies.css';

const photo_BaseURL = "https://image.tmdb.org/t/p/original";

const Companies = ({movie}) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    // console.log(movie.details.production_companies);
    
    return (
        <>
            <div className="companies-container">
                {/* <p>tes</p> */}

                <Slider {...settings}>
                    {
                        movie.details.production_companies && 
                        movie.details.production_companies.map(e => {
                            if(e.logo_path != null) {
                                return (
                                    <div className="companies-item">
                                        <div className="companies-image-container">
                                            <img src={`${photo_BaseURL}${e.logo_path}`} 
                                            className="companies-image" />
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </Slider>
            </div>
        </>
    )
}

export default Companies;

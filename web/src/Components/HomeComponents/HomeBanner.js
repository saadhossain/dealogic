import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Banner1 from '../../assests/banners/20Off-Banner.jpg';
import Banner2 from '../../assests/banners/Computer-Accessories.jpg'
import Banner3 from '../../assests/banners/Computer-Gadgets.jpg'
import './HomeBanner.css'

const HomeBanner = () => {
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true
    };
    return (
        <div>
            <Slider {...settings}>
                <div><img src={Banner1} alt='Home Banner' className='w-full'/></div>
                <div><img src={Banner2} alt='Home Banner' className='w-full'/></div>
                <div><img src={Banner3} alt='Home Banner' className='w-full'/></div>
            </Slider>
        </div>
    );
};

export default HomeBanner;
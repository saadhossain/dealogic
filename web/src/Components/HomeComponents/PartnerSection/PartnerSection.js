import React from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import Slider from 'react-slick';
import asrock from '../../../assests/partners/asrock-logo.png';
import asus from '../../../assests/partners/asus-logo.png';
import corsair from '../../../assests/partners/corsair-logo.png';
import gigabyte from '../../../assests/partners/gigabyte-logo.png';
import hp from '../../../assests/partners/hp-logo.png';
import msi from '../../../assests/partners/msi-logo.png';
import ryzen from '../../../assests/partners/ryzen-logo.png';

const PartnerSection = () => {
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 7,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-5 mb-10'>
            <div className='relative'>
                <h1 className='text-2xl lg:text-4xl font-bold text-dealogic mb-10'>Our Partners</h1>
                <div className='border-2 border-dealogic w-20 absolute top-8 left-36 lg:left-56'></div>
            </div>
            {/* Partners Carousel */}
            <div data-aos='zoom-in'>
                <Slider {...settings}>
                    <img src={ryzen} alt='' className='w-40' />
                    <img src={msi} alt='' className='w-40' />
                    <img src={asrock} alt='' className='w-40' />
                    <img src={asus} alt='' className='w-40' />
                    <img src={hp} alt='' className='w-40' />
                    <img src={corsair} alt='' className='w-40' />
                    <img src={gigabyte} alt='' className='w-40' />
                </Slider>
            </div>
        </div>
    );
};

export default PartnerSection;
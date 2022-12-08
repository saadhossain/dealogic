import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import "react-image-gallery/styles/css/image-gallery.css";
import asrock from '../../../assests/partners/asrock-logo.png';
import asus from '../../../assests/partners/asus-logo.png';
import corsair from '../../../assests/partners/corsair-logo.png';
import gigabyte from '../../../assests/partners/gigabyte-logo.png';
import hp from '../../../assests/partners/hp-logo.png';
import msi from '../../../assests/partners/msi-logo.png';
import ryzen from '../../../assests/partners/ryzen-logo.png';


const PartnerSection = () => {
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-5'>
            <div className='relative'>
                <h1 className='text-2xl lg:text-4xl font-bold text-dealogic mb-10'>Our Partners</h1>
                <div className='border-2 border-dealogic w-20 absolute top-8 left-36 lg:left-56'></div>
            </div>
            <div className='lg:flex gap-2 hidden'>
                <img src={ryzen} alt='' className='w-40' />
                <img src={msi} alt='' className='w-40' />
                <img src={asrock} alt='' className='w-40' />
                <img src={asus} alt='' className='w-40' />
                <img src={hp} alt='' className='w-40' />
                <img src={corsair} alt='' className='w-40' />
                <img src={gigabyte} alt='' className='w-40' />
            </div>

            {/* Partners Carousel */}
            <div className='relative'>
                <div className="carousel carousel-center max-w-md p-4 space-x-4 rounded-box lg:hidden">
                    <div className="carousel-item">
                        <img src={ryzen} className="rounded-box" alt='' />
                    </div>
                    <div className="carousel-item">
                        <img src={msi} className="rounded-box" alt='' />
                    </div>
                    <div className="carousel-item">
                        <img src={asrock} className="rounded-box" alt='' />
                    </div>
                    <div className="carousel-item">
                        <img src={asus} className="rounded-box" alt='' />
                    </div>
                    <div className="carousel-item">
                        <img src={hp} className="rounded-box" alt='' />
                    </div>
                    <div className="carousel-item">
                        <img src={corsair} className="rounded-box" alt='' />
                    </div>
                    <div className="carousel-item">
                        <img src={gigabyte} className="rounded-box" alt='' />
                    </div>
                </div>
                <div className='lg:hidden'>
                    <IoIosArrowBack className='w-6 h-6 text-dealogic absolute top-12 left-1'></IoIosArrowBack>
                    <IoIosArrowForward className='w-6 h-6 text-dealogic absolute top-12 right-1'></IoIosArrowForward>
                </div>
            </div>
        </div>
    );
};

export default PartnerSection;
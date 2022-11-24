import React from 'react';
import Banner from '../../assests/home-banner.jpg'

const HomeBanner = () => {
    return (
        <div>
            <img src={Banner} alt='Home Banner' className='w-full'/>
        </div>
    );
};

export default HomeBanner;
import React from 'react';
import safety from '../../assests/transaction.jpg';

const HomeSafety = () => {
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto lg:flex gap-2 items-center my-10'>
            <div className='w-11/12 lg:w-2/4'>
                <div data-aos='slide-left'>
                    <h1 className='text-3xl lg:text-5xl font-bold leading-[70px] tracking-[10px] lg:tracking-[15px]'>
                        <span className='text-primary text-5xl lg:text-7xl'>Be Safe</span> <br />
                        While Making <br />
                        TRANSACTION
                    </h1>
                </div>
            </div>
            <div className='w-11/12 lg:w-2/4 mt-5 lg:mt-0'>
                <div data-aos='slide-right'>
                    <img src={safety} alt='Safety Banner' className='rounded-lg shadow-xl' />
                </div>
            </div>
        </div>
    );
};

export default HomeSafety;
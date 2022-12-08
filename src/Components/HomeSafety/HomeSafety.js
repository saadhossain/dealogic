import React from 'react';
import safety from '../../assests/transaction.jpg';

const HomeSafety = () => {
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto flex gap-2 items-center'>
            <div className='w-2/4'>
                <h1 className='text-5xl font-bold leading-[70px] tracking-[15px]'>
                    <span className='text-dealogic text-7xl'>Be Safe</span> <br />
                    While Making <br />
                    TRANSACTION
                </h1>
            </div>
            <div className='w-2/4'>
                <img src={safety} alt='Safety Banner' className='rounded-lg shadow-xl'/>
            </div>
        </div>
    );
};

export default HomeSafety;
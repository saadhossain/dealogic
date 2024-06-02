import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from '../../assests/errorImage.png';

const ErrorElements = () => {
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-5 flex flex-col-reverse lg:flex lg:flex-row items-center justify-center'>
            <div className='text-center'>
                <h1 className='text-5xl lg:text-9xl font-bold text-primary'>404</h1>
                <p className='text-lg lg:text-xl text-accent'>Oops! Something Happens unexpected! <br />The Page your are looking for is Missing</p>
                <Link to='/'>
                    <button className='py-2 px-10 font-semibold bg-primary duration-500 hover:bg-secondary my-4 text-white'>Go To Homepage</button>
                </Link>
            </div>
            <img src={errorImage} alt="Error" className='w-80 lg:w-96' />
        </div>
    );
};

export default ErrorElements;
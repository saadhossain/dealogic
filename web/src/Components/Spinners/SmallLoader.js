import React from 'react';

const SmallLoader = () => {
    return (
        <div className='flex gap-2 justify-center items-center h-full'>
            <div className='w-6 h-6 border-2 border-dashed rounded-full animate-spin border-white'></div>
            Processing
        </div>
    );
};

export default SmallLoader;
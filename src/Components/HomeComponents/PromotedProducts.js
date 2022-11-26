import React from 'react';

const PromotedProducts = () => {
    
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto mt-10'>
            <div className='relative'>
                <h1 className='text-xl lg:text-4xl font-bold text-innova mb-10'>Promoted Products</h1>
                <div className='border-2 border-innova w-20 absolute top-8 left-[340px]'></div>
            </div>
            <div className='grid lg:grid-cols-3 gap-5'>
                {/* {
                    categories.map(category => <CategoryShowcase
                        key={category._id}
                        category={category}
                    ></CategoryShowcase>)
                } */}
            </div>
        </div>
    );
};

export default PromotedProducts;
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CategoryShowcase from './CategoryShowcase';

const Categories = () => {
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('https://innova-server.vercel.app/categories')
            .then(res => res.json())
    })
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto mt-10'>
            <div className='relative'>
                <h1 className='text-2xl lg:text-4xl font-bold text-innova mb-10'>Top Categories</h1>
                <div className='border-2 border-innova w-20 absolute top-8 left-44 lg:left-64'></div>
            </div>
            <div className='grid lg:grid-cols-3 gap-5'>
                {
                    categories.map(category => <CategoryShowcase
                        key={category._id}
                        category={category}
                    ></CategoryShowcase>)
                }
            </div>
        </div>
    );
};

export default Categories;
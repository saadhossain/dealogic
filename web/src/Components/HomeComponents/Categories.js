import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CategoryShowcase from './CategoryShowcase';
import Loader from '../Spinners/Loader'

const Categories = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('https://dealogic.vercel.app/categories')
            .then(res => res.json())
    })
    if(isLoading){
        return <Loader></Loader>
    }
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto mt-10'>
            <div className='relative'>
                <h1 className='text-2xl lg:text-4xl font-bold text-dealogic mb-10'>Top Categories</h1>
                <div className='border-2 border-dealogic w-20 absolute top-8 left-44 lg:left-64'></div>
            </div>
            <div className='grid lg:grid-cols-3 gap-5' data-aos='zoom-in-left'>
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
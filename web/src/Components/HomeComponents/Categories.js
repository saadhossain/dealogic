import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loader from '../Spinners/Loader';
import CategoryShowcase from './CategoryShowcase';
import Heading from '../Heading';

const Categories = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch(`${process.env.REACT_APP_API}/categories`)
            .then(res => res.json())
    });
    if (isLoading) {
        return <Loader></Loader>;
    }
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto mt-10'>
            <Heading heading={'Top Categories'}/>
            <div className='grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-5' data-aos='fade-up'>
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
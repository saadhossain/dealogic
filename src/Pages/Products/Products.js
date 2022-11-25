import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductShowcase from '../../Components/ProductsComponents/ProductShowcase';

const Products = () => {
    const products = useLoaderData()
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-5'>
            <div className='relative'>
                <h1 className='text-xl lg:text-4xl font-bold text-innova mb-10'>All Products</h1>
                <div className='border-2 border-innova w-20 absolute top-8 left-52'></div>
            </div>
            {/* Products */}
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    products.map(product => <ProductShowcase
                    key={product._id}
                    product={product}
                    ></ProductShowcase>)
                }
            </div>
        </div>
    );
};

export default Products;
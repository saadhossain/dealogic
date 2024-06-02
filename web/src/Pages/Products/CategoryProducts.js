import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductBookingModal from '../../Components/Modal/ProductBookingModal';
import ProductShowcase from '../../Components/ProductsComponents/ProductShowcase';
import Heading from '../../Components/Heading';

const CategoryProducts = () => {
    const products = useLoaderData();
    const [availableProduct, setAvailableProduct] = useState(null);
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-5'>
            <Heading heading={`Category Based Products`}/>
            {/* Products */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5'>
                {
                    products.map(product => <ProductShowcase
                        key={product._id}
                        product={product}
                        setAvailableProduct={setAvailableProduct}
                    ></ProductShowcase>)
                }
            </div>
            {
                availableProduct &&
                <ProductBookingModal
                    availableProduct={availableProduct}
                    setAvailableProduct={setAvailableProduct}
                >
                </ProductBookingModal>
            }
        </div>
    );
};

export default CategoryProducts;
import React, { useEffect, useState } from 'react';
import Heading from '../../Components/Heading';
import ProductBookingModal from '../../Components/Modal/ProductBookingModal';
import ProductShowcase from '../../Components/ProductsComponents/ProductShowcase';

const Products = () => {
    const [products, setProducts] = useState();
    const [availableProduct, setAvailableProduct] = useState(null);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/products`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-5'>
            <Heading heading={`All Products`} />
            {/* Products */}
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    products?.map(product => <ProductShowcase
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

export default Products;
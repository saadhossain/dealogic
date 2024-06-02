import React, { useEffect, useState } from 'react';
import Heading from '../../Components/Heading';
import ProductBookingModal from '../../Components/Modal/ProductBookingModal';
import ProductShowcase from '../../Components/ProductsComponents/ProductShowcase';
import Loader from '../../Components/Spinners/Loader';

const Products = () => {
    const [products, setProducts] = useState();
    const [availableProduct, setAvailableProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/products`);
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);
    if (loading) {
        return <Loader />;
    }
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-5'>
            <Heading heading={`All Products`} />
            {/* Products */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5'>
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
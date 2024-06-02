import React, { useEffect, useState } from 'react';
import Heading from '../Heading';
import ProductBookingModal from '../Modal/ProductBookingModal';
import ProductShowcase from '../ProductsComponents/ProductShowcase';
import Loader from '../Spinners/Loader';

const RecentProducts = () => {
    const [recentProducts, setRecentProducts] = useState();
    const [availableProduct, setAvailableProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/recentproducts`);
                const data = await response.json();
                setRecentProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);
    if(loading){
        return <Loader/>
    }
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto mt-10'>
            {
                recentProducts?.length > 0 &&
                <>
                    <Heading heading={'Recently Posted'} />
                    <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-5'>
                        {
                            recentProducts.map(product => <ProductShowcase
                                key={product._id}
                                product={product}
                                setAvailableProduct={setAvailableProduct}
                            ></ProductShowcase>)
                        }
                    </div>
                </>
            }
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

export default RecentProducts;
import React, { useEffect, useState } from 'react';
import ProductBookingModal from '../Modal/ProductBookingModal';
import DisplayPromotedProducts from '../ProductsComponents/DisplayPromotedProducts';

const PromotedProducts = () => {
    const [promotedProducts, setPromotedProducts] = useState();
    const [availableProduct, setAvailableProduct] = useState(null);
    useEffect(() => {
        fetch('https://dealogic-server-omega.vercel.app/promoted')
            .then(res => res.json())
            .then(data => setPromotedProducts(data));
    }, []);
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto mt-10'>
            {
                promotedProducts?.length > 0 &&
                <>
                    <div className='relative'>
                        <h1 className='text-2xl lg:text-4xl font-bold text-dealogic mb-10'>Promoted Products</h1>
                        <div className='border-2 border-dealogic w-20 absolute top-8 left-56 lg:left-[340px]'></div>
                    </div>
                    <div className='grid lg:grid-cols-4 gap-5'>
                        {
                            promotedProducts?.map(promoted => <DisplayPromotedProducts
                                key={promoted._id}
                                promoted={promoted}
                                availableProduct={availableProduct}
                                setAvailableProduct={setAvailableProduct}
                            ></DisplayPromotedProducts>)
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

export default PromotedProducts;
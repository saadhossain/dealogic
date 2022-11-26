import axios from 'axios';
import React, { useState } from 'react';
import ProductBookingModal from '../Modal/ProductBookingModal';
import DisplayPromotedProducts from '../ProductsComponents/DisplayPromotedProducts';

const PromotedProducts = () => {
    const [promotedProducts, setPromotedProducts] = useState()
    const [availableProduct, setAvailableProduct] = useState(null)
    const url = 'http://localhost:5000/promoted'
    // Load/Fetch Promoted Products using axios
    axios.get(url)
        .then(data => {
            const promoted = (data.data);
            setPromotedProducts(promoted)
        })

    return (
        <div className='w-11/12 lg:w-10/12 mx-auto mt-10'>
            {
                promotedProducts?.length > 0 &&
                <>
                    <div className='relative'>
                        <h1 className='text-xl lg:text-4xl font-bold text-innova mb-10'>Promoted Products</h1>
                        <div className='border-2 border-innova w-20 absolute top-8 left-[340px]'></div>
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
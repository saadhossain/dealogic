import React, { useEffect, useState } from 'react';
import ProductBookingModal from '../Modal/ProductBookingModal';
import DisplayPromotedProducts from '../ProductsComponents/DisplayPromotedProducts';
import Heading from '../Heading';

const PromotedProducts = () => {
    const [promotedProducts, setPromotedProducts] = useState();
    const [availableProduct, setAvailableProduct] = useState(null);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/promoted`)
            .then(res => res.json())
            .then(data => setPromotedProducts(data));
    }, []);
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto mt-10'>
            {
                promotedProducts?.length > 0 &&
                <>
                    <Heading heading={'Promoted Products'}/>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5'>
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
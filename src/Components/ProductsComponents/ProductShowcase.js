import dateFormat from "dateformat";
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ProductShowcase = ({ product, setAvailableProduct }) => {
    const {proName, productImageURL, productCondition, purchaseYear, regularPrice, resalePrice, sellerName, usedYear, description, addedOn, location, booked } = product;
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-lg hover:shadow-2xl duration-500 hover:-mt-2 cursor-pointer">
                <figure><img src={productImageURL} alt={proName} className='w-full h-48 rounded-t' /></figure>
                <div className="card-body font-semibold">
                    <h2 className="text-2xl font-semibold">{proName}</h2>
                    <div className='flex items-center justify-between'>
                        <p className='line-through text-gray-500'>Regular :${regularPrice}</p>
                        <p className='font-semibold text-2xl text-innova'>Sale: ${resalePrice}</p>
                    </div>
                    <p>
                        {description.length > 50 && description.slice(0, 50) + '...'}
                    </p>
                    <div className='flex justify-between items-center'>
                        <p className='flex items-center gap-1'><FaMapMarkerAlt></FaMapMarkerAlt> {location}</p>
                        <p>Used: {usedYear}</p>
                    </div>
                    <p>Condition :{productCondition}</p>
                    <p>Purchased on: {purchaseYear}</p>
                    <p>Posted On: {dateFormat(addedOn, "mmm dS, h:MM: TT")}</p>
                    <p>Sold By: {sellerName}</p>
                    <div className="card-actions justify-center">
                        <label
                            className='btn border-none duration-300 ease-in-out bg-innova hover:bg-secondary'
                            htmlFor="booking-modal"
                            disabled={booked}
                            onClick={()=> setAvailableProduct(product)}
                        >{booked ? 'Already Booked' : 'Book Product'}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductShowcase;
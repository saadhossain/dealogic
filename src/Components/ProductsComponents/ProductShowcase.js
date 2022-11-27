import dateFormat from "dateformat";
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {GoVerified} from 'react-icons/go'

const ProductShowcase = ({ product, setAvailableProduct }) => {
    const { proName, productImageURL, productCondition, purchaseYear, regularPrice, resalePrice, sellerName, usedDuration, addedOn, location, booked, sellerVerified } = product;
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-lg hover:shadow-2xl duration-500 hover:-mt-2 cursor-pointer">
                <figure><img src={productImageURL} alt={proName} className='w-full h-48 rounded-t' /></figure>
                <div className="card-body font-semibold">
                    <h2 className="text-xl font-semibold">{proName}</h2>
                    <div className='flex items-center justify-between'>
                        <p className='line-through text-gray-500'>Regular :${regularPrice}</p>
                        <p className='font-bold text-xl text-innova'>Sale: ${resalePrice}</p>
                    </div>
                    <hr className="border-1 border-gray-400" />
                    <div className='flex justify-between items-center'>
                        <p className='flex items-center gap-1'><FaMapMarkerAlt></FaMapMarkerAlt> {location}</p>
                        <p>Used: {usedDuration}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p>Status :{productCondition}</p>
                        <p>Purchase: {purchaseYear}</p>
                    </div>
                    <hr className="border-1 border-gray-400" />
                    <p>Posted On: {dateFormat(addedOn, "mmm dS, h:MM: TT")}</p>
                    <p className="flex gap-1 items-center">Sold By: {sellerName} {sellerVerified && <GoVerified className="text-blue-600" title="Verified Seller"></GoVerified>}
                    </p>
                    <div className="card-actions justify-center">
                        <label
                            className='btn border-none duration-300 ease-in-out bg-innova hover:bg-secondary'
                            htmlFor="booking-modal"
                            disabled={booked}
                            onClick={() => setAvailableProduct(product)}
                        >{booked ? 'Already Booked' : 'Book Product'}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductShowcase;
import dateFormat from "dateformat";
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductShowcase = ({ product }) => {
    const { _id, proName, productImageURL, productCondition, purchaseYear, regularPrice, resalePrice, sellerName, usedYear, description, addedOn, location } = product;
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-lg hover:shadow-2xl duration-500 hover:-mt-2 cursor-pointer">
                <figure><img src={productImageURL} alt={proName} className='w-full rounded-t' /></figure>
                <div className="card-body font-semibold">
                    <h2 className="text-2xl font-semibold">{proName}</h2>
                    <div className='flex items-center justify-between'>
                        <p className='line-through text-gray-500'>Regular :${regularPrice}</p>
                        <p className='font-semibold text-2xl'>Sale: ${resalePrice}</p>
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
                        <Link>
                            <button className="btn btn-primary bg-innova border-none hover:bg-secondary duration-300 ease-in-out">Book Product</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductShowcase;
import dateFormat from "dateformat";
import React from 'react';
import { BsCartCheck } from "react-icons/bs";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import condition from '../../assests/icons/condition.png';
import salePrice from '../../assests/icons/price.png';
import purchased from '../../assests/icons/purchased.png';
import duration from '../../assests/icons/time-used.png';

const ProductShowcase = ({ product, setAvailableProduct }) => {
    const { proName, productImageURL, productCondition, purchaseYear, regularPrice, resalePrice, sellerName, usedDuration, addedOn, location, booked, sellerVerified } = product;
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-lg hover:shadow-2xl duration-500 hover:-mt-2 cursor-pointer">
                <figure><img src={productImageURL} alt={proName} className='w-full h-48 rounded-t' /></figure>
                <div className="card-body font-semibold">
                    <h2 className="text-lg font-semibold h-12">{proName}</h2>
                    <div className='flex items-center justify-between'>
                        <p className='line-through text-gray-500'>Regular :${regularPrice}</p>
                        <div className='flex items-center gap-1'>
                            <img src={salePrice} alt='Sale Price' />
                            <h3 className="text-2xl text-primary font-semibold">${resalePrice}</h3>
                        </div>
                    </div>
                    <hr className="border-1 border-gray-400" />
                    <div className='flex justify-between items-center'>
                        <p className='flex items-center gap-1'><FaMapMarkerAlt /> {location}</p>
                        <div className="flex justify-center gap-1"><img src={duration} alt='Used Duration' /> {usedDuration}</div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="flex items-center gap-1"><img src={condition} alt='Condition Icon' />{productCondition}</p>
                        <div className="flex justify-center gap-1"><img src={purchased} alt='Purchased' />{purchaseYear}</div>
                    </div>
                    <hr className="border-1 border-gray-400" />
                    <p>Posted On: {dateFormat(addedOn, "mmm dS, h:MM: TT")}</p>
                    <p className="flex gap-1 items-center">Sold By: {sellerName} {sellerVerified && <GoVerified className="text-blue-600" title="Verified Seller"></GoVerified>}
                    </p>
                    <div className="card-actions justify-center">
                        <label
                            className='btn border-none duration-300 ease-in-out bg-primary hover:bg-secondary capitalize'
                            htmlFor="booking-modal"
                            disabled={booked}
                            onClick={() => setAvailableProduct(product)}
                        >{booked ? 'Already Booked' : <div className="flex items-center gap-1"><BsCartCheck className="w-5 h-5" /> Book Product</div>}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductShowcase;
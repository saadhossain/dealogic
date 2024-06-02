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
                <figure><img src={productImageURL} alt={proName} className='w-4/5 md:h-48 rounded-t pt-2' /></figure>
                <div className="card-body font-semibold">
                    <h2 className="text-base font-semibold h-16">{proName.length > 50 ? proName.slice(0, 50) + '...' : proName}</h2>
                    <div className='flex items-center justify-between'>
                        <p className='line-through text-gray-500'>Regular: ${regularPrice}</p>
                        <div className='flex items-center gap-1'>
                            <img src={salePrice} alt='Sale Price' className='w-4 md:w-5' />
                            <h3 className="text-lg md:text-xl text-primary font-semibold">${resalePrice}</h3>
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
                    <div className='md:flex items-center justify-between'>
                        <p>On: {dateFormat(addedOn, "mmm dS")}</p>
                        <p className="flex gap-1 items-center">By: {sellerName} {sellerVerified && <GoVerified className="text-blue-600" title="Verified Seller" />}
                        </p>
                    </div>
                    {
                        booked ?
                            <button className="flex items-center gap-2 justify-center text-white  font-semibold py-2 px-3  rounded-md bg-gray-400">
                                <BsCartCheck className="text-white" />
                                Already Booked
                            </button> : <label
                                className={`flex items-center gap-2 justify-center text-white  font-semibold py-2 px-3  rounded-md duration-300 ease-in-out bg-primary hover:bg-secondary`}
                                htmlFor="booking-modal"
                                onClick={() => setAvailableProduct(product)}
                            ><BsCartCheck className="w-4 h-4" /> Book Product</label>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductShowcase;
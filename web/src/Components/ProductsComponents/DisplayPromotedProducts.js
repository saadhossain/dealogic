import dateFormat from "dateformat";
import React from 'react';
import { BsCartCheck } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import condition from '../../assests/icons/condition.png';
import salePrice from '../../assests/icons/price-white.png'

const DisplayPromotedProducts = ({ promoted, setAvailableProduct }) => {
    const { proName, productImageURL, productCondition, resalePrice, sellerName, addedOn, location, booked, sellerVerified } = promoted;
    return (
        <div data-aos='fade-up'>
            <div className="card card-compact w-full bg-base-100 shadow-lg hover:shadow-2xl cursor-pointer relative">
                <p className='font-semibold text-white px-2 shadow-lg absolute top-2 left-2 bg-dealogic rounded'>Promoted</p>
                <figure><img src={productImageURL} alt={proName} className='w-full h-48 rounded-t' /></figure>
                <div className="card-body font-semibold relative">
                    <div className='flex items-center gap-1 absolute -top-10 right-2 bg-dealogic rounded px-2 shadow-lg'>
                        <img src={salePrice} alt='Sale Price' />
                        <h3 className="font-semibold text-2xl text-white">${resalePrice}</h3>
                    </div>
                    <h2 className="text-lg font-semibold h-12">{proName}</h2>
                    <div className='flex justify-between items-center'>
                        <p className='flex items-center gap-1'><FaMapMarkerAlt></FaMapMarkerAlt> {location}</p>
                        <p className="flex items-center gap-1"><img src={condition} alt='Conditon Icon' /> {productCondition}</p>
                    </div>
                    <hr className="border-1 border-gray-400" />
                    <p>Posted On: {dateFormat(addedOn, "mmm dS, h:MM: TT")}</p>
                    <p className="flex gap-1 items-center">Sold By: {sellerName} {sellerVerified && <GoVerified className="text-blue-600" title="Verified Seller"></GoVerified>}
                    </p>
                    <hr className="border-1 border-gray-400" />
                    <div className="card-actions justify-center">
                        <label
                            className='btn border-none duration-300 ease-in-out bg-dealogic hover:bg-secondary capitalize'
                            htmlFor="booking-modal"
                            disabled={booked}
                            onClick={() => setAvailableProduct(promoted)}
                        >{booked ? 'Already Booked' : <div className="flex items-center gap-1"><BsCartCheck className="w-5 h-5" /> Book Product </div>}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayPromotedProducts;
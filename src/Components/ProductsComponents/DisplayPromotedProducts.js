import dateFormat from "dateformat";
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const DisplayPromotedProducts = ({ promoted, setAvailableProduct }) => {
    const { proName, productImageURL, productCondition, resalePrice, sellerName, addedOn, location, booked } = promoted;
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-lg hover:shadow-2xl cursor-pointer relative">
            <p className='font-semibold text-white px-2 shadow-lg absolute top-2 left-2 bg-innova rounded'>Promoted</p>
                <figure><img src={productImageURL} alt={proName} className='w-full h-48 rounded-t' /></figure>
                <div className="card-body font-semibold relative">
                    <p className='font-semibold text-2xl text-white px-2 shadow-lg absolute -top-10 right-2 bg-innova rounded'>${resalePrice}</p>
                    <h2 className="text-xl font-semibold">{proName}</h2>
                    <div className='flex justify-between items-center'>
                        <p className='flex items-center gap-1'><FaMapMarkerAlt></FaMapMarkerAlt> {location}</p>
                        <p>Condition :{productCondition}</p>
                    </div>
                    <hr className="border-1 border-gray-400"/>
                    <p>Posted On: {dateFormat(addedOn, "mmm dS, h:MM: TT")}</p>
                    <p>Sold By: {sellerName}</p>
                    <hr className="border-1 border-gray-400"/>
                    <div className="card-actions justify-center">
                        <label
                            className='btn border-none duration-300 ease-in-out bg-innova hover:bg-secondary'
                            htmlFor="booking-modal"
                            disabled={booked}
                        onClick={() => setAvailableProduct(promoted)}
                        >{booked ? 'Already Booked' : 'Book Product'}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayPromotedProducts;
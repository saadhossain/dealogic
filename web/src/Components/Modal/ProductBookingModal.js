import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';

const ProductBookingModal = ({ availableProduct, setAvailableProduct }) => {
    const { user } = useContext(AuthContext);
    const { _id, proName, productImageURL, productCondition, purchaseYear, regularPrice, resalePrice, sellerName, usedYear } = availableProduct;

    //Functionality to book a product by buyer
    const handleBooking = (e) => {
        e.preventDefault();
        const form = e.target;
        const buyerPhone = form.buyerPhone.value;
        const meetingLocaton = form.meetingLocation.value;
        const updatedProductInfo = {
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            buyerPhone,
            meetingLocaton,
            payment: 'unpaid',
            booked: true
        };
        fetch(`https://dealogic-server-omega.vercel.app/products/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProductInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`You have Successfully Booked ${proName}`);
                    setAvailableProduct(null);
                    window.location.reload();
                    // fetch(`https://dealogic-server-omega.vercel.app/products/${_id}`, {
                    //     method: 'PUT',
                    //     headers: {
                    //         'content-type': 'application/json'
                    //     },
                    //     body: JSON.stringify({ booked: true })
                    // })
                    //     .then(res => res.json())
                    //     .then(data => {
                    //         if (data.modifiedCount > 0) {
                    //             window.location.reload()
                    //         }
                    //     })
                }
            });
    };
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleBooking}>
                        <div className="space-y-4">
                            {/* Product Information Section */}
                            <h3 className='text-2xl font-semibold text-dealogic'>Product Information</h3>
                            <div className='flex gap-5 items-center'>
                                <img src={productImageURL} alt={proName} className='w-12' />
                                <h3 className='text-2xl'>{proName}</h3>
                            </div>
                            <div className='grid lg:grid-cols-2 gap-2 font-semibold'>
                                <div className='flex gap-2'>
                                    <p className='line-through'>Price: ${regularPrice}</p>
                                    <p className='text-dealogic'>Sale Price: ${resalePrice}</p>
                                </div>
                                <p>Product Condition: <span className='text-dealogic'>{productCondition}</span></p>
                                <p>Purchase Year: <span className='text-dealogic'>{purchaseYear}</span></p>
                                <p>Sold By: <span className='text-dealogic'>{sellerName}</span></p>
                                <p>Used Duration: <span className='text-dealogic'>{usedYear ? usedYear : 'Not Found'}</span></p>
                            </div>
                            {/* Product information section end */}

                            {/* Buyer Information section start */}
                            <h3 className='text-2xl font-semibold text-dealogic'>Buyer Information</h3>
                            <div className='grid lg:grid-cols-2 gap-2'>
                                <div>
                                    <label htmlFor="buyer" className="mb-2 text-lg">Buyer Name</label>
                                    <input type="text" name="buyer" id="buyer" placeholder={user?.displayName} disabled className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                                </div>
                                <div>
                                    <label htmlFor="buyerEmail" className="mb-2 text-lg">Buyer Email</label>
                                    <input type="email" name="buyerEmail" id="buyerEmail" placeholder={user?.email} disabled className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                                </div>
                                <div>
                                    <label htmlFor="buyerPhone" className="mb-2 text-lg">Contact Number</label>
                                    <input type="tel" name="buyerPhone" id="buyerPhone" placeholder="eg: +88018X-XXXXXXX" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                                </div>
                                <div>
                                    <label htmlFor="meetingLocation" className="mb-2 text-lg">Where to Meet?</label>
                                    <input type="text" name="meetingLocation" id="meetingLocation" placeholder="eg: Mirpur-10, Dhaka" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                                </div>
                            </div>
                            {/* Buyer Information section end */}
                        </div>
                        <div className='flex justify-center my-5'>
                            <button type='submit' className='bg-dealogic text-white font-semibold py-3 px-10 rounded'>Book Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductBookingModal;
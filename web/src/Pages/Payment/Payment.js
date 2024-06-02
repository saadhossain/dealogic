import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { GoVerified } from 'react-icons/go';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import Heading from '../../Components/Heading';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    //Get the Single Product for payment
    const product = useLoaderData()[0];
    return (
        <div className='flex justify-between gap-10'>
            <div className='w-2/5'>
                <Heading heading={'Payment Details'}/>
                <div className='my-5'>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            product={product}
                        ></CheckoutForm>
                    </Elements>
                </div>
            </div>
            <div className='w-3/5'>
                <h1 className='text-xl lg:text-3xl text-primary font-bold'>Products Details</h1>
                {/* Product Details */}
                <div className='flex gap-2 mt-5 border p-3 rounded-lg'>
                    <img src={product.productImageURL} alt={product.proName} className='w-28 rounded-lg' />
                    <div>
                        <h2 className='text-xl font-semibold'>{product.proName}</h2>
                        <p className='flex items-center gap-1 font-semibold'>By: {product.sellerName} {product.sellerVerified && <GoVerified className="text-blue-600" title="Verified Seller"></GoVerified>}</p>
                        <div className='flex justify-between font-semibold'>
                            <p>Quantity: 1</p>
                            <p>Price: <span className='text-primary text-lg font-bold'>${product.resalePrice}</span></p>
                        </div>
                    </div>
                </div>
                <div className='text-end font-semibold'>
                    <p>Subtotal: <span className='text-primary text-lg'>${product.regularPrice}</span></p>
                    <p>Discount: <span className='text-primary text-lg'>-${product.regularPrice - product.resalePrice}</span></p>
                    <p>Shipping: <span className='text-primary text-lg'>$0</span></p>
                    <hr className='border border-primary my-1 ml-48' />
                    <p>Total: <span className='text-primary text-lg font-bold'>${product.resalePrice}</span> USD</p>
                </div>
            </div>
        </div>
    );
};

export default Payment;
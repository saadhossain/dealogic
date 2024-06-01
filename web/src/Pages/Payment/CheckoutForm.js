import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const CheckoutForm = ({ product }) => {
    const user = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    //Navigation
    const navigate = useNavigate();
    //display errors
    const [errs, setErrs] = useState('');
    //Handle client Secret
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://dealogic-server-omega.vercel.app/payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [product]);
    //Handle Payment Submit functionality
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return toast.error("Stripe or Elements couldn't found!");
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return toast.error('Invalid Card Details');
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErrs(error.message);
        }
        else {
            setErrs('');
            console.log('[PaymentMethod]', paymentMethod);
        }
        const { paymentIntent, paymentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            },
        );
        if (paymentError) {
            setErrs(paymentError.message);
            return;
        }
        //Change Product payment status after completing payment
        if (paymentIntent.status === 'succeeded') {
            //Change Product Status Paid after payment
            fetch(`https://dealogic-server-omega.vercel.app/products/${product._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ payment: 'Paid' })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        toast.success('Payment Successfull...');
                        navigate('/dashboard/mypurchase');
                    }
                });
        }
        console.log(paymentIntent);
    };
    return (
        <div className='w-full'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                padding: '10px',
                                border: '1px solid #dedede',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret} className={`${!stripe || !clientSecret ? 'bg-secondary' : 'bg-dealogic'} py-2 px-3 rounded text-white font-semibold my-3`}>
                    Confirm Payment
                </button>
            </form>
            <p className='text-red-500'>{errs}</p>
        </div>
    );
};

export default CheckoutForm;
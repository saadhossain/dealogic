import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const MyPurchase = () => {
    //Get User from the Context
    const { user, logOut } = useContext(AuthContext);
    //Get Products for logged in users
    const { data: myPurchases = [] } = useQuery({
        queryKey: ['myPurchases', user?.email, logOut],
        queryFn: () => fetch(`https://dealogic-server-omega.vercel.app/mypurchase?email=${user?.email}`, {
            headers: {
                authorization: `Beareer ${localStorage.getItem('AccessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error('Sorry! You are not authorized to access the data');
                    return logOut();
                }
                return res.json();
            })
    });
    return (
        <div>
            <div className='relative'>
                <h1 className='text-xl lg:text-4xl font-bold text-primary mb-10'>My Purchases</h1>
                <div className='border-2 border-primary w-20 absolute top-8 left-60'></div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product Name</th>
                                <th>Product Image</th>
                                <th>Regular Price</th>
                                <th>Sale Price</th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='font-semibold'>
                            {
                                myPurchases.map((myPurchase, idx) => <tr
                                    key={myPurchase._id}
                                >
                                    <th>{idx + 1}</th>
                                    <td>{myPurchase.proName}</td>
                                    <td>
                                        <img src={myPurchase.productImageURL} alt={myPurchase.proName} className='w-10' />
                                    </td>
                                    <td>${myPurchase.regularPrice}</td>
                                    <td>${myPurchase.resalePrice}</td>
                                    <td className='flex items-center gap-1'>
                                        <Link to={`/dashboard/payment/${myPurchase._id}`}>
                                            <button
                                                className={`duration-300 py-1 px-2 rounded text-white font-semibold ${myPurchase.payment === 'Paid' ? 'bg-accent' : 'bg-primary hover:bg-secondary'}`}
                                                disabled={myPurchase.payment === 'Paid'}
                                            >
                                                {myPurchase.payment ? myPurchase.payment : 'Pay Now'}
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className='text-primary hover:text-red-700 duration-300 flex items-center'><FaTrash></FaTrash> Cancel</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyPurchase;
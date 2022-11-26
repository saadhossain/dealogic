import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthProvider';

const MyPurchase = () => {
    //Get User from the Context
    const { user } = useContext(AuthContext)
    //Get Products for logged in users
    const { data: myPurchases = [] } = useQuery({
        queryKey: ['myPurchases', user?.email],
        queryFn: () => fetch(`http://localhost:5000/mypurchase?email=${user?.email}`)
            .then(res => res.json())
    })
    return (
        <div>
            <div className='relative'>
                <h1 className='text-xl lg:text-4xl font-bold text-innova mb-10'>My Purchases</h1>
                <div className='border-2 border-innova w-20 absolute top-8 left-60'></div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product Name</th>
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
                                    <td>${myPurchase.regularPrice}</td>
                                    <td>${myPurchase.resalePrice}</td>
                                    <td className='flex items-center gap-1'>
                                        <button
                                        className={`duration-300 py-1 px-2 rounded text-white font-semibold ${myPurchase.payment === 'Paid' ? 'bg-accent' : 'bg-innova hover:bg-secondary'}`}
                                        disabled={myPurchase.payment === 'Paid'}
                                        >
                                        {myPurchase.payment}
                                        </button>
                                    </td>
                                    <td>
                                        <button className='text-innova hover:text-red-700 duration-300 flex items-center'><FaTrash></FaTrash> Cancel</button>
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
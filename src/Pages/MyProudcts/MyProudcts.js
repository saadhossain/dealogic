import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';

const MyProudcts = () => {
    //Get User from the Context
    const { user } = useContext(AuthContext)
    //Get Products for logged in users
    const { data: myProducts = [] } = useQuery({
        queryKey: ['myProducts', user?.email],
        queryFn: () => fetch(`http://localhost:5000/products?email=${user?.email}`)
            .then(res => res.json())
    })
    const [prodStatus, setProdStatus] = useState();
    //Set Product Status to the Database
    const handleStatusChange = (id) => {
        // console.log(id);
        fetch(`http://localhost:5000/products/${id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({prodStatus})
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                toast.success('Product Status Updated...')
            }
        })
    }
    return (
        <div>
            <div className='relative'>
                <h1 className='text-xl lg:text-4xl font-bold text-innova mb-10'>My Products</h1>
                <div className='border-2 border-innova w-20 absolute top-8 left-56'></div>
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
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myProducts.map((myproduct, idx) => <tr
                                key={myproduct._id}
                                >
                                    <th>{idx+1}</th>
                                    <td>{myproduct.proName}</td>
                                    <td>${myproduct.regularPrice}</td>
                                    <td>${myproduct.resalePrice}</td>
                                    <td className='flex items-center gap-1'>
                                        <select onChange={e=> setProdStatus(e.target.value)} name="prodStatus" id="prodStatus" className='border-2 border-gray-800 rounded'>
                                            <option value={myproduct?.prodStatus}>{myproduct?.prodStatus}</option>
                                            <option value={myproduct?.prodStatus === 'Sold' ? 'Available' : 'Sold'}>{myproduct?.prodStatus === 'Sold' ? 'Available' : 'Sold'}</option>
                                        </select>
                                        <button onClick={()=> handleStatusChange(myproduct._id)} className='bg-innova hover:bg-secondary duration-300 py-1 px-2 rounded text-white'>Save</button>
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

export default MyProudcts;
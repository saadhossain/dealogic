import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { RiRocket2Fill } from 'react-icons/ri';
import { AuthContext } from '../../Context/AuthProvider';

const MyProudcts = () => {
    //Get User from the Context
    const { user, logOut } = useContext(AuthContext)
    //Get Products for logged in users
    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ['myProducts', user?.email, logOut],
        queryFn: () => fetch(`https://dealogic.vercel.app/seller/products?email=${user?.email}`, {
            headers: {
                authorization: `Beareer ${localStorage.getItem('AccessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error('Sorry! You are not authorized to access the data')
                    return logOut()
                }
                return res.json()
            })
    })
    //Set Product Status to the Database
    const handleStatusChange = (id) => {
        fetch(`https://dealogic.vercel.app/products/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ prodStatus: 'Sold' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Product Status Updated...')
                    refetch()
                }
            })
    }
    //Remove Product from listing
    const handleRemoveProduct = (id) => {
        const confirmation = window.confirm('Do You Want to Delete This Item?')
        if (confirmation) {
            fetch(`https://dealogic.vercel.app/products/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.error('One Product has been Deleted...')
                        refetch()
                    }
                })
        }
    }
    //Promote Product by Seller
    const handlePromote = (id) => {
        fetch(`https://dealogic.vercel.app/products/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ promoted: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Product Boosted Successfully....')
                    refetch()
                }
            })
    }
    return (
        <div>
            <div className='relative'>
                <h1 className='text-xl lg:text-4xl font-bold text-dealogic mb-10'>My Products</h1>
                <div className='border-2 border-dealogic w-20 absolute top-8 left-56'></div>
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
                                <th>Promote</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='font-semibold'>
                            {
                                myProducts.map((myproduct, idx) => <tr
                                    key={myproduct._id}
                                >
                                    <th>{idx + 1}</th>
                                    <td>{myproduct.proName}</td>
                                    <td>${myproduct.regularPrice}</td>
                                    <td>${myproduct.resalePrice}</td>
                                    <td className='flex items-center gap-1'>
                                        <button
                                            onClick={() => handleStatusChange(myproduct._id)}
                                            className={`duration-300 py-1 px-2 rounded text-white font-semibold ${myproduct.prodStatus === 'Sold' ? 'bg-accent' : 'bg-dealogic hover:bg-secondary'}`}
                                            disabled={myproduct.prodStatus === 'Sold'}
                                        >
                                            {myproduct.prodStatus === 'Sold' ? 'Sold' : 'Mark Sold'}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handlePromote(myproduct._id)}
                                            className={`flex items-center duration-300 py-1 px-2 rounded text-white ${myproduct.promoted ? 'bg-accent' : 'bg-dealogic hover:bg-secondary'}`}
                                            disabled={myproduct.promoted}
                                        >
                                            <RiRocket2Fill></RiRocket2Fill>
                                            {myproduct.promoted ? 'Promoted' : 'Promote'}</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleRemoveProduct(myproduct._id)} className='text-dealogic hover:text-red-700 duration-300'><FaTrash></FaTrash></button>
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
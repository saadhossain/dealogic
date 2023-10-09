import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';

const AllSeller = () => {
    //Get all the sellers from the database
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('https://dealogic.vercel.app/users/sellers');
            const data = await res.json()
            return data
        }
    })
    //Remove or Delete a Seller
    const handleDeleteSeller = (id) => {
        const confirmation = window.confirm('Do You Want to Delete This User?')
        if (confirmation) {
            fetch(`https://dealogic.vercel.app/users/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.error('One Seller has been Deleted...')
                        refetch()
                    }
                })
        }
    }
    //Verify a Seller
    const handleVerify = (id) => {
        fetch(`https://dealogic.vercel.app/users/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ verified: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Seller has been Verified')
                    refetch()
                }
            })
    }
    return (
        <div>
            <div className='relative'>
                <h1 className='text-xl lg:text-4xl font-bold text-dealogic mb-10'>All seller</h1>
                <div className='border-2 border-dealogic w-20 absolute top-8 left-40'></div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>User Name</th>
                                <th>Profile</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='font-semibold'>
                            {
                                sellers.map((seller, idx) => <tr
                                    key={seller._id}
                                >
                                    <th>{idx + 1}</th>
                                    <td>{seller.fullName}</td>
                                    <td>
                                        <img src={seller.profileImage} alt={seller.fullName} className='w-12 rounded-full' />
                                    </td>
                                    <td>{seller.email}</td>
                                    <td>
                                        <button className='bg-dealogic text-white  rounded py-1 px-2'>{seller.accountType}</button>
                                    </td>
                                    <td className='flex items-center gap-2 mt-3'>
                                        <button onClick={() => handleDeleteSeller(seller._id)} className='text-dealogic hover:text-red-700 duration-300 flex items-center gap-1'><FaTrash></FaTrash> Delete</button>
                                        <button onClick={() => handleVerify(seller._id)} className={`duration-300 flex items-center gap-1 ${seller.verified ? 'text-green-700' : 'text-dealogic hover:text-green-700'}`}><GoVerified></GoVerified> {seller.verified ? 'Verified' : 'Verify'}</button>
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

export default AllSeller;
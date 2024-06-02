import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import Heading from '../../Components/Heading';

const AllBuyer = () => {
    //Get all the buyers from the database
    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API}/users/buyers`);
            const data = await res.json();
            return data;
        }
    });
    //Remove or Delete a Buyer
    const handleDeleteBuyer = (id) => {
        const confirmation = window.confirm('Do You Want to Delete This User?');
        if (confirmation) {
            fetch(`${process.env.REACT_APP_API}/users/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.error('One Buyer has been Deleted...');
                        refetch();
                    }
                });
        }
    };
    return (
        <div>
            <Heading heading={'All Buyer'}/>
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
                                buyers.map((buyer, idx) => <tr
                                    key={buyer._id}
                                >
                                    <th>{idx + 1}</th>
                                    <td>{buyer.fullName}</td>
                                    <td>
                                        <img src={buyer.profileImage} alt={buyer.fullName} className='w-12 rounded-full' />
                                    </td>
                                    <td>{buyer.email}</td>
                                    <td>
                                        <button className='bg-primary text-white  rounded py-1 px-2'>{buyer.accountType}</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteBuyer(buyer._id)} className='text-primary hover:text-red-700 duration-300 flex items-center gap-1'><FaTrash></FaTrash> Delete</button>
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

export default AllBuyer;
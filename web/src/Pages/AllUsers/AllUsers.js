import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import Heading from '../../Components/Heading';

const AllUsers = () => {
    //Get all Users from the database
    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API}/users`);
            const data = await res.json();
            return data;
        }
    });
    //Remove or Delete a User
    const handleDeleteUser = (id) => {
        const confirmation = window.confirm('Do You Want to Delete This User?');
        if (confirmation) {
            fetch(`${process.env.REACT_APP_API}/users/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.error('One User has been Deleted...');
                        refetch();
                    }
                });
        }
    };
    return (
        <div>
            <Heading heading={'All Users'}/>
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
                                allUsers.map((users, idx) => <tr
                                    key={users._id}
                                >
                                    <th>{idx + 1}</th>
                                    <td>{users.fullName}</td>
                                    <td>
                                        <img src={users.profileImage} alt={users.fullName} className='w-12 rounded-full' />
                                    </td>
                                    <td>{users.email}</td>
                                    <td>
                                        <button className='bg-primary text-white  rounded py-1 px-2'>{users.accountType}</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(users._id)} className={`duration-300 flex items-center gap-1 ${users?.accountType === 'Admin' ? 'text-accent' : 'text-primary hover:text-red-700'}`} disabled={users?.accountType === 'Admin'} ><FaTrash></FaTrash> Delete</button>
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

export default AllUsers;
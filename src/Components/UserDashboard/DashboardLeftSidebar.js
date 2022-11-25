import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const DashboardLeftSidebar = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('You are logged Out...')
            })
            .catch(err => console.error(err))
    }
    return (
        <div className='sticky top-10'>
            <div className='bg-accent h-[80vh] p-5 rounded-lg flex flex-col justify-between text-white'>
                <div>
                    <div className='flex items-center gap-5'>
                        <img src={user?.photoURL ? user.photoURL : 'https://i.ibb.co/mzkVLJt/profile.png'} alt={user?.displayName} className="w-16 h-16 rounded-full" />
                        <span>
                            <h3 className='text-xl font-semibold'>{user?.displayName}</h3>
                            <h5 className='font-semibold'>{user?.email}</h5>
                        </span>
                    </div>
                    <div className='mt-10 ml-5'>
                        <ul className='font-semibold flex flex-col gap-3'>
                            <Link to='/dashboard' className='duration-500 ease-in-out hover:bg-innova hover:text-white py-1 px-2 rounded'>
                                <li>My Products</li>
                            </Link>
                            <Link to='/dashboard/addProduct' className='hover:bg-innova hover:text-white py-1 px-2 rounded'>
                                <li>Add A Product</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <Link onClick={handleLogOut} className='flex gap-2 font-semibold'>Logout<AiOutlineLogout className='w-6 h-6 text-white'></AiOutlineLogout></Link>
            </div>
        </div>
    );
};

export default DashboardLeftSidebar;
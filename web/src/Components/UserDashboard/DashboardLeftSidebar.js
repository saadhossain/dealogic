import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useUser from '../../hooks/UseUser/useUser';

const DashboardLeftSidebar = () => {
    const { user, logOut } = useContext(AuthContext);
    //Get LoggedIn user by using useUser hook
    const { loggedInUser } = useUser(user?.email);
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('You are logged Out...');
            })
            .catch(err => console.error(err));
    };
    return (
        <div className='sticky top-10'>
            <div className='bg-accent p-5 rounded-lg flex flex-col justify-between text-white'>
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
                            <Link    to='/dashboard' className='duration-500 ease-in-out hover:bg-primary text-white py-1 px-2 rounded border-b-2 border-primary'>
                                <li>Dashboard</li>
                            </Link>
                            {/* //Conditionally showing Admin menus */}
                            {
                                loggedInUser?.accountType === 'Admin' && <>
                                    <Link    to='/dashboard/allproducts' className='duration-500 ease-in-out hover:bg-primary text-white py-1 px-2 rounded border-b-2 border-primary'>
                                        <li>All Products</li>
                                    </Link>
                                    <Link    to='/dashboard/addProduct' className='hover:bg-primary text-white py-1 px-2 rounded border-b-2 border-primary'>
                                        <li>Add A Product</li>
                                    </Link>
                                    <Link    to='/dashboard/allusers' className='hover:bg-primary text-white py-1 px-2 rounded border-b-2 border-primary'>
                                        <li>All Users</li>
                                    </Link>
                                    <Link    to='/dashboard/sellers' className='hover:bg-primary text-white py-1 px-2 rounded border-b-2 border-primary'>
                                        <li>All Seller</li>
                                    </Link>
                                    <Link    to='/dashboard/buyers' className='hover:bg-primary text-white py-1 px-2 rounded border-b-2 border-primary'>
                                        <li>All Buyer</li>
                                    </Link>
                                    <Link    to='/dashboard/publishblog' className='hover:bg-primary text-white py-1 px-2 rounded border-b-2 border-primary'>
                                        <li>Publish A Blog</li>
                                    </Link>
                                    <Link    to='/dashboard/bookedproducts' className='hover:bg-primary text-white py-1 px-2 rounded border-b-2 border-primary'>
                                        <li>Booked Products</li>
                                    </Link>
                                </>
                            }
                            {/* //Conditionally showing Seller menus */}
                            {
                                loggedInUser?.accountType === 'Seller' && <>
                                    <Link to='/dashboard/myproducts' className='duration-500 ease-in-out hover:bg-primary text-white py-1 px-2 rounded border-b-2 border-primary'>
                                        <li>My Products</li>
                                    </Link>
                                    <Link to='/dashboard/addProduct' className='hover:bg-primary text-white py-1 px-2 rounded border-b-2 border-primary'>
                                        <li>Sell A Product</li>
                                    </Link></>
                            }
                            {/* //Conditionally showing buyer menus */}
                            {
                                loggedInUser?.accountType === 'Buyer' && <>
                                    <Link to='/dashboard/mypurchase' className='duration-500 ease-in-out hover:bg-primary text-white py-1 px-2 rounded border-b-2 border-primary'>
                                        <li>My Purchases</li>
                                    </Link>
                                    <Link to='/dashboard/addProduct' className='hover:bg-primary text-white py-1 px-2 rounded border-b-2 border-primary'>
                                        <li>Sell A Product</li>
                                    </Link></>
                            }
                        </ul>
                    </div>
                </div>
                <Link
                    onClick={handleLogOut}
                    className='flex gap-2 font-semibold mt-5 hover:text-primary'>
                    Logout
                    <AiOutlineLogout className='w-6 h-6 text-white hover:text-primary'>
                    </AiOutlineLogout>
                </Link>
            </div>
        </div>
    );
};

export default DashboardLeftSidebar;
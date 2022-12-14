import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assests/logo.png';
import { AuthContext } from '../../Context/AuthProvider';

const Header = () => {
    const [expand, setExpand] = useState(false);
    //get user form the context
    const { user, logOut } = useContext(AuthContext)

    //Handle User logout
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('User Logged Out...')
            })
    }
    return (
        <div className='border-b border-gray-500'>
            <div className='w-11/12 lg:w-10/12 mx-auto my-1 flex justify-between items-center'>
                <Link to='/'><img src={logo} alt='dealogic' className='w-28' /></Link>
                <div className='flex items-center gap-2'>
                    <ul className={`lg:flex items-center gap-3 font-semibold absolute lg:static py-5 lg:py-2 px-10 shadow-lg lg:shadow-none duration-500 ease-in-out bg-white z-40 ${expand ? 'top-8 right-0' : 'top-[-200px] right-0'}`}>
                        <li className='hover:text-dealogic'><NavLink to='/'>Home</NavLink></li>
                        <li className='hover:text-dealogic'><NavLink to='/blogs'>Blog</NavLink></li>
                        <li className='hover:text-dealogic'><NavLink to='/dashboard/addProduct'>Add A Product</NavLink></li>
                        {
                            user?.email
                                ? <>
                                    <Link to='/dashboard'>
                                        <li className='hover:text-dealogic'>Dashboard</li>
                                    </Link>
                                    <div className='flex items-center gap-2'>
                                        <Link to='/dashboard'>
                                            <img src={user?.photoURL ? user.photoURL : ''} alt={user?.displayName} className='w-10 h-10 rounded-full' />
                                        </Link>
                                        <Link onClick={handleLogOut}>
                                            <AiOutlineLogout className='w-6 h-6 text-accent'></AiOutlineLogout>
                                        </Link>
                                    </div>
                                </>
                                : <li className='hover:text-dealogic'><NavLink to='/login'>Login</NavLink></li>
                        }
                    </ul>
                    <div onClick={() => setExpand(!expand)} className='w-8 h-8 lg:hidden text-dealogic font-bold'>
                        {
                            expand ? <XMarkIcon></XMarkIcon> : <Bars3Icon></Bars3Icon>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
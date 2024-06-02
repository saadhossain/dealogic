import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import addProduct from '../../assests/icons/add-product.png';
import blog from '../../assests/icons/blogs.png';
import dashboard from '../../assests/icons/dashboard.png';
import home from '../../assests/icons/home.png';
import login from '../../assests/icons/login.png';
import products from '../../assests/icons/products.png';
import logo from '../../assests/logo.png';

const Header = () => {
    const [expand, setExpand] = useState(false);
    //get user form the context
    const { user } = useContext(AuthContext);
    return (
        <div className='bg-[#E2F4FE] py-2'>
            <div className='w-11/12 lg:w-10/12 mx-auto flex justify-between items-center'>
                <Link to='/'><img src={logo} alt='dealogic' className='w-28' /></Link>
                <div className='flex items-center gap-2'>
                    <ul className={`lg:flex items-center gap-6 bg-[#E2F4FE] w-full font-semibold absolute lg:static py-3 lg:py-2 px-10 shadow-lg lg:shadow-none duration-500 ease-in-out z-40 text-primary ${expand ? 'top-12 right-0' : 'top-[-400px] right-0'}`}>
                        <li onClick={()=> setExpand(false)}>
                            <NavLink to='/' className='flex gap-1 mb-3 lg:mb-0'>
                                <img src={home} alt='Home Icon' className='w-6 ' />Home
                            </NavLink>
                        </li>
                        <li onClick={()=> setExpand(false)}>
                            <NavLink to='/blogs' className='flex gap-1 mb-3 lg:mb-0'>
                                <img src={blog} alt='Blog Icon' className='w-6 ' />Blog
                            </NavLink>
                        </li>
                        <li onClick={()=> setExpand(false)}>
                            <NavLink to='/products' className='flex gap-1 mb-3 lg:mb-0'>
                                <img src={products} alt='Blog Icon' className='w-6 ' />Products
                            </NavLink>
                        </li>
                        <li onClick={()=> setExpand(false)}>
                            <NavLink to='/dashboard/addProduct' className='flex gap-1 mb-3 lg:mb-0'>
                                <img src={addProduct} alt='Add Product' className='w-6 ' />Sell
                            </NavLink>
                        </li>
                        {
                            user?.email
                                ? <>
                                    <Link to='/dashboard' onClick={() => setExpand(false)}>
                                        <li className='flex gap-1 mb-3 lg:mb-0'><img src={dashboard} alt='dashboard' className='w-6 ' />Dashboard</li>
                                    </Link>
                                    <div
                                        className='flex items-center gap-2'
                                        onClick={() => setExpand(false)}
                                    >
                                        <Link to='/dashboard' className='flex items-center gap-1'>
                                            <img src={user?.photoURL ? user.photoURL : ''} alt={user?.displayName} className='w-9 h-9 rounded-full border-2 border-primary' />
                                            <span className='md:hidden'>My Account</span>
                                        </Link>
                                    </div>
                                </>
                                : <NavLink to='/login'><img src={login} alt='login' className='w-6 ' /></NavLink>
                        }
                    </ul>
                    <div onClick={() => setExpand(!expand)} className='w-8 h-8 lg:hidden text-primary font-bold'>
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
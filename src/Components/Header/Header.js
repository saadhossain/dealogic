import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assests/logo.png';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

const Header = () => {
    const [expand, setExpand] = useState(false);
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-1 flex justify-between items-center'>
            <Link to='/'><img src={logo} alt='Innova' className='w-28'/></Link>
            <div className='flex items-center gap-2'>
                <ul className={`md:flex gap-3 font-semibold absolute md:static py-5 px-10 shadow-lg md:shadow-none ${expand ? 'top-8 right-0' : 'top-[-200px] right-0'}`}>
                    <li className='hover:text-innova'><NavLink to='/'>Home</NavLink></li>
                    <li className='hover:text-innova'><NavLink to='/blogs'>Blog</NavLink></li>
                    <li className='hover:text-innova'><NavLink to='/sell'>Sell</NavLink></li>
                    <li className='hover:text-innova'><NavLink to='/login'>Login</NavLink></li>
                </ul>
                <div onClick={()=> setExpand(!expand)} className='w-6 h-6 lg:hidden'>
                    {
                        expand ? <XMarkIcon></XMarkIcon> : <Bars3Icon></Bars3Icon>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;
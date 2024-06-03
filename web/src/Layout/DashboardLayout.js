import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';
import DashboardLeftSidebar from '../Components/UserDashboard/DashboardLeftSidebar';
import { AuthContext } from '../Context/AuthProvider';

const DashboardLayout = () => {
    const { isExpand, setIsExpand } = useContext(AuthContext);
    return (
        <div>
            <Header></Header>
            <div className='w-11/12 lg:w-10/12 mx-auto flex gap-5 my-5'>
                <div className={`w-11/12 lg:w-[30%] lg:sticky top-10 absolute z-20 duration-500 ease-in-out ${isExpand ? 'top-[110px] right-0' : 'top-[-550px] right-0'}`}>
                    <DashboardLeftSidebar ></DashboardLeftSidebar>
                </div>
                <div className='w-full lg:w-[70%]'>
                    <div className='md:hidden text-xl font-bold flex justify-between items-center gap-2 bg-primary text-white py-1 px-2 mb-5 rounded-t'>
                        <Link to='/dashboard'>Dashboard</Link>
                        <div onClick={() => setIsExpand(!isExpand)}>
                            {
                                isExpand ? <XMarkIcon className='w-8 h-8'></XMarkIcon> : <Bars3Icon className='w-8 h-8'></Bars3Icon>
                            }
                        </div>
                    </div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
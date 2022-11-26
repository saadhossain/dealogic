import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';
import DashboardLeftSidebar from '../Components/UserDashboard/DashboardLeftSidebar';

const DashboardLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className='w-11/12 lg:w-10/12 mx-auto flex gap-5 my-5'>
                <div className='w-1/4 sticky top-10'>
                    <DashboardLeftSidebar></DashboardLeftSidebar>
                </div>
                <div className='w-3/4'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
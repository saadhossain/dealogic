import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';

const DashboardLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className='w-11/12 lg:w-10/12 mx-auto flex gap-5'>
                <div><h1>Left Sidebar</h1></div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;
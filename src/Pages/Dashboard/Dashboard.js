import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import useUser from '../../hooks/UseUser/useUser';
import AdminStatistics from './AdminStatistics';
import BuyerStatistics from './BuyerStatistics';
import SellerStatistics from './SellerStatistics';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    //Get the User 
    const {loggedInUser} = useUser(user?.email)
    return (
        <div>
            <div className='relative'>
                <h1 className='text-2xl lg:text-4xl font-bold text-innova mb-10'>Statistics</h1>
                <div className='border-2 border-innova w-20 absolute top-6 lg:top-8 left-28 lg:left-40'></div>
            </div>
            <div>
                {/* For admin */}
                {
                    loggedInUser.accountType === 'Admin' && <AdminStatistics></AdminStatistics>
                }
                {/* for buyer */}
                {
                    loggedInUser.accountType === 'Buyer' && <BuyerStatistics></BuyerStatistics>
                }
                {/* for seller */}
                {
                    loggedInUser.accountType === 'Seller' && <SellerStatistics></SellerStatistics>
                }
            </div>
        </div>
    );
};

export default Dashboard;
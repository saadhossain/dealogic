import React, { useContext } from 'react';
import Loader from '../../Components/Spinners/Loader';
import { AuthContext } from '../../Context/AuthProvider';
import useUser from '../../hooks/UseUser/useUser';
import AdminStatistics from './AdminStatistics';
import BuyerStatistics from './BuyerStatistics';
import SellerStatistics from './SellerStatistics';
import Heading from '../../Components/Heading';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    //Get the User 
    const { loggedInUser, userLoading } = useUser(user?.email);
    if (userLoading) {
        return <Loader></Loader>;
    }
    return (
        <div>
            <Heading heading={'Statistics'}/>
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
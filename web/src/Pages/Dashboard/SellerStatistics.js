import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const SellerStatistics = () => {
    const { user, logOut } = useContext(AuthContext);
    //Get Products for logged in users
    const { data: myProducts = [] } = useQuery({
        queryKey: ['myProducts', user?.email, logOut],
        queryFn: () => fetch(`https://dealogic-server-omega.vercel.app/seller/products?email=${user?.email}`, {
            headers: {
                authorization: `Beareer ${localStorage.getItem('AccessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error('Sorry! You are not authorized to access the data');
                    return logOut();
                }
                res.json();
            })
    });
    //total Purchase Price
    const totalPurchasePrice = myProducts.reduce((prev, current) => prev + parseFloat(current.resalePrice), 0);
    return (
        <div>
            {
                myProducts.length > 0 && <div className='w-72 shadow-xl rounded-lg p-5 bg-slate-50'>
                    <h3 className='text-2xl font-bold'>Total Purchase: <span className='text-dealogic'>{myProducts.length}</span></h3>
                    <h3 className='text-2xl font-bold'>Total Price: <span className='text-dealogic'>${totalPurchasePrice}</span></h3>
                    <Link to='/dashboard/mypurchase'>
                        <button className='py-2 mt-5 w-full rounded text-white font-semibold bg-dealogic hover:bg-secondary'>See All</button>
                    </Link>
                </div>
            }
        </div>
    );
};

export default SellerStatistics;
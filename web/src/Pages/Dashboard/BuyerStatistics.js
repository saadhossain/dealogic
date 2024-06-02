import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const BuyerStatistics = () => {
    const { user, logOut } = useContext(AuthContext);
    //Get Purchase products
    const { data: myPurchases = [] } = useQuery({
        queryKey: ['myPurchases', user?.email],
        queryFn: () => fetch(`${process.env.REACT_APP_API}/mypurchase?email=${user?.email}`, {
            headers: {
                authorization: `Beareer ${localStorage.getItem('AccessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error('Sorry! You are not authorized to access the data');
                    return logOut();
                }
                return res.json();
            })
    });
    //total Purchase Price
    const totalPurchasePrice = myPurchases.reduce((prev, current) => prev + parseFloat(current.resalePrice), 0);
    return (
        <div>
            {
                myPurchases.length > 0 && <div className='w-72 shadow-xl rounded-lg p-5 bg-slate-50'>
                    <h3 className='text-2xl font-bold'>Total Purchase: <span className='text-primary'>{myPurchases.length}</span></h3>
                    <h3 className='text-2xl font-bold'>Total Price: <span className='text-primary'>${totalPurchasePrice}</span></h3>
                    <Link to='/dashboard/mypurchase'>
                        <button className='py-2 mt-5 w-full rounded text-white font-semibold bg-primary hover:bg-secondary'>See All</button>
                    </Link>
                </div>
            }
        </div>
    );
};

export default BuyerStatistics;
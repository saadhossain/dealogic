import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const BuyerStatistics = () => {
    const {user} = useContext(AuthContext)
    //Get Purchase products
    const { data: myPurchases = [] } = useQuery({
        queryKey: ['myPurchases', user?.email],
        queryFn: () => fetch(`http://localhost:5000/mypurchase?email=${user?.email}`)
            .then(res => res.json())
    })
    //total Purchase Price
    const totalPurchasePrice = myPurchases.reduce((prev, current) => prev + parseFloat(current.resalePrice), 0)
    return (
        <div>
            {
                myPurchases.length > 0 && <div className='shadow-xl rounded-lg p-5 bg-slate-50'>
                    <h3 className='text-2xl font-bold'>Total Purchase: <span className='text-innova'>{myPurchases.length}</span></h3>
                    <h3 className='text-2xl font-bold'>Total Price: <span className='text-innova'>${totalPurchasePrice}</span></h3>
                    <Link to='/dashboard/mypurchase'>
                        <button className='py-2 mt-5 w-full rounded text-white font-semibold bg-innova hover:bg-secondary'>See All</button>
                    </Link>
                </div>
            }
        </div>
    );
};

export default BuyerStatistics;
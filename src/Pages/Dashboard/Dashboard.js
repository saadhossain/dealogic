import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    //Get Purchase products
    const { data: myPurchases = [] } = useQuery({
        queryKey: ['myPurchases', user?.email],
        queryFn: () => fetch(`http://localhost:5000/mypurchase?email=${user?.email}`)
            .then(res => res.json())
    })
    //total Purchase Price
    const totalPurchasePrice = myPurchases.reduce((prev, current) => prev + parseFloat(current.resalePrice), 0)
    //Get Products for logged in users
    const { data: myProducts = [] } = useQuery({
        queryKey: ['myProducts', user?.email],
        queryFn: () => fetch(`http://localhost:5000/products?email=${user?.email}`)
            .then(res => res.json())
    })
    return (
        <div>
            <div className='relative'>
                <h1 className='text-xl lg:text-4xl font-bold text-innova mb-10'>Stastics</h1>
                <div className='border-2 border-innova w-20 absolute top-8 left-40'></div>
            </div>
            <div className='grid lg:grid-cols-3 gap-5'>
                {
                    myPurchases.length > 0 && <div className='shadow-xl rounded-lg p-5 bg-slate-50'>
                        <h3 className='text-2xl font-bold'>Total Purchase: <span className='text-innova'>{myPurchases.length}</span></h3>
                        <h3 className='text-2xl font-bold'>Total Price: <span className='text-innova'>${totalPurchasePrice}</span></h3>
                        <Link to='/dashboard/mypurchase'>
                            <button className='py-2 mt-5 w-full rounded text-white font-semibold bg-innova hover:bg-secondary'>See All</button>
                        </Link>
                    </div>
                }
                {
                    myProducts.length > 0 && <div>
                        <h3>{myProducts.length}</h3>
                    </div>
                }
            </div>
        </div>
    );
};

export default Dashboard;
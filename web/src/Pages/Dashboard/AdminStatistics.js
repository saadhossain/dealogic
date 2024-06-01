import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminStatistics = () => {
    //Get All Products from the database
    const { data: allProducts = [] } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const res = await fetch('https://dealogic-server-omega.vercel.app/products');
            const data = await res.json();
            return data;
        }
    });
    const totalPurchasePrice = allProducts.reduce((prev, current) => prev + parseFloat(current.resalePrice), 0);

    //Get all Users from the database
    const { data: allUsers = [] } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await fetch('https://dealogic-server-omega.vercel.app/users');
            const data = await res.json();
            return data;
        }
    });
    //Get all booked products from the database
    const { data: bookeProducts = [] } = useQuery({
        queryKey: ['bookeProducts'],
        queryFn: async () => {
            const res = await fetch('https://dealogic-server-omega.vercel.app/booked');
            const data = await res.json();
            return data;
        }
    });
    //Get all the buyers from the database
    const { data: buyers = [] } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch('https://dealogic-server-omega.vercel.app/users/buyers');
            const data = await res.json();
            return data;
        }
    });
    //Get all the sellers from the database
    const { data: sellers = [] } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('https://dealogic-server-omega.vercel.app/users/sellers');
            const data = await res.json();
            return data;
        }
    });
    const totalBookedPrice = bookeProducts.reduce((prev, current) => prev + parseFloat(current.resalePrice), 0);
    return (
        <div className='w-full grid lg:grid-cols-3 gap-5'>
            {/* All Products Card */}
            <div>
                {
                    allProducts.length > 0 && <div className='shadow-xl rounded-lg p-5 bg-slate-50'>
                        <h3 className='text-xl font-bold text-center border-b-2 border-dealogic mb-4'>All Products</h3>
                        <h3 className='text-xl font-bold'>Total Products: <span className='text-dealogic text-2xl'>{allProducts.length}</span></h3>
                        <h3 className='text-xl font-bold'>Total Price: <span className='text-dealogic text-2xl'>${totalPurchasePrice}</span></h3>
                        <Link to='/dashboard/allproducts'>
                            <button className='py-2 mt-5 w-full rounded text-white font-semibold bg-dealogic hover:bg-secondary'>See All</button>
                        </Link>
                    </div>
                }
            </div>
            {/* All Users Card */}
            <div>
                {
                    allUsers.length > 0 && <div className='shadow-xl rounded-lg p-5 bg-slate-50'>
                        <h3 className='text-xl font-bold text-center border-b-2 border-dealogic mb-4'>All Users</h3>
                        <h3 className='text-xl font-bold'>All Users: <span className='text-dealogic text-2xl'>{allUsers.length}</span></h3>
                        <h3 className='text-lg font-bold'>
                            <Link to='/dashboard/buyers' className='hover:text-dealogic'>Buyer</Link>
                            <span className='text-dealogic text-xl'> {buyers.length} | </span>
                            <Link to='/dashboard/sellers' className='hover:text-dealogic'>Seller</Link>
                            <span className='text-dealogic text-xl'> {sellers.length} </span>
                        </h3>
                        <Link to='/dashboard/allusers'>
                            <button className='py-2 mt-5 w-full rounded text-white font-semibold bg-dealogic hover:bg-secondary'>See All</button>
                        </Link>
                    </div>
                }
            </div>
            {/* All Booked Products Card */}
            <div>
                {
                    bookeProducts.length > 0 && <div className='shadow-xl rounded-lg p-5 bg-slate-50'>
                        <h3 className='text-xl font-bold text-center border-b-2 border-dealogic mb-4'>Booked Products</h3>
                        <h3 className='text-xl font-bold'>All Booked: <span className='text-dealogic text-2xl'>{bookeProducts.length}</span></h3>
                        <h3 className='text-xl font-bold'>Total Price: <span className='text-dealogic text-2xl'>${totalBookedPrice}</span></h3>
                        <Link to='/dashboard/bookedproducts'>
                            <button className='py-2 mt-5 w-full rounded text-white font-semibold bg-dealogic hover:bg-secondary'>See All</button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default AdminStatistics;
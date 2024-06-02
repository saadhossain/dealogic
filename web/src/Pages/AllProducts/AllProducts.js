import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { RiRocket2Fill } from 'react-icons/ri';
import Heading from '../../Components/Heading';

const AllProducts = () => {
    //Get All Products from the database
    const { data: allProducts = [], refetch } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API}/products`);
            const data = await res.json();
            return data;
        }
    });
    //Set Product Status to the Database
    const handleStatusChange = (id) => {
        fetch(`${process.env.REACT_APP_API}/products/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ prodStatus: 'Sold' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Product Status Updated...');
                    refetch();
                }
            });
    };
    //Remove Product from listing
    const handleRemoveProduct = (id) => {
        const confirmation = window.confirm('Do You Want to Delete This Item?');
        if (confirmation) {
            fetch(`${process.env.REACT_APP_API}/products/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.error('One Product has been Deleted...');
                        refetch();
                    }
                });
        }
    };
    //Promote Product by Seller
    const handlePromote = (id) => {
        fetch(`${process.env.REACT_APP_API}/products/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ promoted: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Product Boosted Successfully....');
                    refetch();
                }
            });
    };
    return (
        <div>
            <Heading heading={'All Products'}/>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product Name</th>
                                <th>Regular Price</th>
                                <th>Sale Price</th>
                                <th>Status</th>
                                <th>Promote</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='font-semibold'>
                            {
                                allProducts.map((product, idx) => <tr
                                    key={product._id}
                                >
                                    <th>{idx + 1}</th>
                                    <td>{product.proName}</td>
                                    <td>${product.regularPrice}</td>
                                    <td>${product.resalePrice}</td>
                                    <td className='flex items-center gap-1'>
                                        <button
                                            onClick={() => handleStatusChange(product._id)}
                                            className={`duration-300 py-1 px-2 rounded text-white font-semibold ${product.prodStatus === 'Sold' ? 'bg-accent' : 'bg-primary hover:bg-secondary'}`}
                                            disabled={product.prodStatus === 'Sold'}
                                        >
                                            {product.prodStatus === 'Sold' ? 'Sold' : 'Mark Sold'}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handlePromote(product._id)}
                                            className={`flex items-center duration-300 py-1 px-2 rounded text-white ${product.promoted ? 'bg-accent' : 'bg-primary hover:bg-secondary'}`}
                                            disabled={product.promoted}
                                        >
                                            <RiRocket2Fill></RiRocket2Fill>
                                            {product.promoted ? 'Promoted' : 'Promote'}</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleRemoveProduct(product._id)} className='text-primary hover:text-red-700 duration-300'><FaTrash></FaTrash></button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
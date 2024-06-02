import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { RiRocket2Fill } from 'react-icons/ri';
import Heading from '../../Components/Heading';

const BookedProducts = () => {
    //Get all booked products from the database
    const { data: bookeProducts = [], refetch } = useQuery({
        queryKey: ['bookeProducts'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API}/booked`);
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
    return (
        <div>
            <Heading heading={'Booked Products'}/>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product Name</th>
                                <th>Regular Price</th>
                                <th>Sale Price</th>
                                <th>Availability</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='font-semibold'>
                            {
                                bookeProducts.map((product, idx) => <tr
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
                                            className='flex items-center duration-300 py-1 px-2 rounded text-white bg-accent'
                                            disabled={product.promoted}
                                        >
                                            <RiRocket2Fill></RiRocket2Fill>
                                            {product.promoted && 'Promoted'}</button>
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

export default BookedProducts;
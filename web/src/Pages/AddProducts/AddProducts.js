import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from '../../Components/Spinners/ButtonLoader';
import { AuthContext } from '../../Context/AuthProvider';
import useUser from '../../hooks/UseUser/useUser';
import { uploadImageToFirestore } from '../../utils/utils';

const AddProducts = () => {
    //Get the Logged in user information from the context
    const { user } = useContext(AuthContext);
    const { loggedInUser } = useUser(user?.email);
    //Navigate
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    useEffect(() => {
        fetch('https://dealogic-server-omega.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategory(data));
    }, []);
    //Set all Input Values
    const [productDetails, setProductDetails] = useState();
    //Set Product Condition to a state
    const [productCondition, setProductCondition] = useState('Excellent');
    //Set Product Category to a State 
    const [productCategory, setProductCategory] = useState('processor');
    //Handle Input Values
    const handleValues = (e) => {
        e.preventDefault();
        const field = e.target.name;
        const value = e.target.value;
        const updatedDetails = { ...productDetails };
        updatedDetails[field] = value;
        setProductDetails(updatedDetails);
    };
    //Loading state
    const [loading, setLoading] = useState(false);
    //Handle add /sell product functionality
    const handleAddProduct = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const productImage = e.target.productImage.files[0];
            //Set Product Image to the firebase storage
            const productImageURL = await uploadImageToFirestore('productImages', productImage);
            const productInfo = {
                ...productDetails,
                productImageURL,
                productCondition,
                productCategory,
                sellerName: loggedInUser?.fullName,
                sellerEmail: loggedInUser?.email,
                sellerVerified: loggedInUser?.verified,
                booked: false,
                addedOn: new Date(),
                prodStatus: 'Available',
            };
            const res = await fetch('https://dealogic-server-omega.vercel.app/products', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(productInfo)
            });
            const data = await res.json();
            if (data.acknowledged) {
                toast.success('New Product Added Successfully...');
                e.target.reset();
                if (loggedInUser === 'Seller') {
                    navigate('/dashboard/myproducts');
                }
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    return (
        <div className='w-full flex flex-col p-6 rounded-lg bg-slate-50 text-gray-700 shadow-xl'>
            <div className='relative'>
                <h1 className='text-xl lg:text-4xl font-bold text-dealogic mb-10'>Add A Product</h1>
                <div className='border-2 border-dealogic w-20 absolute top-8 left-64'></div>
            </div>
            <form onSubmit={handleAddProduct}>
                <div className="space-y-4">
                    {/* Product Information Section */}
                    <h3 className='text-2xl font-semibold text-dealogic'>Product Information</h3>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
                        <div>
                            <label htmlFor="proName" className="mb-2 text-lg">Product Name</label>
                            <input onBlur={handleValues} type="text" name="proName" id="proName" placeholder="Enter Product Name" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" required />
                        </div>
                        <div>
                            <label htmlFor="regularPrice" className="mb-2 text-lg">Regular Price</label>
                            <input onBlur={handleValues} type="digit" name="regularPrice" id="regularPrice" placeholder="eg: $120" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" required />
                        </div>
                        <div>
                            <label htmlFor="resalePrice" className="mb-2 text-lg">Resale Price</label>
                            <input onBlur={handleValues} type="digit" name="resalePrice" id="resalePrice" placeholder="eg: $80" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" required />
                        </div>
                        <div>
                            <label htmlFor="condition" className="mb-2 text-lg">Product Condition</label>
                            <select onChange={e => setProductCondition(e.target.value)} name="condition" id="condition" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800">
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
                        <div>
                            <label htmlFor="usedDuration" className="mb-2 text-lg">Duration of Use</label>
                            <input onBlur={handleValues} type="text" name="usedDuration" id="usedDuration" placeholder="eg: 2 Years" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" required />
                        </div>
                        <div>
                            <label htmlFor="purchaseYear" className="mb-2 text-lg">Year of purchase</label>
                            <input onBlur={handleValues} type="text" name="purchaseYear" id="purchaseYear" placeholder="eg: 2020" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" required />
                        </div>
                        <div>
                            <label htmlFor="category" className="mb-2 text-lg">Product Category</label>
                            <select onChange={e => setProductCategory(e.target.value)} name="category" id="category" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800">
                                <option value={category[0]?.catSlug}>{category[0]?.categoryName}</option>
                                <option value={category[1]?.catSlug}>{category[1]?.categoryName}</option>
                                <option value={category[2]?.catSlug}>{category[2]?.categoryName}</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="location" className="mb-2 text-lg">Product Location</label>
                            <input onBlur={handleValues} type="text" name="location" id="location" placeholder="eg: Dhaka" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" required />
                        </div>

                    </div>
                    <div>
                        <label htmlFor="productImage" className="mb-2 text-lg block">Product Image</label>
                        <input type="file" name="productImage" id="productImage" className="w-full px-3 py-2" required />
                        <label htmlFor="regularPrice" className="mb-2 text-lg">Image Dimension: <span className='font-semibold'>450px by 300px</span></label>
                    </div>
                    <div>
                        <label htmlFor="description" className="mb-2 text-lg block">Product Description</label>
                        <textarea onBlur={handleValues} name="description" id="description" rows="3" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" placeholder='Product Description' ></textarea>
                    </div>
                    {/* Product information section end */}

                    {/* Seller Information section start */}
                    <h3 className='text-2xl font-semibold text-dealogic'>Seller Information</h3>
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-2'>
                        <div>
                            <label htmlFor="seller" className="mb-2 text-lg">Seller Name</label>
                            <input type="text" name="seller" id="seller" placeholder={loggedInUser?.fullName} disabled className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="sellerEmail" className="mb-2 text-lg">Seller Email</label>
                            <input type="email" name="sellerEmail" id="sellerEmail" placeholder={loggedInUser?.email} disabled className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="sellerPhone" className="mb-2 text-lg">Contact Number</label>
                            <input onBlur={handleValues} type="tel" name="sellerPhone" id="sellerPhone" placeholder="eg: +88018X-XXXXXXX" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" required />
                        </div>
                    </div>
                    {/* Seller Information section end */}
                </div>
                <div className='flex justify-center my-5'>
                    <button type='submit' className='bg-dealogic duration-500 ease-in-out hover:bg-secondary text-white font-semibold py-3 px-10 rounded'>{loading ? <ButtonLoader title='Adding Product' /> : 'Add Product'}</button>
                </div>
            </form>
        </div>
    );
};

export default AddProducts;
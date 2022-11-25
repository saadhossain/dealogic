import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';

const AddProducts = () => {
    //Get the Logged in user information from the context
    const {user} = useContext(AuthContext)
    const [category, setCategory] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategory(data))
    }, [])
    //Set all Input Values
    const [productDetails, setProductDetails] = useState()
    //Set Product Condition to a state
    const [productCondition, setProductCondition] = useState('Excellent')
    //Set Product Category to a State 
    const [productCategory, setProductCategory] = useState('processor')
    //Handle Input Values
    const handleValues = (e) => {
        e.preventDefault()
        const field = e.target.name;
        const value = e.target.value;
        const updatedDetails = {...productDetails}
        updatedDetails[field] = value;
        setProductDetails(updatedDetails)
    }
    //Handle add /sell product functionality
    const handleAddProduct =(e) => {
        e.preventDefault()
        const productImage = e.target.productImage.files[0];
        const formData = new FormData()
        formData.append('image', productImage)
        //Set Product Image to the IMGBB Server
        fetch('https://api.imgbb.com/1/upload?key=ee7085d23184f77801d3c6950c563d75', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            const productImageURL = data.data.url;
            //Product Detailed info
            const productInfo = {
                ...productDetails,
                productImageURL,
                productCondition,
                productCategory,
                sellerName: user?.displayName,
                sellerEmail: user?.email,
                addedOn: new Date(),
                prodStatus: 'Available',
            }
            //Save New Product to the Database
            fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(productInfo)
            })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    toast.success('New Product Added Successfully...')
                    e.target.reset()
                }
            })
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err))

    }
    return (
        <div className='w-full flex flex-col p-6 rounded-lg bg-slate-50 text-gray-700 shadow-xl'>
            <div className='relative'>
                <h1 className='text-xl lg:text-4xl font-bold text-innova mb-10'>Add A Product</h1>
                <div className='border-2 border-innova w-20 absolute top-8 left-64'></div>
            </div>
            <form onSubmit={handleAddProduct}>
                <div className="space-y-4">
                    {/* Product Information Section */}
                    <h3 className='text-2xl font-semibold text-innova'>Product Information</h3>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
                        <div>
                            <label htmlFor="proName" className="mb-2 text-lg">Product Name</label>
                            <input onBlur={handleValues} type="text" name="proName" id="proName" placeholder="Enter Product Name" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="regularPrice" className="mb-2 text-lg">Regular Price</label>
                            <input onBlur={handleValues} type="digit" name="regularPrice" id="regularPrice" placeholder="eg: $120" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="resalePrice" className="mb-2 text-lg">Resale Price</label>
                            <input onBlur={handleValues} type="digit" name="resalePrice" id="resalePrice" placeholder="eg: $80" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
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
                            <input onBlur={handleValues} type="text" name="usedDuration" id="usedDuration" placeholder="eg: 2 Years" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="purchaseYear" className="mb-2 text-lg">Year of purchase</label>
                            <input onBlur={handleValues} type="text" name="purchaseYear" id="purchaseYear" placeholder="eg: 2020" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="category" className="mb-2 text-lg">Product Category</label>
                            <select onChange={e => setProductCategory(e.target.value) } name="category" id="category" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800">
                                <option value={category[0]?.catSlug}>{category[0]?.categoryName}</option>
                                <option value={category[1]?.catSlug}>{category[1]?.categoryName}</option>
                                <option value={category[2]?.catSlug}>{category[2]?.categoryName}</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="location" className="mb-2 text-lg">Product Location</label>
                            <input onBlur={handleValues} type="text" name="location" id="location" placeholder="eg: Dhaka" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>

                    </div>
                    <div>
                        <label htmlFor="productImage" className="mb-2 text-lg block">Product Image</label>
                        <input type="file" name="productImage" id="productImage" className="w-full px-3 py-2" />
                        <label htmlFor="regularPrice" className="mb-2 text-lg">Image Dimension: <span className='font-semibold'>450px by 300px</span></label>
                    </div>
                    <div>
                        <label htmlFor="description" className="mb-2 text-lg block">Product Description</label>
                        <textarea onBlur={handleValues} name="description" id="description" rows="3" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" placeholder='Product Description' ></textarea>
                    </div>
                    {/* Product information section end */}

                    {/* Seller Information section start */}
                    <h3 className='text-2xl font-semibold text-innova'>Seller Information</h3>
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-2'>
                        <div>
                            <label htmlFor="seller" className="mb-2 text-lg">Seller Name</label>
                            <input type="text" name="seller" id="seller" placeholder={user?.displayName} disabled className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="sellerEmail" className="mb-2 text-lg">Seller Email</label>
                            <input type="email" name="sellerEmail" id="sellerEmail" placeholder={user?.email} disabled className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="sellerPhone" className="mb-2 text-lg">Contact Number</label>
                            <input onBlur={handleValues} type="tel" name="sellerPhone" id="sellerPhone" placeholder="eg: +88018X-XXXXXXX" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                    </div>
                    {/* Seller Information section end */}
                </div>
                <div className='flex justify-center my-5'>
                    <button type='submit' className='bg-innova text-white font-semibold py-3 px-10 rounded'>Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProducts;
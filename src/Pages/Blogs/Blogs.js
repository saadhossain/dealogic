import { useQuery } from '@tanstack/react-query';
import React from 'react';
import DisplayBlogs from '../../Components/BlogsComp/DisplayBlogs';

const Blogs = () => {

    //Get All Blogs
    const {data: blogs = []} = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://innova-server.vercel.app/blogs');
            const data = await res.json()
            return data
        }
    })
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-5'>
            <div className='relative'>
                <h1 className='text-2xl lg:text-4xl font-bold text-innova mb-10'>All Products</h1>
                <div className='border-2 border-innova w-20 absolute top-8 left-36 lg:left-52'></div>
            </div>

            {/* //Show All blogs */}
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    blogs.map(blog => <DisplayBlogs
                    key={blog._id}
                    blog={blog}
                    ></DisplayBlogs>)
                }
            </div>
        </div>
    );
};

export default Blogs;
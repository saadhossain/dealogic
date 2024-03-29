import { useQuery } from '@tanstack/react-query';
import React from 'react';
import DisplayBlogs from '../../BlogsComp/DisplayBlogs';
import Loader from '../../Spinners/Loader';
const LatestArticles = () => {

    //Get All Blogs
    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://dealogic.vercel.app/latestblogs');
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className='bg-[#E2F4FE] py-5'>
            <div className='w-11/12 lg:w-10/12 mx-auto my-5'>
                <div className='relative'>
                    <h1 className='text-2xl lg:text-4xl font-bold text-dealogic mb-10'>Latest Articles</h1>
                    <div className='border-2 border-dealogic w-20 absolute top-8 left-32 lg:left-60'></div>
                </div>

                {/* //Show All blogs */}
                <div className='grid lg:grid-cols-3 gap-5'>
                    {
                        blogs.map(blog => <DisplayBlogs
                            key={blog._id}
                            blog={blog}
                        ></DisplayBlogs>)
                    }
                </div>
            </div>
        </div>
    );
};

export default LatestArticles;
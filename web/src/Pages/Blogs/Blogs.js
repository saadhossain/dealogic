import { useQuery } from '@tanstack/react-query';
import React from 'react';
import DisplayBlogs from '../../Components/BlogsComp/DisplayBlogs';
import Loader from '../../Components/Spinners/Loader';
import Heading from '../../Components/Heading';

const Blogs = () => {

    //Get All Blogs
    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API}/blogs`);
            const data = await res.json();
            return data;
        }
    });
    if (isLoading) {
        return <Loader></Loader>;
    }
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-5'>
            <Heading heading={'All Articles'}/>

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
    );
};

export default Blogs;
import dateFormat from "dateformat";
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const BlogDetails = () => {
    const blog = useLoaderData()[0]
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-5'>
            <div className="card card-compact  bg-base-100 shadow-lg hover:shadow-2xl duration-500 cursor-pointer">
                <figure><img src={blog.blogImage} alt={blog.blogTitle} className='w-[600px] rounded-l mt-10' /></figure>
                <div className="card-body font-semibold">
                    <h2 className="text-xl font-semibold">{blog.blogTitle}</h2>
                    <hr className="border-1 border-gray-400" />
                    <div dangerouslySetInnerHTML={{__html:blog.description}}>

                    </div>
                    <hr className="border-1 border-gray-400" />
                    <div className='flex items-center gap-2'>
                        <img src={blog.authorImage} alt={blog.authorName} className='w-12 rounded-full' />
                        <div>
                            <p>{blog.authorName}</p>
                            <p>On: {dateFormat(blog.publishedOn, "mmm dS, yyyy")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
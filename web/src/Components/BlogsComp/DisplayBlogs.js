import dateFormat from "dateformat";
import React from 'react';
import { AiFillRead } from 'react-icons/ai';
import { Link } from "react-router-dom";

const DisplayBlogs = ({ blog }) => {
    const { _id, blogTitle, blogImage, description, authorImage, authorName, publishedOn } = blog;

    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-lg hover:shadow-2xl duration-500 cursor-pointer" data-aos='zoom-in-right'>
                <figure><img src={blogImage} alt={blogTitle} className='w-full h-48 rounded-t' /></figure>
                <div className="card-body font-semibold">
                    <h2 className="text-xl font-semibold">{blogTitle}</h2>
                    <hr className="border-1 border-gray-400" />
                    <p>{description.slice(0, 240)}</p>
                    <hr className="border-1 border-gray-400" />
                    <div className='flex items-center justify-between'>
                        <div className="flex items-center gap-2">
                            <img src={authorImage} alt={authorName} className='w-12 rounded-full' />
                            <div>
                                <p>{authorName}</p>
                                <p>On: {dateFormat(publishedOn, "mmm dS, yyyy")}</p>
                            </div>
                        </div>
                        <Link to={`/blogs/${_id}`}><button className='py-2 px-2 bg-primary duration-500 ease-in-out hover:bg-secondary rounded text-white font-semibold text-center flex justify-center gap-1'><AiFillRead className="w-5 h-5" /> Read Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayBlogs;
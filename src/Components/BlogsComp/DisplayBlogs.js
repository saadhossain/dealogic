import dateFormat from "dateformat";
import React from 'react';

const DisplayBlogs = ({ blog }) => {
    const { blogTitle, blogImage, description, authorImage, authorName, authorEmail, publishedOn } = blog;
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-lg hover:shadow-2xl duration-500 cursor-pointer">
                <figure><img src={blogImage} alt={blogTitle} className='w-full h-48 rounded-t' /></figure>
                <div className="card-body font-semibold">
                    <h2 className="text-xl font-semibold">{blogTitle}</h2>
                    <hr className="border-1 border-gray-400" />
                    <p>
                        {description.length > 150 && description.slice(0, 150) + '...'}
                    </p>
                    <div className='flex items-center gap-2'>
                        <img src={authorImage} alt={authorName} className='w-12 rounded-full'/>
                        <div>
                            <p>{authorName}</p>
                            <p>{authorEmail}</p>
                        </div>
                    </div>
                    <hr className="border-1 border-gray-400" />
                    <p>Posted On: {dateFormat(publishedOn, "mmm dS, h:MM: TT")}</p>
                </div>
            </div>
        </div>
    );
};

export default DisplayBlogs;
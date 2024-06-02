import React from 'react';
import { ImStatsBars } from 'react-icons/im';
import { Link } from 'react-router-dom';

const CategoryShowcase = ({ category }) => {
    return (
        <Link to={`/products/${category.catSlug}`}>
            <div className="card card-compact w-full bg-base-100 shadow-lg hover:shadow-2xl duration-500 hover:-mt-2 cursor-pointer">
                <figure><img src={category.categoryImage} alt={category.categoryName} className='w-16' /></figure>
                <div className="card-body">
                    <h2 className="text-center text-lg font-semibold">{category.categoryName}</h2>
                    <div className="card-actions justify-center">
                        <button className="bg-primary text-white border-none hover:bg-secondary duration-300 ease-in-out py-1 px-3 rounded-md flex gap-1 items-center"><ImStatsBars />Products</button>



                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CategoryShowcase;
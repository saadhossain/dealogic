import React from 'react';
import { Link } from 'react-router-dom';
import {ImStatsBars} from 'react-icons/im'

const CategoryShowcase = ({ category }) => {
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-lg hover:shadow-2xl duration-500 hover:-mt-2 cursor-pointer">
                <figure><img src={category.categoryImage} alt={category.categoryName} className='w-32' /></figure>
                <div className="card-body">
                    <h2 className="text-center text-2xl font-semibold">{category.categoryName}</h2>
                    <div className="card-actions justify-center">
                        <Link to={`/products/${category.catSlug}`}>
                            <button className="btn btn-primary bg-dealogic border-none hover:bg-secondary duration-300 ease-in-out capitalize flex gap-1 items-center"><ImStatsBars/>View Products</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryShowcase;
import React from 'react';
import Categories from '../../Components/HomeComponents/Categories';
import HomeBanner from '../../Components/HomeComponents/HomeBanner';
import PromotedProducts from '../../Components/HomeComponents/PromotedProducts';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <Categories></Categories>
            <PromotedProducts></PromotedProducts>
        </div>
    );
};

export default Home;
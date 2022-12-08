import React from 'react';
import Categories from '../../Components/HomeComponents/Categories';
import HomeBanner from '../../Components/HomeComponents/HomeBanner';
import PromotedProducts from '../../Components/HomeComponents/PromotedProducts';
import HomeSafety from '../../Components/HomeSafety/HomeSafety';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <Categories></Categories>
            <PromotedProducts></PromotedProducts>
            <HomeSafety></HomeSafety>
        </div>
    );
};

export default Home;
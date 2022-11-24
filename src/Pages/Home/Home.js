import React from 'react';
import Categories from '../../Components/HomeComponents/Categories';
import HomeBanner from '../../Components/HomeComponents/HomeBanner';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <Categories></Categories>
        </div>
    );
};

export default Home;
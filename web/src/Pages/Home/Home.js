import React from 'react';
import Categories from '../../Components/HomeComponents/Categories';
import HomeBanner from '../../Components/HomeComponents/HomeBanner';
import LatestArticles from '../../Components/HomeComponents/LatestArticles/LatestArticles';
import PartnerSection from '../../Components/HomeComponents/PartnerSection/PartnerSection';
import PromotedProducts from '../../Components/HomeComponents/PromotedProducts';
import HomeSafety from '../../Components/HomeSafety/HomeSafety';
import RecentProducts from '../../Components/HomeComponents/RecentProducts';
const Home = () => {
    return (
        <div>
            <HomeBanner />
            <Categories />
            <RecentProducts />
            <PromotedProducts />
            <HomeSafety />
            <LatestArticles />
            <PartnerSection />
        </div>
    );
};

export default Home;
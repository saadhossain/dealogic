import React from 'react';
import Categories from '../../Components/HomeComponents/Categories';
import HomeBanner from '../../Components/HomeComponents/HomeBanner';
import LatestArticles from '../../Components/HomeComponents/LatestArticles/LatestArticles';
import PartnerSection from '../../Components/HomeComponents/PartnerSection/PartnerSection';
import PromotedProducts from '../../Components/HomeComponents/PromotedProducts';
import HomeSafety from '../../Components/HomeSafety/HomeSafety';
const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <Categories></Categories>
            <PromotedProducts></PromotedProducts>
            <HomeSafety></HomeSafety>
            <LatestArticles></LatestArticles>
            <PartnerSection></PartnerSection>
        </div>
    );
};

export default Home;
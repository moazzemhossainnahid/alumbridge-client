import React from 'react';
import HomeBanner from '../../Components/Pages/Home/HomeBanner';
import Newsletter from '../../Components/Pages/Home/Newsletter';
import AboutUs from '../../Components/Pages/Home/AboutUs';
import PartsThress from '../../Components/Pages/Home/PartsThress';
import ServiceThree from '../../Components/Pages/Home/ServiceThree';
import HomeTopCarousel from '../../Components/Pages/Home/HomeTopCarousel';

const Home = () => {
    return (
        <div className='w-full'>
            <HomeTopCarousel/>
            <HomeBanner/>
            <PartsThress/>
            <ServiceThree/>
            <AboutUs/>
            <Newsletter/>
        </div>
    );
};

export default Home;
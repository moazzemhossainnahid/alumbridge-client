import React from 'react';
import HomeBanner from '../../Components/Pages/Home/HomeBanner';
import Newsletter from '../../Components/Pages/Home/Newsletter';
import AboutUs from '../../Components/Pages/Home/AboutUs';
import BlogsThree from '../../Components/Pages/Home/BlogsThree';
import JobsThree from '../../Components/Pages/Home/JobsThree';
import HomeTopCarousel from '../../Components/Pages/Home/HomeTopCarousel';
import SocializationsThree from '../../Components/Pages/Home/SocializationsThree';

const Home = () => {
    return (
        <div className='w-full'>
            <HomeTopCarousel/>
            <HomeBanner/>
            <BlogsThree/>
            <JobsThree/>
            <SocializationsThree/>
            <AboutUs/>
            <Newsletter/>
        </div>
    );
};

export default Home;
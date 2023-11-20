import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutCourseDetails from './CheckoutCourseDetails';
import CheckoutForm from './CheckoutForm';
import useBlogs from '../../../Hooks/useBlogs';

const Checkout = () => {
    const [parts] = useBlogs();
    const { id } = useParams();
    const Item = parts?.find(data => data?._id === id);
    const [urlData, setURLData] = useState({});

 
    return (
        <div className='bg-white'>
            <div className="bg-white py-5 ">
                <h2 className="md:container sm:px-2 mx-auto text-3xl text-black font-bold font-mono">
                    Checkout
                </h2>
            </div>
            <div className="md:container sm:px-2 mx-auto grid md:grid-cols-3 py-5 gap-5">
                <CheckoutForm item={Item} setURLData={setURLData} urlData={urlData} />
                <CheckoutCourseDetails item={Item} />
            </div>
        </div>
    );
};

export default Checkout;
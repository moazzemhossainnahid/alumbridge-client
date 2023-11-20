
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    // console.log(id);
    
    return (
        <main className='overflow-hidden bg-white w-full h-full'>
            <div className="py-10 h-full w-full flex flex-col justify-center items-center gap-2">
                <h1  style={{ fontFamily: "Rajdhani" }} className='text-xl font-bold'><span className="text-green-500 text-xl md:text-3xl">Payment Successful</span>.</h1>
                <div className="flex flex-col md:flex-row justify-center items-center gap-3 w-full h-fit mx-auto">

                    <div className="p-5 w-full md:w-3/5 space-y-2 mx-auto text-dark">

                        <h3 className='text-2xl'>Enjoy your Order</h3>
                        <p className='text-secondary'>Your payment journey with SSL Commerz has been successfully completed. We are delighted to confirm the secure and seamless processing of your payment. Whether it's for products, services, or subscriptions, our advanced SSL encryption technology ensures the confidentiality of your data throughout the transaction.</p>
                        <button onClick={() => navigate('/')} className="btn btn-sm text-black btn-warning" >Back to Home</button>

                    </div>
                    <div className="flex justify-center w-full h-fit md:w-2/5 p-5 mx-auto">
                        <img src="https://i.ibb.co/3CV36ch/mobile-card-payment-successful-5796098-4841252.webp" alt="" className="img-fluid w-[80%] object-cover h-full" />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Success;
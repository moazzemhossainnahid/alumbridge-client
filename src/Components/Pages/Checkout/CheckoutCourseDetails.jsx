import React from "react";
import { MdLocationPin } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";

const CheckoutitemDetails = ({ item }) => {  

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[new Date().getMonth()];
  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };
  // console.log(item);
  return (
    <div className=" relative bg-[#F9FAFC]">
      <div className="border sticky top-20 px-4   shadow-lg rounded-sm">
        <div className="py-4 ">
          <h3 className="text-2xl text-black text-opacity-90 text-left ">
            Buying Summary :
          </h3>
          <h2 className="text-lg text-semibold text-gray-600 flex capitalize items-center gap-x-2">
            <AiOutlineArrowRight />
            <span className="lowercase">{item?.name}</span>
          </h2>
        </div>
        <hr />
        <div>
          <div className="flex justify-start  py-5 gap-5">
            <div className="avatar">
              <div className="w-24 rounded">
                <img src={item?.image} alt="dd" />
              </div>
            </div>
            <div className="flex flex-col justify-around">
              <h1>{item?.name}</h1>


              <div className="flex items-center gap-x-2">
                <MdLocationPin className="text-xl text-gray-800  " />
                <span>Dhaka Bangladesh</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-lg text-black text-opacity-90  my-2">
              <p>Date</p>
              <p>
                {new Date().getDate()} {month} {new Date().getFullYear()}
              </p>
            </div>
            <div className="flex justify-between text-lg text-black text-opacity-90  my-2">
              <p>Time</p>
              <p>{formatAMPM(new Date())}</p>
            </div>
            <div className="flex justify-between text-lg text-black text-opacity-90  my-2">
              <p>Item Fee</p>
              <p>
               {item?.price}
              </p>
            </div>
            <div className="flex justify-between text-lg text-black text-opacity-90  my-2">
              <p>Govt.Tax 5%</p>
              <p>
               {(item?.price/100*5).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-lg text-black text-opacity-90  my-2">
              <p>Service Charge 3%</p>
              <p>
               {(item?.price/100*3).toFixed(2)}
              </p>
            </div>
            <div className="py-5">
              <hr />
            </div>
            <div className="flex justify-between text-lg text-black text-opacity-90  my-2 mb-10">
              <p className="text-xl font-semibold ">Total</p>
              <p className="text-xl font-semibold ">
                = {(item?.price + item?.price/100*5 + item?.price/100*3).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutitemDetails;

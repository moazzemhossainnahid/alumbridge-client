import axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";

const CheckoutForm = ({ item, setURLData, urlData }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [user] = useAuthState(auth);


  const handleChecked = (event) => {
    if (event.target.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };


  const confirmToPay = (event) => {

    event.preventDefault();

    const info = {
      item_name: item?.name,
      item_desc: item?.description,
      item_category: item?.category,
      item_image: item?.image,
      total_amount: (item?.price + item?.price / 100 * 5 + item?.price / 100 * 3).toFixed(2),
      cus_name: user?.displayName,
      cus_email: user?.email,
    };

    // console.log(info);

      axios.post(`http://localhost:5000/api/v1/ssl/init`, info).then((res) => {
        console.log(res.data);
        if (res?.data) {
          window.location = res?.data;
        }
      });

    // if (urlData?.data) {
    //   window.location.href = urlData?.data
    // }

  };

  return (
    <div className="border bg-white px-5 col-span-2  shadow-sm py-5">
      <h2 className="py-5 text-3xl text-black text-opacity-75">
        Personal Information
      </h2>
      <form onSubmit={confirmToPay}>
        <div className=" grid md:grid-cols-2 grid-cols-1 justify-items-stretch  gap-5  ">
          <div>
            <label className="relative cursor-pointer">
              <input
                type="text"
                defaultValue={user?.displayName}
                placeholder="Input"
                className="h-[50px] bg-[#f3f3f3] rounded w-full px-6 text-md border outline-none focus:border-gray-700 focus:border-opacity-60 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                name="username"
              />
              <span className=" text-sm bg-transparent te text-opacity-80 absolute left-2 px-2 top-[-27px] transition duration-200 input-text">
                User Name
              </span>
            </label>
          </div>
          <div>
            <label className="relative cursor-pointer">
              <input
                type="email"
                defaultValue={user?.email}
                placeholder="Input"
                className="h-[50px]  bg-[#f3f3f3] w-full px-6 text-md border rounded outline-none focus:border-gray-700 focus:border-opacity-60 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                name="email"
              />
              <span className=" text-sm bg-transparent te text-opacity-80 absolute left-2 px-2 top-[-27px] transition duration-200 input-text">
                Email
              </span>
            </label>
          </div>
          </div>
          <div className="py-5">
            <label className="relative cursor-pointer">
              <input
                type="text"
                defaultValue={item?.name}
                placeholder="Input"
                className="h-[50px] bg-[#f3f3f3] w-full px-6 text-md border capitalize rounded outline-none focus:border-gray-700 focus:border-opacity-60 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                name="name"
              />
              <span className=" text-sm bg-transparent te text-opacity-80 absolute left-2 px-2 top-[-27px] transition duration-200 input-text">
                Item Name
              </span>
            </label>
          </div>
          <div className=" grid md:grid-cols-2 grid-cols-1 justify-items-stretch  gap-5  ">
          <div>
            <label className="relative cursor-pointer">
              <input
                type="text"
                defaultValue={item?.price}
                placeholder="Input"
                className="h-[50px]  bg-[#f3f3f3] w-full px-6 text-md border rounded outline-none focus:border-gray-700 focus:border-opacity-60 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                name="price"
              />
              <span className=" text-sm bg-transparent te text-opacity-80 absolute left-2 px-2 top-[-27px] transition duration-200 input-text">
                Item Price
              </span>
            </label>
          </div>
          <div>
            <label className="relative cursor-pointer">
              <input
                type="text"
                defaultValue={item?.category}
                placeholder="Input"
                className="h-[50px]  bg-[#f3f3f3] w-full px-6 text-md border rounded outline-none focus:border-gray-700 focus:border-opacity-60 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                name="category"
              />
              <span className=" text-sm bg-transparent te text-opacity-80 absolute left-2 px-2 top-[-27px] transition duration-200 input-text">
                Item Category
              </span>
            </label>
          </div>

        </div>
        <div>
        </div>
        <div>

          <div className="py-3">
            <hr />
          </div>

          <div className="py-4 flex items-center justify-center">
            <input
              type="checkbox"
              name=""
              onChange={handleChecked}
              id=""
              className="checkbox checkbox-sm border-2 checkbox-success"
            />
            <span className="ml-2">
              I have read and accepted{" "}
              <a href="!#" className="text-[#009DA6] font-semibold font-sans">
                Terms & Conditions
              </a>
            </span>
          </div>
          <div>
            <input
              type="submit"
              disabled={!isChecked}
              className="btn text-white bg-[#009DA6] hover:bg-[#007bff]"
              value="Confirm and Pay"
            />
          </div>
        </div>
      </form>

    </div>
  );
};

export default CheckoutForm;

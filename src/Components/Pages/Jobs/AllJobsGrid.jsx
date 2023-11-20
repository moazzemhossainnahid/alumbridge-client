import React from "react";
import { useNavigate } from "react-router-dom";

const AllJobsGrid = ({ job }) => {
  const navigate = useNavigate();


  return (
    <div onClick={() => navigate(`/jobs/${job?._id}`)} className="w-full border shadow-lg cursor-pointer hover:shadow-2xl">
      <div className="mx-2 lg:mb-0 mb-8">
        <div className="bg-white">
          <h3 className="">{job?.jobTitle}</h3>
          <div className="flex items-center justify-between px-4 pt-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-bookmark"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
              </svg>
            </div>
            <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
              <p className="text-xs text-gray-500">{job?.category}</p>
            </div>
          </div>
          <div className="p-4">
            <div className="w-full flex justify-start items-center">
              <h2 className="text-lg font-semibold">{job?.name}</h2>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {job?.description?.slice(0, 150)}
            </p>
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
                  12 months warranty
                </p>
              </div>
              <div className="">
                <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
                  Complete box
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between py-4">
              <h2 className="text-indigo-700 text-xs font-semibold">
                {job?.sku?.slice(0, 17)}
              </h2>
              <h3 className="text-indigo-700 text-xl font-semibold">
              <span className="pr-1">&#2547;</span>
                {job?.price}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJobsGrid;

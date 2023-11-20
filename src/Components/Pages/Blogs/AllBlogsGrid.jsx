import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AllBlogsGrid = ({ blog }) => {
  const [formattedDate, setFormattedDate] = useState('');
  console.log(blog);

  const navigate = useNavigate();

  useEffect(() => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(blog?.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', options);
    setFormattedDate(formattedDate);
  }, [blog?.createdAt]);

  return (
    <div onClick={() => navigate(`/blogs/${blog?._id}`)} className="w-full border shadow-lg cursor-pointer hover:shadow-2xl">
      <div className="mx-2 lg:mb-0 mb-8">
        <div className="h-60">
          <img src={blog?.banner} className="w-full h-60" />
        </div>
        <div className="bg-white">
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
              <p className="text-xs text-gray-500">{blog?.category}</p>
            </div>
          </div>
          <div className="p-4">
            <div className="w-full flex justify-start items-center">
              {blog?.title?.length > 15 ? (
                <h2 className="text-lg font-semibold">{`${blog?.title?.slice(
                  0,
                  15
                )}...`}</h2>
              ) : (
                <h2 className="text-lg font-semibold">{`${blog?.title}`}</h2>
              )}
            </div>
            <div className="flex justify-between items-center pt-5">
              <p className="text-xs text-gray-600">Author: {blog?.author}</p>
              <p className="text-xs text-gray-600 pl-5">Published: {formattedDate}</p>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {blog?.description?.slice(0, 150)}
            </p>
            <div className="flex items-center justify-center py-4">
              <h2 className="text-indigo-700 text-xs font-semibold">
                Explore More
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogsGrid;

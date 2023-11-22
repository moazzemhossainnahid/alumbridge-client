import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaUser, FaClock} from "react-icons/fa"


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
    <div onClick={() => navigate(`/blogs/${blog?._id}`)} className="w-full border p-3 shadow-lg cursor-pointer hover:shadow-2xl">
        <div className="mx-1 h-full">
          <img
            src={blog?.banner}
            alt="blog_banner"
            width="200"
            height="150"
            layout="responsive"
            className="mx-auto rounded-3"
          />
          <div className="flex items-center justify-evenly mt-2">
            <p className="flex items-center text-md">
              {" "}
              <FaUser className="me-1" /> {blog?.author}
            </p>
            <p className="flex items-center text-md">
              {" "}
              <FaClock className="me-1" />{" "}
              {formattedDate}
            </p>

          </div>
          <div className="px-3 my-3 space-y-3">
            <h3 className="text-xl h-16 font-bold m-0">{blog?.title}</h3>
            <p className="">
              {blog?.description}
            </p>
            <button
              className="my-2 px-3 py-2 inline-block mb-3 btn btn-outline"
              onClick={() => navigate(`/blogs/${blog?._id}`)}
            >
              See More
            </button>
          </div>
        </div>
      </div>
  );
};

export default AllBlogsGrid;

import React from "react";
import useBlogs from "../../../Hooks/useBlogs";
import AllBlogsGrid from "../Blogs/AllBlogsGrid";
import { useNavigate } from "react-router-dom";

const BlogsThree = () => {
  const [blogs] = useBlogs();
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="py-10">
        <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-center font-display py-7">
          Our Popular Blogs
        </h3>
        <div className="w-[70px] mx-auto h-[3px] bg-[#1584f3] mb-10 relative ">
          <div className="radiant bg-[#FFFFFF]"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5 p5 md:px-10">
          {blogs &&
            blogs?.slice(0,3)?.map((blog) => (
              <AllBlogsGrid blog={blog} key={blog?._id} />
            ))}
        </div>
      </div>
      <button onClick={() => navigate('/blogs')} className="btn btn-outline btn-danger">See More Blogs</button>
    </div>
  );
};

export default BlogsThree;

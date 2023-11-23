import React from "react";
import useBlogs from "../../../Hooks/useBlogs";
import AllBlogsGrid from "./AllBlogsGrid";
import EmptyList from "../../Others/EmptyList/EmptyList";

const AllBlogs = () => {
  const [blogs] = useBlogs();

  // console.log(blogs);
  return (
    <div className="w-full h-full py-20">
      <h1 className="text-3xl md:text-5xl pb-10 font-semibold leading-10 text-gray-800 text-center">
        Our Blogs
      </h1>

      {blogs ? (
        <div className="w-full mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center">
          {blogs?.map((blog) => (
            <AllBlogsGrid blog={blog} key={blog?._id} />
          ))}
        </div>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default AllBlogs;

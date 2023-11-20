import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useBlogs from "../../../Hooks/useBlogs";
import EmptyList from "../../Others/EmptyList/EmptyList";
import Chip from "../../Others/Chip";
import RelatedParts from "./RelatedParts";

const SingleBlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogs] = useBlogs();
  const [blog, setBlog] = useState(null);


  useEffect(() => {
    let part = blogs?.find((p) => p._id === id);
    if (part) {
      setBlog(part);
    }
  }, [blogs, id]);

  return (
    <div className="w-full">
      <div className="container py-7 w-full md:w-3/4 mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="blog-goBack w-32 rounded mx-3 justify-start px-5 py-2 flex text-indigo-600 bg-gray-200"
        >
          <span> &#8592;</span> <span className="pl-2">Go Back</span>
        </button>
        {blog ? (
          <div className="blog-wrap pt-10">
            <header>
              <p className="blog-date pb-5 font-semibold text-gray-500">
                Published {new Date(blog.createdAt).toLocaleString()}
              </p>
              <h1 className="text-black pb-3 text-2xl md:text-4xl font-bold">
                {blog?.title}
              </h1>
              <div className="blog-subCategory w-full flex justify-center">
                <Chip label={blog?.category} />
              </div>
            </header>
            <img className="py-5 mx-auto" src={blog?.banner} alt="cover" />
            <div className="space-y-4">
              <h2 className="text-indigo-700 text-xs font-semibold">
                {blog?.sku?.slice(0, 17)}
              </h2>
              <h3 className="text-indigo-700 text-xl font-semibold">
                <span className="pr-3"> Author:</span>
                {blog?.author}
              </h3>
            </div>
            <div className="">
              <p className="blog-desc p-5 md:px-10">{blog?.description}</p>
            </div>

          </div>
        ) : (
          <EmptyList />
        )}
      </div>
      <RelatedParts part={blog} />
    </div>
  );
};

export default SingleBlogDetails;

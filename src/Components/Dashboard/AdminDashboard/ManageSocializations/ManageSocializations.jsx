import React, { useEffect, useState } from "react";

import ManageSocializationsRow from "./ManageSocializationsRow";
import DeleteBlogsModal from "./Modals/DeleteBlogsModal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ManageSocializations = () => {
  const [number, setNumber] = useState(0);
  const [blogs, setBlogs] = useState(null);
  const [deleteBlog, setDeleteBlog] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [allBlogs, setAllBlogs] = useState(false);

  const imageUrlKey = "e738f1d16de6b265746b7f82cc157644";

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data?.data));
  }, [number]);

  console.log(blogs);


  const handleAddService = async (data) => {
    const image = data.photoURL[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageUrlKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const blog = {
            title: data.title,
            category: data.category,
            author: data.author,
            description: data.description,
            banner: img,
          };

          // send to database
          fetch(`http://localhost:5000/api/v1/blogs`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(blog),
          })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
              if (data?.status === "Successful") {
                toast.success("Blog Add Successfully");
                reset();
                setNumber(number + 1);
              } else {
                toast.error("Faild to Add Blog");
              }
            });
        }
      });
  };

  return (
    <div className=" text-left h-full w-full">
      <div className="w-full flex items-center justify-center my-12">
        <div className="bg-white shadow rounded py-12 px-8 mb-20">
          <p className="md:text-3xl text-xl font-bold pb-10 leading-7 text-center text-gray-700">
            Total Blogs: {blogs?.totalBlogs}
          </p>
          <div className="pb-5">
            <label
              for="addBlog"
              className="rounded btn btn-sm btn-primary btn-outline"
            >
              Add Blog
            </label>
          </div>
          <table className="border-collapse w-full bg-slate-200">
            {/* <!-- head --> */}
            <thead>
              <tr className="text-center">
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Index
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Banner
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Title
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Category
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Author
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}

              {allBlogs
                ? blogs?.result?.map((blog, index) => (
                  <ManageSocializationsRow
                    key={blog?._id}
                    blog={blog}
                    index={index}
                    setDeleteBlog={setDeleteBlog}
                  ></ManageSocializationsRow>
                ))
                : blogs?.result
                  ?.slice(0, 7)
                  ?.map((blog, index) => (
                    <ManageSocializationsRow
                      key={blog?._id}
                      blog={blog}
                      index={index}
                      setDeleteBlog={setDeleteBlog}
                    ></ManageSocializationsRow>
                  ))}
            </tbody>
          </table>
          {blogs?.result?.length > 7 && (
            <div className="pt-7">
              <button
                onClick={() => setAllBlogs(!allBlogs)}
                className="btn btn-outline btn-secondary flex items-center justify-center mx-auto"
              >
                {`${allBlogs ? "See Less Blogs" : "See More Blogs"}`}{" "}
                <span className="text-2xl -mt-1">&#8608;</span>
              </button>
            </div>
          )}
        </div>
        {deleteBlog && (
          <DeleteBlogsModal
            deleteBlog={deleteBlog}
            setNumber={setNumber}
            number={number}
          ></DeleteBlogsModal>
        )}
      </div>

      {/* <!-- The add Blog modal --> */}

      <input type="checkbox" id="addBlog" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative  bg-slate-300">
          <label
            for="addBlog"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold">Please Add New Blog Information</h3>
          <form
            onSubmit={handleSubmit(handleAddService)}
            action=""
            className="py-3"
          >
            <input
              {...register("title")}
              type="text"
              placeholder="Enter Blog Title"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
            />
            <input
              {...register("category")}
              type="text"
              placeholder="Enter Blog Category"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
            />
            <input
              {...register("author")}
              type="text"
              placeholder="Enter Blog Author"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
            />
            <textarea
              {...register("description")}
              type="text"
              placeholder="Enter Blog Description"
              className="input bg-slate-100 my-2 input-ghost w-full h-28 block mx-auto"
            />
            <input
              {...register("photoURL")}
              type="file"
              placeholder="Enter Your Image"
              className="file-input file-input-bordered bg-slate-100 my-2 items-center w-full mx-auto block"
            />
            <input
              className="btn px-7 btn-primary mt-5 block mx-auto"
              type="submit"
              value="Add Blog"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageSocializations;

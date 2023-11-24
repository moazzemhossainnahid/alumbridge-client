import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBlogs from "../../../Hooks/useBlogs";
import EmptyList from "../../Others/EmptyList/EmptyList";
import Chip from "../../Others/Chip";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const SingleBlogDetails = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [blogs] = useBlogs();
  const [blog, setBlog] = useState(null);


  useEffect(() => {
    let part = blogs?.find((p) => p._id === id);
    if (part) {
      setBlog(part);
    }
  }, [blogs, id]);


  const handleAddComment = async (c) => {
    const data = {
      name: user?.displayName,
      photoURL: user?.photoURL,
      email: user?.email,
      comment: c?.comment
    };

    if (data?.comment?.length < 3) {
      return toast.error("Comment are too Short");
    }

    // send to database
    fetch(`http://localhost:5000/api/v1/blogs/${id}/comments`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data?.status === "Successful") {
          toast.success("Comment Add Successfully");
          reset();
          window.location.reload();
        } else {
          toast.error("Faild to Add Comment");
        }
      });

  }


  const handleDeleteComment = (data) => {
    const url = `http://localhost:5000/api/v1/blogs/${blog?._id}/comments/${data?._id}`;
    // console.log(url);
    fetch(url, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.status === "Successful") {
          toast.success("Comment Delete Successfully");
          window.location.reload();
        } else {
          toast.error("Faild to Delete Comment");
        }
      })
  }
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

            <div className="w-full p-5 py-16">
              <h3 className="text-start text-xl font-bold">Comments:</h3>

              {blog?.comments && (
                <div className="w-full md:w-5/6 p-5 grid grid-cols-1 gap-5 justify-center items-center">
                  {blog?.comments?.map((data) => (
                    <div key={data?._id} className="flex justify-start items-center gap-5 relative">
                      <div className="">
                        <img src={data?.photoURL} alt="img" className="w-12 h-12 rounded-full" />
                      </div>
                      <div className="text-start">
                        <div className="flex items-center gap-2">
                          <h4 className="text-md font-bold">{data?.name}</h4>
                          {(user?.email === data?.email) && <FaTrash onClick={() => handleDeleteComment(data)} className="text-xs cursor-pointer hover:text-red-700 hover:scale-105 duration-300" />}
                        </div>
                        <h4 className="text-sm font-normal pl-2">{data?.comment}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="py-5 flex justify-start">
                <label
                  for="addComment"
                  className="rounded btn btn-sm btn-outline"
                >
                  Add Comment
                </label>
              </div>

            </div>
            <>
              {/* <!-- The add Blog modal --> */}

              <input type="checkbox" id="addComment" class="modal-toggle" />
              <div class="modal">
                <div class="modal-box relative  bg-slate-300">
                  <label
                    for="addComment"
                    class="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 class="text-lg font-bold">Please Add Your Comment</h3>
                  <form
                    onSubmit={handleSubmit(handleAddComment)}
                    action=""
                    className="py-3"
                  >

                    <textarea
                      {...register("comment")}
                      type="text"
                      required
                      placeholder="Enter Your Comment"
                      className="input bg-slate-100 my-2 input-ghost w-full h-28 block mx-auto"
                    />

                    <input
                      className="btn px-7 btn-primary mt-5 block mx-auto"
                      type="submit"
                      value="POST"
                    />
                  </form>
                </div>
              </div>
            </>
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  );
};

export default SingleBlogDetails;

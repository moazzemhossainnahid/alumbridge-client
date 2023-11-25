import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBlogs from "../../../Hooks/useBlogs";
import EmptyList from "../../Others/EmptyList/EmptyList";
import Chip from "../../Others/Chip";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaLocationArrow, FaMapMarkedAlt, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import useSocializations from "../../../Hooks/useSocializations";

const SingleSocializationDetails = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [socializations] = useSocializations();
  const [socialization, setSocialization] = useState(null);


  useEffect(() => {
    let post = socializations?.find((p) => p._id === id);
    if (post) {
      setSocialization(post);
    }
  }, [socializations, id]);


  const handleAddComment = async (c) => {
    const data = {
      name: user?.displayName,
      photoURL: user?.photoURL ? user?.photoURL : "https://www.shareicon.net/data/2016/05/26/771188_man_512x512.png",
      email: user?.email,
      comment: c?.comment
    };

    if (data?.comment?.length < 3) {
      return toast.error("Comment are too Short");
    }

    // send to database
    fetch(`https://alumbridge-server.vercel.app/api/v1/socializations/${id}/comments`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
    const url = `https://alumbridge-server.vercel.app/api/v1/socializations/${socialization?._id}/comments/${data?._id}`;
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
        {socialization ? (
          <div className="blog-wrap pt-10">
            <header>
              <p className="blog-date pb-5 font-semibold text-gray-500">
                Published {new Date(socialization?.createdAt).toLocaleString()}
              </p>
              <h1 className="text-black pb-3 text-2xl md:text-4xl font-bold">
                {socialization?.title}
              </h1>
              <div className="blog-subCategory w-full flex justify-center">
                <Chip label={socialization?.category} />
              </div>
            </header>
            <div className="space-y-4">
              <h2 className="text-indigo-700 text-md pt-5 font-semibold flex items-center justify-center gap-2">
                <span className=""><FaMapMarkerAlt /></span> {socialization?.location}
              </h2>
              <h3 className="text-indigo-700 text-xl font-semibold">
                <span className="pr-3"> Needed:</span>
                {socialization?.quantity} {`${(socialization?.category === "Volunteer" && "Persons") || (socialization?.category === "Blood" && "Bags")}`}
              </h3>
            </div>
            <div className="">
              <p className="blog-desc p-5 md:px-10">{socialization?.description}</p>
            </div>

            <div className="w-full p-5 py-16">
              <h3 className="text-start text-xl font-bold">Comments:</h3>

              {socialization?.comments && socialization?.comments?.length > 0 ?
                <div className="w-full md:w-5/6 p-5 grid grid-cols-1 gap-5 justify-center items-center">
                  {socialization?.comments?.map((data) => (
                    <div key={data?._id} className="flex justify-start items-center gap-5 relative">
                      <div className="">
                        <img src={data?.photoURL} alt="img" className="w-12 h-12 rounded-full" />
                      </div>
                      <div className="text-start">
                        <div className="flex items-center gap-2">
                          <h4 className="text-md font-bold">{data?.name}</h4>
                          {((user?.email === data?.email) || (user?.email === socialization?.email)) && <FaTrash onClick={() => handleDeleteComment(data)} className="text-xs cursor-pointer hover:text-red-700 hover:scale-105 duration-300" />}
                        </div>
                        <h4 className="text-sm font-normal pl-2">{data?.comment}</h4>
                      </div>
                    </div>
                  ))}
                </div> :
                <div className="text-start py-5">
                  <h3 className="text-red-600 textmd md:text-xl font-semibold">"There Are No Comments On This Post Yet"</h3>
                </div>
              }

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

export default SingleSocializationDetails;

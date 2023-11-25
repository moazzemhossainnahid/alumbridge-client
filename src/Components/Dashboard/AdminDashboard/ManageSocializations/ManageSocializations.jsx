import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import ManageSocializationsRow from "./ManageSocializationsRow";
import DeleteSocializationsModal from "./Modals/DeleteSocializationsModal";
import { useForm } from "react-hook-form";
import UpdateSocializationsModal from "./Modals/UpdateSocializationsModal";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase.init";

const ManageSocializations = () => {
  const [number, setNumber] = useState(0);
  const [socializations, setSocializations] = useState(null);
  const [updatePost, setUpdatePost] = useState(null);
  const [deletePost, setDeletePost] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [allSocializations, setAllSocializations] = useState(false);
  const [selectType, setSelectType] = useState();
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch("https://alumbridge-server.vercel.app/api/v1/socializations")
      .then((res) => res.json())
      .then((data) => setSocializations(data?.data));
  }, [number]);

  console.log(socializations);


  const handleAddSocializationPost = async (data) => {

    const post = {
      title: data.title,
      category: selectType,
      quantity: data.quantity,
      location: data.location,
      email: user?.email,
      description: data.description,
    };

    // send to database
    fetch(`https://alumbridge-server.vercel.app/api/v1/socializations`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.status === "Successful") {
          toast.success("Post Add Successfully");
          reset();
          setNumber(number + 1);
        } else {
          toast.error("Faild to Add Post");
        }
      });
  };


  const handleType = (e) => {
    const type = e.target.value;

    setSelectType(type);
  };

  const socializationsFilter = socializations && socializations?.result?.filter(s => s?.email === user?.email);


  return (
    <div className=" text-left h-full w-full">
      <div className="w-full flex items-center justify-center my-12">
        <div className="bg-white shadow rounded py-12 px-8 mb-20">
          <p className="md:text-3xl text-xl font-bold pb-10 leading-7 text-center text-gray-700">
            Total Socialization Posts: {socializationsFilter?.length}
          </p>
          <div className="pb-5">
            <label
              for="addPost"
              className="rounded btn btn-sm btn-primary btn-outline"
            >
              Add Post
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
                  Title
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Category
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Quantity
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}

              {allSocializations
                ? socializationsFilter?.map((post, index) => (
                  <ManageSocializationsRow
                    key={post?._id}
                    post={post}
                    index={index}
                    setUpdatePost={setUpdatePost}
                    setDeletePost={setDeletePost}
                  ></ManageSocializationsRow>
                ))
                : socializationsFilter
                  ?.slice(0, 7)
                  ?.map((post, index) => (
                    <ManageSocializationsRow
                      key={post?._id}
                      post={post}
                      index={index}
                      setUpdatePost={setUpdatePost}
                      setDeletePost={setDeletePost}
                    ></ManageSocializationsRow>
                  ))}
            </tbody>
          </table>
          {socializationsFilter?.length > 7 && (
            <div className="pt-7">
              <button
                onClick={() => setAllSocializations(!allSocializations)}
                className="btn btn-outline btn-secondary flex items-center justify-center mx-auto"
              >
                {`${allSocializations ? "See Less Posts" : "See More Posts"}`}{" "}
                <span className="text-2xl -mt-1">&#8608;</span>
              </button>
            </div>
          )}
        </div>
        {updatePost && (
          <UpdateSocializationsModal
            updatePost={updatePost}
            setNumber={setNumber}
            number={number}
          ></UpdateSocializationsModal>
        )}
        {deletePost && (
          <DeleteSocializationsModal
            deletePost={deletePost}
            setNumber={setNumber}
            number={number}
          ></DeleteSocializationsModal>
        )}
      </div>

      {/* <!-- The add Post modal --> */}

      <input type="checkbox" id="addPost" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative  bg-slate-300">
          <label
            for="addPost"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold">Please Add New Post Information</h3>
          <form
            onSubmit={handleSubmit(handleAddSocializationPost)}
            action=""
            className="py-3"
          >
            <div className="relative z-0 my-2">
              <select
                onChange={handleType}
                className="input input-bordered input-dark w-full"
              >
                <option disabled selected>
                  Select What Needed
                </option>
                <option value="Blood">Blood</option>
                <option value="Volunteer">Volunteer</option>
              </select>

            </div>
            <input
              {...register("title")}
              type="text"
              required
              placeholder="Enter Post Title"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
            />
            <input
              {...register("quantity")}
              type="number"
              required
              placeholder={`${(selectType === "Blood" && "How Many Bags Needed") || (selectType === "Volunteer" && "How Many Persons Needed")}`}
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
            />
            <textarea
              {...register("location")}
              type="text"
              required
              placeholder="Enter Where Needed (Location)"
              className="input bg-slate-100 my-2 input-ghost h-16 w-full block mx-auto"
            />
            <textarea
              {...register("description")}
              type="text"
              required
              placeholder="Enter Description"
              className="input bg-slate-100 my-2 input-ghost w-full h-28 block mx-auto"
            />
            <input
              className="btn px-7 btn-primary mt-5 block mx-auto"
              type="submit"
              value="Add Post"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageSocializations;

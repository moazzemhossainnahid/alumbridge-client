import React, { useEffect, useState } from "react";
import ManageStafsRow from "./ManageStafsRow";
import DeleteStafsModal from "./Modals/DeleteStafsModal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ManageStafs = () => {
  const [number, setNumber] = useState(0);
  const [stafs, setStafs] = useState(null);
  const [deleteStaf, setDeleteStaf] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const imageUrlKey = "e738f1d16de6b265746b7f82cc157644";

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/stafs")
      .then((res) => res.json())
      .then((data) => setStafs(data?.data));
  }, [number]);

  const handleAddStaf = async (data) => {
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
          const staf = {
            name: data.name,
            age: data.age,
            experience: data.experience,
            work_name: data.work_name,
            image: img,
          };

          // send to database
          fetch(`http://localhost:5000/api/v1/stafs`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(staf),
          })
            .then((res) => res.json())
            .then((data) => {
            //   console.log(data);
              if (data?.status === "Successful") {
                toast.success("Staf Add Successfully");
                reset();
                setNumber(number + 1);
              } else {
                toast.error("Faild to Add Staf");
              }
            });
        }
      });
  };

//   console.log(stafs);

  return (
    <div className=" text-left h-full w-full">
      <div className="w-full flex items-center justify-center my-12">
        <div className="bg-white shadow rounded py-12 px-8 mb-20">
          <p className="md:text-3xl text-xl font-bold pb-10 leading-7 text-center text-gray-700">
            Total Stafs: {stafs?.result?.length}
          </p>
          <div className="pb-5">
            <label
              for="addStaf"
              className="rounded btn btn-sm btn-info btn-outline"
            >
              Add Staf
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
                  Image
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Name
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Age
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Experence
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}

              {stafs?.result?.map((staf, index) => (
                <ManageStafsRow
                  key={staf?._id}
                  staf={staf}
                  index={index}
                  setDeleteStaf={setDeleteStaf}
                ></ManageStafsRow>
              ))}
            </tbody>
          </table>
        </div>
        {deleteStaf && (
          <DeleteStafsModal
            deleteStaf={deleteStaf}
            setNumber={setNumber}
            number={number}
          ></DeleteStafsModal>
        )}
      </div>
      {/* <!-- The add staf modal --> */}

      <input type="checkbox" id="addStaf" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative  bg-slate-300">
          <label
            for="addStaf"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold">Please Add New Staf Information</h3>
          <form
            onSubmit={handleSubmit(handleAddStaf)}
            action=""
            className="py-3"
          >
            <input
              {...register("name")}
              type="text"
              placeholder="Enter Staf Name"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto max-w-xs"
            />
            <input
              {...register("age")}
              type="number"
              placeholder="Enter Stafs Age"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto max-w-xs"
            />
            <input
              {...register("experience")}
              type="text"
              placeholder="Enter Staf Experience"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto max-w-xs"
            />
            <input
              {...register("work_name")}
              type="text"
              placeholder="Enter Stafs Work"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto max-w-xs"
            />
            <input
              {...register("photoURL")}
              type="file"
              placeholder="Enter Your Image"
              className="file-input file-input-bordered bg-slate-100 my-2 items-center w-full mx-auto block max-w-xs"
            />
            <input
              className="btn px-7 btn-secondary my-5 block mx-auto"
              type="submit"
              value="Add Staf"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageStafs;

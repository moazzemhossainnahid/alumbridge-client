import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmptyList from "../../Others/EmptyList/EmptyList";
import Chip from "../../Others/Chip";
import useJobs from "../../../Hooks/useJobs";
import RelatedServices from "./RelatedServices";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SingleJobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobs] = useJobs();
  const [job, setJob] = useState(null);
  const { register, handleSubmit, reset } = useForm();


  useEffect(() => {
    let service = jobs?.find((s) => s._id === id);
    if (service) {
      setJob(service);
    }
  }, [jobs, id]);

//   const handleAddService = async (data) => {
//     const booking = {
//       name: data.name,
//       service: job.name,
//       phone: data.phone,
//       email: data.email,
//       address: data.address,
//       message: data.message,
//     };
    
// console.log(booking);

//     // send to database
//     fetch(`http://localhost:5000/api/v1/bookings`, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//       body: JSON.stringify(booking),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         //   console.log(data);
//         if (data?.status === "Successful") {
//           toast.success("Appointment Booked Successfully");
//           reset();
//         } else {
//           toast.error("Faild to Booked Appointment");
//         }
//       });
//   };

  return (
    <div className="w-full">
      <div className="container py-7 w-full md:w-3/4 mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="blog-goBack w-32 rounded mx-3 justify-start px-5 py-2 flex text-indigo-600 bg-gray-200"
        >
          <span> &#8592;</span> <span className="pl-2">Go Back</span>
        </button>
        {job ? (
          <div className="blog-wrap pt-10">
            <header>
              <p className="blog-date pb-5 font-semibold text-gray-500">
                Published {new Date(job.createdAt).toLocaleString()}
              </p>
              <h1 className="text-black pb-3 text-2xl md:text-4xl font-bold">
                {job?.name}
              </h1>
              <div className="blog-subCategory w-full flex justify-center">
                <Chip label={job?.category} />
              </div>
            </header>
            <img className="py-5 mx-auto" src={job?.image} alt="cover" />
            <div className="space-y-4">
              <h2 className="text-indigo-700 text-xs font-semibold">
                {job?.sku.slice(0, 17)}
              </h2>
              <h3 className="text-indigo-700 text-xl font-semibold">
                <span className="pr-3"> Price:</span>
                <span className="pr-1">&#2547;</span>
                {job?.price}/=
              </h3>
            </div>
            <div className="">
              <p className="blog-desc p-5 md:px-10">{job?.description}</p>
            </div>
            <div className="pt-7">
              <label
                for="bookAppointment"
                className="w-2/3 md:w-2/5 btn btn-outline btn-secondary flex items-center justify-center mx-auto"
              >
                Booked an Appointment{" "}
                <span className="text-2xl -mt-1">&#8608;</span>
              </label>
            </div>
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
      <RelatedServices service={job} />

      {/* <!-- The Book Appointment modal --> */}

      <input type="checkbox" id="bookAppointment" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative  bg-slate-300">
          <label
            for="bookAppointment"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold">Insert Booking Information For <br /> /{job?.name}/</h3>
          {/* <form
            onSubmit={handleSubmit(handleAddService)}
            action=""
            className="py-3"
          >
            <input
              {...register("name")}
              type="text"
              placeholder="Enter Your Name"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto max-w-xs"
            />
            <input
              {...register("phone")}
              type="text"
              placeholder="Enter Your Phone"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto max-w-xs"
            />
            <input
              {...register("email")}
              type="email"
              placeholder="Enter Your Email"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto max-w-xs"
            />
            <textarea
              {...register("address")}
              type="text"
              placeholder="Enter Your Address"
              className="input bg-slate-100 resize-none my-2 input-ghost w-full h-16 block mx-auto max-w-xs"
            />
            <textarea
              {...register("message")}
              type="text"
              placeholder="Enter About Service"
              className="input bg-slate-100 my-2 input-ghost w-full h-24 block mx-auto max-w-xs"
            />
            <input
              className="btn px-7 btn-warning my-5 block mx-auto"
              type="submit"
              value="Send Data"
            />
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default SingleJobDetails;

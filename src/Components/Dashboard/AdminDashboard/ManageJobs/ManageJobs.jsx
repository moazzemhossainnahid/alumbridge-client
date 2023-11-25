import React, { useEffect, useState } from "react";
import DeleteJobModal from "./Modals/DeleteJobModal";
import ManageJobsRow from "./ManageJobsRow";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import UpdateJobModal from "./Modals/UpdateJobModal";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase.init";

const ManageJobs = () => {
  const [number, setNumber] = useState(0);
  const [jobs, setJobs] = useState(null);
  const [updateJob, setUpdateJob] = useState(null);
  const [deleteJob, setDeleteJob] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [allJobs, setAllJobs] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch("https://alumbridge-server.vercel.app/api/v1/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data?.data));
  }, [number]);


  const handleAddJob = async (data) => {

    const job = {
      jobTitle: data.jobTitle,
      companyName: data.companyName,
      positionName: data.positionName,
      vacancy: data.vacancy,
      skills: data.skills,
      email: user?.email,
      description: data.description,
    };

    // send to database
    fetch(`https://alumbridge-server.vercel.app/api/v1/jobs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(job),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.status === "Successful") {
          toast.success("Job Add Successfully");
          reset();
          setNumber(number + 1);
        } else {
          toast.error("Faild to Add Job");
        }
      });
  };

  const jobsFilter = jobs && jobs?.result?.filter(job => job?.email === user?.email);


  return (
    <div className=" text-left h-full w-full">
      <div className="w-full flex items-center justify-center my-12">
        <div className="bg-white shadow rounded py-12 px-8 mb-20">
          <p className="md:text-3xl text-xl font-bold pb-10 leading-7 text-center text-gray-700">
            Total Jobs: {jobsFilter?.length}
          </p>
          <div className="pb-5">
            <label
              for="addJob"
              className="rounded btn btn-sm btn-warning btn-outline"
            >
              Add Job
            </label>
          </div>
          <table className="border-collapse w-full bg-slate-200">
            {/* <!-- head --> */}
            <thead>
              <tr className="text-center">
                <th className="p-3 text-sm font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Index
                </th>
                <th className="p-3 text-sm font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Company Name
                </th>
                <th className="p-3 text-sm font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Position Name
                </th>
                <th className="p-3 text-sm font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Published Date
                </th>
                <th className="p-3 text-sm font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}

              {allJobs
                ? jobsFilter?.map((job, index) => (
                  <ManageJobsRow
                    key={job?._id}
                    job={job}
                    index={index}
                    setUpdateJob={setUpdateJob}
                    setDeleteJob={setDeleteJob}
                  ></ManageJobsRow>
                ))
                : jobsFilter
                  ?.slice(0, 7)
                  ?.map((job, index) => (
                    <ManageJobsRow
                      key={job?._id}
                      job={job}
                      index={index}
                      setUpdateJob={setUpdateJob}
                      setDeleteJob={setDeleteJob}
                    ></ManageJobsRow>
                  ))}
            </tbody>
          </table>
          {jobsFilter?.length > 7 && (
            <div className="pt-7">
              <button
                onClick={() => setAllJobs(!allJobs)}
                className="btn btn-outline btn-secondary flex items-center justify-center mx-auto"
              >
                {`${allJobs ? "See Less Jobs" : "See More Jobs"}`}{" "}
                <span className="text-2xl -mt-1">&#8608;</span>
              </button>
            </div>
          )}
        </div>
        {updateJob && (
          <UpdateJobModal
            updateJob={updateJob}
            setNumber={setNumber}
            number={number}
          ></UpdateJobModal>
        )}
        {deleteJob && (
          <DeleteJobModal
            deleteJob={deleteJob}
            setNumber={setNumber}
            number={number}
          ></DeleteJobModal>
        )}
      </div>

      {/* <!-- The add Job modal --> */}

      <input type="checkbox" id="addJob" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative  bg-slate-300">
          <label
            for="addJob"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold">Please Add New Job Information</h3>
          <form
            onSubmit={handleSubmit(handleAddJob)}
            action=""
            className="py-3"
          >
            <input
              {...register("jobTitle")}
              type="text"
              required
              placeholder="Enter Job Title"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
            />
            <div className="w-full flex flex-col md:flex-row gap-3">

              <input
                {...register("companyName")}
                type="text"
                required
                placeholder="Enter Company Name"
                className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
              />
              <input
                {...register("positionName")}
                type="text"
                required
                placeholder="Enter Position Name"
                className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
              />
            </div>
            <input
              {...register("vacancy")}
              type="number"
              required
              placeholder="Enter Job Vacancy"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
            />
            <input
              {...register("skills")}
              type="text"
              required
              placeholder="Enter Job skills"
              className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
            />
            <textarea
              {...register("description")}
              type="text"
              required
              placeholder="Enter Job Description"
              className="input bg-slate-100 my-2 input-ghost w-full h-20 block mx-auto"
            />
            <input
              className="btn px-7 btn-warning mt-5 block mx-auto"
              type="submit"
              value="Add Job"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;

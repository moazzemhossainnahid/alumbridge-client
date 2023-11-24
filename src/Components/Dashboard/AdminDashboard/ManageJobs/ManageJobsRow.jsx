import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPen, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ManageJobsRow = ({ job, index, setDeleteJob }) => {

    const { jobTitle, companyName, positionName, description, skills, vacancy,_id } = job;
    const [formattedDate, setFormattedDate] = useState('');
    const { register, handleSubmit, reset } = useForm();


    useEffect(() => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const date = new Date(job?.createdAt);
        const formattedDate = date.toLocaleDateString('en-US', options);
        setFormattedDate(formattedDate);
    }, [job?.createdAt]);

    const handleUpdateJob = async (data) => {

        const job = {
            jobTitle: data.jobTitle,
            companyName: data.companyName,
            positionName: data.positionName,
            vacancy: data.vacancy,
            skills: data.skills,
            description: data.description,
          };

        // send to database
        fetch(`http://localhost:5000/api/v1/jobs/${_id}`, {
            method: "PATCH",
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
                    toast.success("Job Update Successfully");
                    reset();
                    window.location.reload();
                } else {
                    toast.error("Faild to Update Job");
                }
            });


    };

    return (
        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto text-sm text-gray-800 text-center border border-b block font-semibold lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Index</span>
                {index + 1}
            </td>
            <td className="w-full lg:w-auto text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">CompanyName</span>
                {companyName} <br />
            </td>
            <td className="w-full lg:w-auto text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">PositionName</span>
                {positionName} <br />
            </td>
            <td className="w-full lg:w-auto text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Vacancy</span>
                {vacancy}
            </td>
            <td className="w-full lg:w-auto font-bold text-gray-700 text-sm text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Publised</span>
                {formattedDate}
            </td>
            <td className="w-full lg:w-auto text-xs p-2 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <div className="flex justify-between px-3 pb-1 gap-2 items-center">
                    <label htmlFor="update-job-modal" className=" text-black rounded shadow px-2 py-1 cursor-pointer text-xs bg-danger "><FaPen className='text-green-700' /></label>
                    <label htmlFor='delete-job-modal' onClick={() => setDeleteJob(job)} className="btn text-white bg-white btn-xs"><FaTrash className='text-red-700' /></label>
                </div>
            </td>

            {/* <!-- The Update Job modal --> */}

            <input type="checkbox" id="update-job-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative h-full bg-slate-300">
                    <label
                        for="update-job-modal"
                        class="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 class="text-lg font-bold">Please Update Job Information</h3>
                    <form
                        onSubmit={handleSubmit(handleUpdateJob)}
                        action=""
                        className="py-3"
                    >
                        <input
                            {...register("jobTitle")}
                            defaultValue={jobTitle}
                            type="text"
                            placeholder="Enter Job Title"
                            className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                        />
                        <div className="flex flex-col md:flex-row justify-between items-center md:gap-3">
                            <input
                                {...register("companyName")}
                                defaultValue={companyName}
                                type="text"
                                placeholder="Enter Company Name"
                                className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                            />
                            <input
                                {...register("positionName")}
                                defaultValue={positionName}
                                type="text"
                                placeholder="Enter Job Position"
                                className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                            />
                        </div>
                        <input
                            {...register("skills")}
                            defaultValue={skills}
                            type="text"
                            placeholder="Enter Job Skills"
                            className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                        />
                        <input
                            {...register("vacancy")}
                            defaultValue={vacancy}
                            type="number"
                            placeholder="Enter Job Vacancy"
                            className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                        />
                        <textarea
                            {...register("description")}
                            defaultValue={description}
                            type="text"
                            placeholder="Enter Blog Description"
                            className="input bg-slate-100 my-2 input-ghost w-full h-20 block mx-auto"
                        />
                        <input
                            className="btn px-7 btn-primary mt-5 block mx-auto"
                            type="submit"
                            value="Update Job"
                        />
                    </form>
                </div>
            </div>
        </tr>
    );
};

export default ManageJobsRow;
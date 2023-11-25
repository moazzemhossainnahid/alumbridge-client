import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const UpdateJobModal = ({ updateJob, setNumber, number }) => {
    const { jobTitle, companyName, positionName, description, skills, vacancy, _id } = updateJob;

    const { register, handleSubmit, reset } = useForm();

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
                if (data?.status === "Successful") {
                    toast.success("Job Update Successfully");
                    reset();
                    setNumber(number + 1);
                    closeModal();
                } else {
                    toast.error("Failed to Update Job");
                }
            });
    };

    const closeModal = () => {
        window.location.reload();
    };

    return (
        <div>
            <input type="checkbox" id="update-job-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="update-job-modal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={closeModal}>
                        ✕
                    </label>
                    <h1 className='mb-4 badge badge-error text-2xl badge-lg p-4'>Update Job</h1>
                    <div className="w-full gap-3">
                        <form onSubmit={handleSubmit(handleUpdateJob)} className="py-3">
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
                                    required
                                    placeholder="Enter Company Name"
                                    className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                                />
                                <input
                                    {...register("positionName")}
                                    defaultValue={positionName}
                                    type="text"
                                    required
                                    placeholder="Enter Job Position"
                                    className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                                />
                            </div>
                            <input
                                {...register("skills")}
                                defaultValue={skills}
                                type="text"
                                required
                                placeholder="Enter Job Skills"
                                className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                            />
                            <input
                                {...register("vacancy")}
                                defaultValue={vacancy}
                                type="number"
                                required
                                placeholder="Enter Job Vacancy"
                                className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                            />
                            <textarea
                                {...register("description")}
                                defaultValue={description}
                                type="text"
                                required
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
            </div>
        </div>
    );
};

export default UpdateJobModal;

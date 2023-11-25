import React from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2'
const ManageJobApplicationsRow = ({ application, index, setViewApplication }) => {

    const { name, phone, address, email, message, _id, jobTitle, jobPosition, jobEmail, companyName } = application;

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `https://alumbridge-server.vercel.app/api/v1/jobapplications/${id}`;
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        authorization: `bearer ${localStorage.getItem("accessToken")}`,
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data?.deletedCount > 0) {
                            // toast.success(` Staf has been deleted.`);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            window.location.reload();
                        } else if (data?.status === 'fail') {
                            toast.error(` Somethig wrong...`);
                        }
                    })

            }
        });

    }

    const closeModal = () => {
        window.location.reload();
    };


    return (
        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-2 text-sm text-gray-800 text-center border border-b block font-semibold lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Index</span>
                {index + 1}
            </td>
            <td className="w-full lg:w-auto p-2 text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Name</span>
                {name} <br />
            </td>
            <td className="w-full lg:w-auto p-2 text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Phone</span>
                {phone}
            </td>
            <td className="w-full lg:w-auto p-2 font-bold text-green-700 text-sm text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Address</span>
                {address}
            </td>
            <td className="w-full lg:w-auto text-xs p-2 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <div className="flex justify-between px-3 pb-1 gap-2 items-center">
                    <label onClick={() => setViewApplication(application)} htmlFor="view-jobapplication-modal" className=" text-black rounded shadow px-2 py-1 cursor-pointer text-xs bg-danger "><FaEye className='text-green-700' /></label>
                    <label onClick={() => handleDelete(_id)} className="btn text-white bg-white btn-xs"><FaTrash className='text-red-700' /></label>
                </div>
            </td>

        </tr>
    );
};

export default ManageJobApplicationsRow;
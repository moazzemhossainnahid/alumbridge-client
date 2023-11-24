import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPen, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ManageSocializationsRow = ({ post, index, setDeletePost }) => {

    const { title, quantity, category, location, description, _id } = post;
    const { register, handleSubmit, reset } = useForm();


    const handleUpdatePost = async (data) => {


        const post = {
            title: data.title,
            quantity: data.quantity,
            location: data.location,
            description: data.description,
        };

        console.log(post);

        // send to database
        fetch(`http://localhost:5000/api/v1/socializations/${_id}`, {
            method: "PATCH",
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
                    toast.success("Blog Update Successfully");
                    reset();
                    window.location.reload();
                } else {
                    toast.error("Faild to Update Blog");
                }
            });

    }

    return (
        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto text-sm text-gray-800 text-center border border-b block font-semibold lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Index</span>
                {index + 1}
            </td>
            <td className="w-full lg:w-auto text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Title</span>
                {title} <br />
            </td>
            <td className="w-full lg:w-auto text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Category</span>
                {category}
            </td>
            <td className="w-full lg:w-auto font-bold text-gray-700 text-sm text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Quantity</span>
                {quantity}
            </td>
            <td className="w-full lg:w-auto text-xs text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <div className="flex justify-center pb-1 items-center gap-2">
                    <label htmlFor="update-post-modal" className=" text-black rounded shadow px-2 py-1 cursor-pointer text-xs bg-danger "><FaPen className='text-green-700' /></label>
                    <label htmlFor="delete-post-modal" onClick={() => setDeletePost(post)} className=" text-black rounded shadow px-2 py-1 cursor-pointer text-xs bg-danger "><FaTrash className='text-red-700' /></label>
                </div>

            </td>

            {/* <!-- The Update Blog modal --> */}

            <input type="checkbox" id="update-blog-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative  bg-slate-300">
                    <label
                        for="update-blog-modal"
                        class="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 class="text-lg font-bold">Please Update Post Information</h3>
                    <form
                        onSubmit={handleSubmit(handleUpdatePost)}
                        action=""
                        className="py-3"
                    >
                        <input
                            {...register("category")}
                            type="text"
                            placeholder="Enter Post Title"
                            className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                        />
                        <input
                            {...register("title")}
                            defaultValue={title}
                            type="text"
                            placeholder="Enter Post Title"
                            className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                        />
                        {/* <input
                            {...register("quantity")}
                            defaultValue={post?.quantity}
                            type="text"
                            placeholder={`${(selectType === "Blood" && "How Many Bags Needed") || (selectType === "Volunteer" && "How Many Persons Needed")}`}
                            className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                        /> */}
                        <textarea
                            {...register("location")}
                            defaultValue={location}
                            type="text"
                            placeholder="Enter Where Needed (Location)"
                            className="input bg-slate-100 my-2 input-ghost h-16 w-full block mx-auto"
                        />
                        <textarea
                            {...register("description")}
                            defaultValue={post?.description}
                            type="text"
                            placeholder="Enter Description"
                            className="input bg-slate-100 my-2 input-ghost w-full h-28 block mx-auto"
                        />
                        <input
                            className="btn px-7 btn-primary mt-5 block mx-auto"
                            type="submit"
                            value="Update Post"
                        />
                    </form>
                </div>
            </div>
        </tr>
    );
};

export default ManageSocializationsRow;
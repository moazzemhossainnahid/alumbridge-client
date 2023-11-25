import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const UpdateSocializationsModal = ({ updatePost, setNumber, number }) => {
    const { title, quantity, category, location, description, _id } = updatePost;

    const { register, handleSubmit, reset } = useForm();

    const handleUpdatePost = async (data) => {
        const post = {
            category: category,
            title: data.title,
            quantity: data.quantity,
            location: data.location,
            description: data.description,
        };

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
                if (data?.status === "Successful") {
                    toast.success("Blog Update Successfully");
                    reset();
                    setNumber(number + 1);
                    closeModal();
                } else {
                    toast.error("Failed to Update Blog");
                }
            });
    };

    const closeModal = () => {
        window.location.reload();
    };

    return (
        <div>
            <input type="checkbox" id="update-post-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="update-post-modal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={closeModal}>
                        ✕
                    </label>
                    <h1 className='mb-4 badge badge-error text-2xl badge-lg p-4'>Update Post</h1>
                    <div className="w-full gap-3">
                        <form onSubmit={handleSubmit(handleUpdatePost)} className="py-3">
                            <div className="relative z-0 my-2">
                                <select
                                    value={category}
                                    className="input input-bordered input-dark w-full"
                                >
                                    <option disabled>{category}</option>
                                </select>
                            </div>
                            <input
                                {...register("title")}
                                defaultValue={title}
                                type="text"
                                required
                                placeholder="Enter Post Title"
                                className="input bg-slate-200 my-2 input-ghost w-full block mx-auto"
                            />
                            <input
                                {...register("quantity")}
                                defaultValue={quantity}
                                type="number"
                                required
                                placeholder={`${(category === "Blood" && "How Many Bags Needed") || (category === "Volunteer" && "How Many Persons Needed")}`}
                                className="input bg-slate-200 my-2 input-ghost w-full block mx-auto"
                            />
                            <textarea
                                {...register("location")}
                                defaultValue={location}
                                type="text"
                                required
                                placeholder="Enter Where Needed (Location)"
                                className="input bg-slate-200 my-2 input-ghost h-16 w-full block mx-auto"
                            />
                            <textarea
                                {...register("description")}
                                defaultValue={description}
                                type="text"
                                required
                                placeholder="Enter Description"
                                className="input bg-slate-200 my-2 input-ghost w-full h-28 block mx-auto"
                            />
                            <input
                                className="btn px-7 btn-primary mt-5 block mx-auto"
                                type="submit"
                                value="Update Post"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateSocializationsModal;

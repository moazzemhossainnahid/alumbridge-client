import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const UpdateBlogsModal = ({ updateBlog }) => {
    const { title, banner, category, author, description, _id } = updateBlog;

    const { register, handleSubmit, reset } = useForm();

    const imageUrlKey = "e738f1d16de6b265746b7f82cc157644";

    const handleUpdateBlog = async (data) => {


        if (data?.photoURL[0]) {
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
                        const blog = {
                            title: data.title,
                            category: data.category,
                            description: data.description,
                            banner: img,
                        };

                        console.log(blog);

                        // send to database
                        fetch(`https://alumbridge-server.vercel.app/api/v1/blogs/${_id}`, {
                            method: "PATCH",
                            headers: {
                                "content-type": "application/json",
                                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                            },
                            body: JSON.stringify(blog),
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
                });
        } else {
            const blog = {
                title: data.title,
                category: data.category,
                description: data.description,
                banner: banner,
            };

            console.log(blog);

            // send to database
            fetch(`https://alumbridge-server.vercel.app/api/v1/blogs/${_id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(blog),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data?.status === "Successful") {
                        toast.success("Blog Update Successfully");
                        reset();
                        closeModal();
                    } else {
                        toast.error("Faild to Update Blog");
                    }
                });
        }

    };

    const closeModal = () => {
        window.location.reload();
    };

    return (
        <div>
            <input type="checkbox" id="update-blog-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="update-blog-modal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={closeModal}>
                        ✕
                    </label>
                    <h1 className='mb-4 badge badge-error text-2xl badge-lg p-4'>Update Blog</h1>
                    <div className="w-full gap-3">
                        <form onSubmit={handleSubmit(handleUpdateBlog)} className="py-3">
                            <input
                                {...register("title")}
                                defaultValue={title}
                                type="text"
                                required
                                placeholder="Enter Blog Title"
                                className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                            />
                            <input
                                {...register("category")}
                                defaultValue={category}
                                type="text"
                                required
                                placeholder="Enter Blog Category"
                                className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                            />
                            <textarea
                                {...register("description")}
                                defaultValue={description}
                                type="text"
                                required
                                placeholder="Enter Blog Description"
                                className="input bg-slate-100 my-2 input-ghost w-full h-28 block mx-auto"
                            />
                            <div className="flex justify-between items-center gap-3">
                                <input
                                    {...register("photoURL")}
                                    type="file"
                                    required
                                    placeholder="Enter Your Image"
                                    className="file-input file-input-bordered bg-slate-100 my-2 items-center w-full mx-auto block"
                                />
                                <img src={banner} alt="" className="w-16 h-16" />
                            </div>
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

export default UpdateBlogsModal;

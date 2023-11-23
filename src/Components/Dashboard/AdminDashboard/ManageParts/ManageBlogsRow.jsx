import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPen, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ManageBlogsRow = ({ blog, index, setDeleteBlog }) => {

    const { title, banner, category, author, description, _id } = blog;
    const { register, handleSubmit, reset } = useForm();

    const imageUrlKey = "e738f1d16de6b265746b7f82cc157644";

    const handleUpdateService = async (data) => {


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
                            author: data.author,
                            description: data.description,
                            banner: img,
                        };

                        console.log(blog);

                        // send to database
                        fetch(`http://localhost:5000/api/v1/blogs/${_id}`, {
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
                author: data.author,
                description: data.description,
                banner: banner,
            };

            console.log(blog);

            // send to database
            fetch(`http://localhost:5000/api/v1/blogs/${_id}`, {
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

    };


    return (
        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto text-sm text-gray-800 text-center border border-b block font-semibold lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Index</span>
                {index + 1}
            </td>
            <td className="w-full lg:w-auto text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Banner</span>
                <img src={banner} alt="" className="w-12 h-12 rounded-full p-1" />
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
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Author</span>
                {author}
            </td>
            <td className="w-full lg:w-auto text-xs text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <div className="flex justify-center pb-1 items-center gap-2">
                    <label htmlFor="update-blog-modal" onClick={() => setDeleteBlog(blog)} className=" text-black rounded shadow px-2 py-1 cursor-pointer text-xs bg-danger "><FaPen className='text-green-700' /></label>
                    <label htmlFor="delete-blog-modal" onClick={() => setDeleteBlog(blog)} className=" text-black rounded shadow px-2 py-1 cursor-pointer text-xs bg-danger "><FaTrash className='text-red-700' /></label>
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
                    <h3 class="text-lg font-bold">Please Update Blog Information</h3>
                    <form
                        onSubmit={handleSubmit(handleUpdateService)}
                        action=""
                        className="py-3"
                    >
                        <input
                            {...register("title")}
                            defaultValue={blog?.title}
                            type="text"
                            placeholder="Enter Blog Title"
                            className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                        />
                        <input
                            {...register("category")}
                            defaultValue={blog?.category}
                            type="text"
                            placeholder="Enter Blog Category"
                            className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                        />
                        <input
                            {...register("author")}
                            defaultValue={blog?.author}
                            type="text"
                            placeholder="Enter Blog Author"
                            className="input bg-slate-100 my-2 input-ghost w-full block mx-auto"
                        />
                        <textarea
                            {...register("description")}
                            defaultValue={blog?.description}
                            type="text"
                            placeholder="Enter Blog Description"
                            className="input bg-slate-100 my-2 input-ghost w-full h-28 block mx-auto"
                        />
                        <div className="flex justify-between items-center gap-3">
                            <input
                                {...register("photoURL")}
                                type="file"
                                placeholder="Enter Your Image"
                                className="file-input file-input-bordered bg-slate-100 my-2 items-center w-full mx-auto block"
                            />
                            <img src={blog?.banner} alt="" className="w-16 h-16" />
                        </div>
                        <input
                            className="btn px-7 btn-primary mt-5 block mx-auto"
                            type="submit"
                            value="Update Blog"
                        />
                    </form>
                </div>
            </div>
        </tr>
    );
};

export default ManageBlogsRow;
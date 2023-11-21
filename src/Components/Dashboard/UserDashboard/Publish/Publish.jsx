import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../../../../firebase.init";

const Publish = () => {
    const { register, handleSubmit, reset } = useForm();
    const imageUrlKey = "e738f1d16de6b265746b7f82cc157644";
    const [user] = useAuthState(auth);

    const authorAvatar = user?.photoURL ? user?.photoURL : "https://www.shareicon.net/data/2016/05/26/771188_man_512x512.png";
 
    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', { month: 'long' });
    }

    let today = new Date();
    let date = (getMonthName(today.getMonth() + 1)) + ' ' + today.getDate() + ',' + today.getFullYear();

    // console.log(date);

    const handlePublishPost = (data) => {
        const {
            title,
            category,
            subCategory,
            authorName,
            authorEmail,
            description,
            resource
        } = data;

        console.log(data);

        const image = data.image[0];
        // const resource = data.resource[0];
        const imgData = new FormData();
        imgData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageUrlKey}`;
        fetch(url, {
            method: "POST",
            body: imgData,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    const img = result.data.url;

                    // const formData = new FormData();
                    // formData.append("title", title);
                    // formData.append("category", category);
                    // formData.append("subCategory", subCategory);
                    // formData.append("authorName", authorName);
                    // formData.append("authorAvatar", authorAvatar);
                    // formData.append("authorEmail", authorEmail);
                    // formData.append("description", description);
                    // formData.append("createdAt", date);
                    // formData.append("resource", resource);
                    // formData.append("cover", img);

                    const postData = {
                        title:title,
                        category:category,
                        subCategory:subCategory,
                        authorName:authorName,
                        authorAvatar:authorAvatar,
                        authorEmail:authorEmail,
                        description:description,
                        createdAt:date,
                        resource:resource,
                        cover:img,
                        status:"unapprove"
                    }

                    console.log(postData);

                    // Post to database
                    fetch(`https://alumbridge-server.vercel.app/api/v1/posts`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                        body: JSON.stringify(postData),
                        // body: formData,
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                            if (data.acknowledged === true) {
                                toast.success("Data Added Successfully !");
                                reset();
                            }
                        });
                }
            });
    };

    return (
        <div className=" text-left h-full w-full lg:pt-20">
            <div className="w-full flex items-center justify-center my-12">
                <div className="bg-white shadow rounded py-12 lg:px-28 px-8">
                    <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">
                        Publish a Post
                    </p>
                    <form
                        onSubmit={handleSubmit(handlePublishPost)}
                        className="mb-32"
                        action=""
                    >
                        <div className="md:flex items-center mt-12">
                            <div className="md:w-72 flex flex-col">
                                <label className="text-base font-semibold leading-none text-gray-800">
                                    Post Title
                                </label>
                                <input
                                    {...register("title")}
                                    required
                                    tabIndex={0}
                                    arial-label="Please input title"
                                    type="text"
                                    className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400"
                                    placeholder="Please input titile"
                                />
                            </div>
                            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className="text-base font-semibold leading-none text-gray-800">
                                    Category
                                </label>
                                <input
                                    {...register("category")}
                                    required
                                    tabIndex={0}
                                    arial-label="Please input category"
                                    type="text"
                                    className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400"
                                    placeholder="Please input category"
                                />
                            </div>
                        </div>

                        <div className="md:flex items-center mt-12">
                            <div className="md:w-72 flex flex-col">
                                <label className="text-base font-semibold leading-none text-gray-800">
                                    subCategory
                                </label>
                                <input
                                    {...register("subCategory")}
                                    required
                                    tabIndex={0}
                                    arial-label="Please input subCategory"
                                    type="text"
                                    className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400"
                                    placeholder="Please input subCategory"
                                />
                            </div>
                            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className="text-base font-semibold leading-none text-gray-800">
                                    Post Cover Image
                                </label>
                                <input
                                    {...register("image")}
                                    required
                                    tabIndex={0}
                                    arial-label="Please input Image"
                                    type="file"
                                    className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400"
                                    placeholder="Please input Image"
                                />
                            </div>
                        </div>

                        <div className="md:flex items-center mt-12">
                            <div className="md:w-72 flex flex-col">
                                <label className="text-base font-semibold leading-none text-gray-800">
                                    Author Name
                                </label>
                                <input
                                    {...register("authorName")}
                                    required
                                    tabIndex={0}
                                    arial-label="Please input authorName"
                                    type="text"
                                    className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400"
                                    placeholder="Please input authorName"
                                />
                            </div>

                            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className="text-base font-semibold leading-none text-gray-800">
                                    Author Email
                                </label>
                                <input
                                    {...register("authorEmail")}
                                    required
                                    tabIndex={0}
                                    readOnly
                                    defaultValue={user?.email}
                                    arial-label="Please input authorEmail"
                                    type="email"
                                    className="text-base  leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400"
                                    placeholder="Please input authorEmail"
                                />
                            </div>
                        </div>

                        <div className="w-full mt-12">
                            <div className="w-full flex flex-col mt-4">
                                <label className="text-base font-semibold leading-none text-gray-800">
                                    Add a Resource <span className="text-red-500 text-xs">(add a google drive link <sup>*</sup>)</span>
                                </label>
                                <input
                                    {...register("resource")}
                                    required
                                    tabIndex={0}
                                    arial-label="Please input resource"
                                    type="text"
                                    className="text-base  leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400"
                                    placeholder="Please input resource link"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="w-full flex flex-col mt-8">
                                <label className="text-base font-semibold leading-none text-gray-800">
                                    Post Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    required
                                    tabIndex={0}
                                    aria-label="leave a message"
                                    type="text"
                                    className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200  resize-none"
                                    placeholder="Add Post Description"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full">
                            <button
                                type="submit"
                                className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-warning rounded hover:bg-primary focus:ring-2 focus:ring-offset-2 focus:ring-secondary focus:outline-none"
                            >
                                Add Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Publish;

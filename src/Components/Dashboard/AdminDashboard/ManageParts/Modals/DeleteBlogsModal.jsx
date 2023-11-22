
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DeleteBlogsModal = ({ deleteBlog, setNumber, number }) => {
    console.log(deleteBlog);
    const [formattedDate, setFormattedDate] = useState('');
    const { author, banner, category, description, title, createdAt, _id } = deleteBlog;


    useEffect(() => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const date = new Date(createdAt);
        const formattedDate = date.toLocaleDateString('en-US', options);
        setFormattedDate(formattedDate);
    }, [createdAt]);


    const handleDelete = (id) => {
        const url = `https://alumbridge-server.vercel.app/api/v1/blogs/${id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.deletedCount > 0) {
                    // console.log(data);
                    toast.success(` Blog id (${_id}) has been deleted.`);
                    setNumber(number + 1);
                } else if (data?.status === 'fail') {
                    toast.error(` Somethig wrong...`);
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="delete-blog-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="delete-blog-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='mb-4 badge badge-error text-2xl badge-lg p-4'>Delete Blog</h1>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3">
                        <div className="w-full md:w-4/5 order-2 md:order-1">
                            <h3 className="font-bold text-lg">{title}</h3>
                            <p className='my-4'>Category: {category}</p>
                            <p className='my-4'>Author: {author}</p>
                            <p className='my-4'>Published: {formattedDate}</p>
                            <p className='my-4'>Description: {description?.slice(0,150)}</p>
                        </div>
                        <div className="w-full md:w-1/5 order-1 md:order-2">
                            <img src={banner} alt="cover" className="w-24 h-24 rounded-full mx-auto" />
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="delete-blog-modal" onClick={() => handleDelete(_id)} className="btn bg-gray-700 text-white">Delete</label>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DeleteBlogsModal;
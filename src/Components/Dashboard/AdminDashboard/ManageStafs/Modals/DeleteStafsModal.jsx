
import { toast } from 'react-toastify';

const DeleteStafsModal = ({ deleteStaf, setNumber, number }) => {


    const handleDelete = (id) => {
        const url = `http://localhost:5000/api/v1/stafs/${id}`;
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
                    toast.success(` Staf has been deleted.`);
                    setNumber(number + 1);
                }else if(data?.status === 'fail'){
                    toast.error(` Somethig wrong...`);
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="delete-staf-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="delete-staf-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='mb-4 badge badge-error text-2xl badge-lg p-4'>Delete Staf</h1>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3">
                        <div className="w-full md:w-4/5 order-2 md:order-1">
                            <h3 className="font-bold text-lg">{deleteStaf?.name}</h3>
                            <p className='my-4'>Age: {deleteStaf?.age}</p>
                            <p className='my-4'>Experience: {deleteStaf?.experience}</p>
                            <p className='my-4'>Work Name: {deleteStaf?.work_name}</p>
                        </div>
                        <div className="w-full md:w-1/5 order-1 md:order-2">
                            <img src={deleteStaf?.image} alt="cover" className="w-24 h-24 rounded-full mx-auto" />
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="delete-staf-modal" onClick={() => handleDelete(deleteStaf?._id)} className="btn bg-gray-700 text-white">Delete</label>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DeleteStafsModal;
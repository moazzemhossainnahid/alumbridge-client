
import { toast } from 'react-toastify';

const DeleteJobModal = ({ deleteJob, setNumber, number }) => {
    // console.log(deleteJob);
    const { jobTitle, companyName, positionName, skills, description, vacancy, _id } = deleteJob;


    const handleDelete = (id) => {
        const url = `http://localhost:5000/api/v1/jobs/${id}`;
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
                    toast.success(` Job id (${_id}) has been deleted.`);
                    setNumber(number + 1);
                } else if (data?.status === 'fail') {
                    toast.error(` Somethig wrong...`);
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="delete-job-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="delete-job-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='mb-4 badge badge-error text-2xl badge-lg p-4'>Delete Job</h1>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3">
                        <div className="w-full md:w-4/5 order-2 md:order-1">
                            <h3 className="font-bold text-lg">{jobTitle ? jobTitle : "Title Not Found"}</h3>
                            <p className='my-4'>Company: {companyName}</p>
                            <p className='my-4'>Position Name: {positionName}</p>
                            <p className='my-4'>Vacancy: {vacancy}</p>
                            <p className='my-4'>Skills: {skills}</p>
                        </div>
                        <div className="w-full md:w-1/5 order-1 md:order-2">
                            <img src={`https://cdn-icons-png.flaticon.com/512/65/65053.png`} alt="cover" className="w-24 h-24 rounded-full mx-auto" />
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="delete-job-modal" onClick={() => handleDelete(_id)} className="btn bg-gray-700 text-white">Delete</label>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DeleteJobModal;

import { toast } from 'react-toastify';

const DeleteBookingsModal = ({ deleteBooking, setNumber, number }) => {

    console.log(deleteBooking);

    const handleDelete = (id) => {
        const url = `http://localhost:5000/api/v1/bookings/${id}`;
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
                    toast.success(` Booking Data has been deleted.`);
                    setNumber(number + 1);
                }else if(data?.status === 'fail'){
                    toast.error(` Somethig wrong...`);
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="delete-booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="delete-booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='mb-4 badge badge-error text-2xl badge-lg p-4'>Delete Booking Data</h1>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3">
                        <div className="w-full md:w-4/5 order-2 md:order-1">
                            <h3 className="font-bold text-lg">{deleteBooking?.name}</h3>
                            <p className='my-4'>Service: {deleteBooking?.service}</p>
                            <p className='my-4'>Phone: {deleteBooking?.phone}</p>
                            <p className='my-4'>Email: {deleteBooking?.email}</p>
                            <p className='my-4'>Address: {deleteBooking?.address}</p>
                            <p className='my-4'>Message: {deleteBooking?.message}</p>
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="delete-booking-modal" onClick={() => handleDelete(deleteBooking?._id)} className="btn bg-gray-700 text-white">Delete</label>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DeleteBookingsModal;
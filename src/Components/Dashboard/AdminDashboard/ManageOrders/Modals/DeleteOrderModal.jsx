
import { toast } from 'react-toastify';

const DeleteOrderModal = ({ deleteOrder, setNumber, number }) => {

    const { createdAt, cus_name, deliveryStatus, tran_id, paymentStatus, product_name, product_image, _id } = deleteOrder;


    const handleDelete = (id) => {
        const url = `http://localhost:5000/api/v1/orders/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data?.status !== "fail") {
                    // console.log(data);
                    toast.success(` Order id (${_id}) has been deleted.`);
                    setNumber(number + 1);
                }else{
                    toast.error(` ${data?.error}`);
                }
            })
    }
    const options = {
        dateStyle: "short", // 'short' or 'long' based on your preference
      };
    return (
        <div>
            <input type="checkbox" id="delete-order-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="delete-order-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='mb-4 badge  badge-error text-2xl badge-lg p-4'>Delete Order</h1>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3">
                        <div className="w-full md:w-4/5 order-2 md:order-1">
                            <h3 className="font-bold text-lg">{product_name}</h3>
                            <p className='my-4'>Customer Name: {cus_name}</p>
                            <p className='my-4'>Delivery Status: {deliveryStatus}</p>
                            <p className='my-4'>Payment Status: {paymentStatus}</p>
                            <p className='my-4'>Transaction ID: {tran_id}</p>
                            <p className='my-4'>Order Date: {new Date(createdAt).toLocaleString(undefined, options)}</p>
                        </div>
                        <div className="w-full md:w-1/5 order-1 md:order-2">
                            <img src={product_image} alt="cover" className="w-24 h-24 rounded-full mx-auto" />
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="delete-order-modal" onClick={() => handleDelete(_id)} className="btn">Delete</label>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DeleteOrderModal;
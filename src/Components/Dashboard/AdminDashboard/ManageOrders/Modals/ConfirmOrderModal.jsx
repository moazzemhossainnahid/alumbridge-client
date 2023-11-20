import { toast } from "react-toastify";

const ConfirmOrderModal = ({ confirmOrder, setNumber, number }) => {
  const {
    createdAt,
    cus_name,
    cus_email,
    cus_phone,
    cus_state,
    total_amount,
    deliveryStatus,
    tran_id,
    product_category,
    paymentStatus,
    product_name,
    product_image,
    _id,
  } = confirmOrder;

  console.log(confirmOrder);

  const handleConfirmOrder = (id) => {
    const url = `http://localhost:5000/api/v1/orders/${id}`;
    fetch(url, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status !== "fail") {
          // console.log(data);
          toast.success(`Order id (${_id}) has been Confirmed.`);
          setNumber(number + 1);
        } else {
          toast.error(` ${data?.error}`);
        }
      });
  };

  return (
    <div>
      <input
        type="checkbox"
        id="confirm-order-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-5xl relative ">
          <div className="hidden md:block absolute top-0 h-full w-full left-0 mix-blend-darken opacity-5">
            <img
              src="https://res-console.cloudinary.com/dsigyjfjq/thumbnails/v1/image/upload/v1690616136/TG92ZXBpa19jb20tODMyMzU2ODk1LVRlY2hub2xvZ3lfc2hhZGluZ19ibHVlLXZpb2xldF9ncmFkaWVudF9saW5lX2VsZW1lbnRfZGVzaWduX2I3cWx5cQ==/preview"
              alt=""
              className="h-full w-full mix-blend-darken"
            />
          </div>

          <label
            htmlFor="confirm-order-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="w-full flex gap-5 items-center">
            <h1 className="mb-4 badge badge-sm badge-warning text-sm font-bold relative text-white p-4">
              Order History
            </h1>
            <h1 className="mb-4 text-3xl font-bold text-gray-700 p-4 relative">
              {product_name}
            </h1>
          </div>
          <div className="w-full relative flex flex-col md:flex-row justify-between items-start gap-3">
            <div className="">
              <div className="w-full md:w-4/5 order-2 md:order-1">
                <h3 className="text-2xl font-bold pb-3">Product Info-</h3>
                <p className="my-4">Product Category: {product_category}</p>
                <p className="my-4">Total Payment: {total_amount}</p>
                <p className="my-4">Payment Status: {paymentStatus}</p>
                <p className="my-4">Transaction ID: {tran_id}</p>
              </div>
            </div>
            <div className="">
              <div className="w-full md:w-4/5 order-2 md:order-1">
                <h3 className="text-2xl font-bold pb-3">Customer Info-</h3>
                <p className="my-4">Name: {cus_name}</p>
                <p className="my-4">Email: {cus_email}</p>
                <p className="my-4">Phone: {cus_phone}</p>
                <p className="my-4">State: {cus_state}</p>
              </div>
            </div>
            <div className="">
              <div className="w-full md:w-4/5 order-2 md:order-1">
                <h3 className="text-2xl font-bold pb-3">Others Info-</h3>
                {/* <p className='my-4'>Uuid: {userId}</p> */}
                <p className={` my-4`}>
                  Delivery Status:{" "}
                  <span
                    className={`${
                      deliveryStatus === "confirmed"
                        ? "text-black badge badge-secondary"
                        : "text-gray-900 badge badge-warning"
                    }`}
                  >
                    {deliveryStatus}
                  </span>
                </p>

                <div className="">
                  <img
                    src={product_image}
                    alt=""
                    className="w-32 h-32 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          {deliveryStatus !== "confirmed" && (
            <div className="modal-action relative">
              <label
                htmlFor="confirm-order-modal"
                onClick={() => handleConfirmOrder(_id)}
                className="btn btn-outline"
              >
                Confirm
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrderModal;

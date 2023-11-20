import React from "react";
import { FaCheck, FaCheckSquare, FaEye } from "react-icons/fa";

const ManageOrdersRow = ({ order, index, setDeleteOrder, setConfirmOrder }) => {
//   console.log(order);

  const { createdAt,cus_name,paymentStatus,product_name,deliveryStatus,product_image, _id } = order;

  // Convert the string to a Date object
  const dateObject = new Date(createdAt);

  // Format the date and time in a human-readable format (24-hour time format)
  const formattedDate = dateObject.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // timeZoneName: "short",
  });

  return (
    <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
      <td className="w-full lg:w-auto p-2 text-sm text-gray-800 text-center border border-b block font-semibold lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          Index
        </span>
        {index + 1}
      </td>
      <td className="w-full lg:w-auto p-2 text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          Product
        </span>
        {product_name?.slice(0,20)}
      </td>
      <td className="w-full lg:w-auto p-2 text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          customerName
        </span>
        {cus_name} <br />
      </td>
      <td className="w-full lg:w-auto p-2 text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          Order Date/Time
        </span>
        {formattedDate}
      </td>
      <td className="w-full lg:w-auto p-2 font-bold text-gray-800 text-sm text-center border border-b block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          Payment Status
        </span>
        <span className="text-green-600">{paymentStatus}</span>
      </td>
      <td className="w-full lg:w-auto text-xs p-2 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
        <div className="flex justify-between px-3 pb-1 gap-2 items-center">
          {paymentStatus !== "paid" && (
            <label
              htmlFor="delete-order-modal"
              onClick={() => setDeleteOrder(order)}
              className="btn text-white btn-secondary btn-xs"
            >
              Delete Order
            </label>
          )}
          {paymentStatus === "paid" && deliveryStatus === "pending" ? (
            <label
              htmlFor="confirm-order-modal"
              onClick={() => setConfirmOrder(order)}
              className="text-black rounded shadow-lg w-24 px-1 mx-auto py-1 cursor-pointer text-xs bg-secondary "
            >
              Confirm Order
            </label>
          ) : (
            <span className="text-black items-center flex justify-center gap-2 font-semibold">
              {" "}
              <FaCheck className="text-secondary text-md font-bold" /> Order
              Confirmed{" "}
              <label
                htmlFor="confirm-order-modal"
                onClick={() => setConfirmOrder(order)}
              >
                <FaEye className="text-secondary text-xl cursor-pointer font-bold" />
              </label>
            </span>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ManageOrdersRow;

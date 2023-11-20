import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const ManageBookingsRow = ({ booking, index, setDeleteBooking }) => {
  const { name, phone, email, service, address, message, createdAt } = booking;
  const options = {
    dateStyle: "short", // 'short' or 'long' based on your preference
  };
  return (
    <div className="">
      <div class="w-full flex flex-col justify-between bg-red-300 rounded-lg border border-red-300 mb-6 py-5 px-4">
        <div className="space-y-3">
          <h3 class="text-gray-800 leading-4 font-semibold">Name: {name}</h3>
          <h3 class="text-gray-800 leading-4 font-semibold">
            Service: {service}
          </h3>
          <div className="space-y-2">
            <p className="">
              <span className="font-semibold">Phone:</span> {phone}
            </p>
            <p className="">
              <span className="font-semibold">Email:</span> {email}
            </p>
            <p className="">
              <span className="font-semibold">Address:</span> {address}
            </p>
            <p className="">
              <span className="font-semibold">Message:</span> {message}
            </p>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between text-gray-800">
            <p class="text-sm">
              Date: {new Date(createdAt).toLocaleString(undefined, options)}
            </p>
            <label
              htmlFor="delete-booking-modal"
              onClick={() => setDeleteBooking(booking)}
              class="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-red-300 focus:ring-black"
              aria-label="edit note"
              role="button"
            >
              <FaTrashAlt />
            </label>
            {/* <label htmlFor="delete-booking-modal" onClick={() => setDeleteBooking(booking)} className="btn text-white btn-secondary btn-xs">Delete Staf</label> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBookingsRow;

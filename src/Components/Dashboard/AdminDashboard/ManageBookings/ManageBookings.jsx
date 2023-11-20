import React, { useEffect, useState } from "react";
import DeleteBookingsModal from "./Modals/DeleteBookingsModal";
import ManageBookingsRow from "./ManageBookingsRow";

const ManageBookings = () => {
  const [number, setNumber] = useState(0);
  const [bookings, setBookings] = useState(null);
  const [deleteBooking, setDeleteBooking] = useState(null);
  const [allBookings, setAllBookings] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data?.data));
  }, [number]);

  return (
    <div className=" text-left h-full w-full">
      <div className="w-full flex items-center justify-center my-12">
        <div className="bg-white shadow rounded py-12 px-8 mb-20">
          <p className="md:text-3xl text-xl font-bold pb-10 leading-7 text-center text-gray-700">
            Total Bookings Data: {bookings?.result?.length}
          </p>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto">
            {/* <!-- row 1 --> */}

            {allBookings
              ? bookings?.result?.map((booking, index) => (
                  <ManageBookingsRow
                    key={booking?._id}
                    booking={booking}
                    index={index}
                    setDeleteBooking={setDeleteBooking}
                  ></ManageBookingsRow>
                ))
              : bookings?.result
                  ?.slice(0, 4)
                  ?.map((booking, index) => (
                    <ManageBookingsRow
                      key={booking?._id}
                      booking={booking}
                      index={index}
                      setDeleteBooking={setDeleteBooking}
                    ></ManageBookingsRow>
                  ))}
          </div>
          {bookings?.result?.length > 4 && (
            <div className="pt-7">
              <button
                onClick={() => setAllBookings(!allBookings)}
                className="btn btn-outline btn-secondary flex items-center justify-center mx-auto"
              >
                {`${allBookings ? "See Less Bookings" : "See More Bookings"}`}{" "}
                <span className="text-2xl -mt-1">&#8608;</span>
              </button>
            </div>
          )}
        </div>
        {deleteBooking && (
          <DeleteBookingsModal
            deleteBooking={deleteBooking}
            setNumber={setNumber}
            number={number}
          ></DeleteBookingsModal>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;

import React from "react";
import { useNavigate } from "react-router-dom";

const AllSocializationsGrid = ({ socialization }) => {
  const navigate = useNavigate();
console.log(socialization);
  return (
    <div onClick={() => navigate(`/socializations/${socialization?._id}`)} className="w-full border shadow-lg cursor-pointer hover:shadow-2xl">
      <div className="mx-2 lg:mb-0 mb-8">
        <div className="bg-white p-3">
          <h3 className="text-start text-xl font-bold">{socialization?.title}</h3>
          <div className="flex items-center justify-between px-4 pt-4">
            <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
            <h2 className="text-xs font-semibold">{socialization?.location}</h2>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-start text-gray-600">
              {socialization?.description?.slice(0, 250)}
            </p>
            <div className="w-full mt-4">
              <div className="space-y-3">
                <p className="w-fit text-xs text-gray-600 px-2 bg-gray-200 py-1 font-semibold">
                  Quantity: <span className="font-normal">{socialization?.quantity}</span>
                </p>
                <p className="w-fit text-xs text-gray-600 px-2 bg-gray-200 py-1 font-semibold">
                  Category: <span className="font-normal">{socialization?.category}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSocializationsGrid;

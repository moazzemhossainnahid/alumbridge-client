import React from "react";
import { useNavigate } from "react-router-dom";

const AllJobsGrid = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/jobs/${job?._id}`)} className="w-full border shadow-lg cursor-pointer hover:shadow-2xl">
      <div className="mx-2 lg:mb-0 mb-8">
        <div className="bg-white p-3">
          <h3 className="text-start text-xl font-bold">{job?.jobTitle}</h3>
          <div className="flex items-center justify-between px-4 pt-4">
            <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
            <h2 className="text-xs font-semibold">{job?.companyName}</h2>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-start text-gray-600">
              {job?.description?.slice(0, 250)}
            </p>
            <div className="w-full mt-4">
              <div className="space-y-3">
                <p className="w-fit text-xs text-gray-600 px-2 bg-gray-200 py-1 font-semibold">
                  Position: <span className="font-normal">{job?.positionName}</span>
                </p>
                <p className="w-fit text-xs text-gray-600 px-2 bg-gray-200 py-1 font-semibold">
                  Vacancy: <span className="font-normal">{job?.vacancy}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJobsGrid;

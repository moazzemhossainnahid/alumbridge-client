import React, { useEffect, useState } from "react";
import ManageJobApplicationsRow from "./ManageJobApplicationsRow";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase.init";
import ViewJobApplicationsModal from "./Modals/ViewJobApplicationsModal";

const ManageJobApplications = () => {
  const [applications, setApplications] = useState(null);
  const [viewApplication, setViewApplication] = useState(null);
  const[user] = useAuthState(auth)

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/jobapplications")
      .then((res) => res.json())
      .then((data) => setApplications(data?.data));
  }, []);

  const applicationFilter = applications && applications?.result?.filter(app => app?.email === user?.email);

  return (
    <div className=" text-left h-full w-full">
      <div className="w-full flex items-center justify-center my-12">
        <div className="bg-white shadow rounded py-12 px-8 mb-20">
          <p className="md:text-3xl text-xl font-bold pb-10 leading-7 text-center text-gray-700">
            Total Job Applications: {applicationFilter?.length}
          </p>
          <table className="border-collapse w-full bg-slate-200">
            {/* <!-- head --> */}
            <thead>
              <tr className="text-center">
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Index
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Name
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Phone
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Address
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}

              {applicationFilter?.map((application, index) => (
                <ManageJobApplicationsRow
                  key={application?._id}
                  application={application}
                  setViewApplication={setViewApplication}
                  index={index}
                ></ManageJobApplicationsRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {viewApplication && (
        <ViewJobApplicationsModal
        application={viewApplication}
        ></ViewJobApplicationsModal>
      )}
    </div>
  );
};

export default ManageJobApplications;

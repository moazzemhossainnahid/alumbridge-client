import { useEffect, useState } from "react";

import UserDetails from "./UserDetails";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState(false);

  useEffect(() => {
    fetch("https://alumbridge-server.vercel.app/api/v1/users", {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [users]);

  return (
    <div className=" text-left h-full w-full">
      <div className="w-full flex items-center justify-center my-12">
        <div className="bg-white shadow rounded py-12 px-8 mb-20">
          <p className="md:text-3xl text-xl font-bold pb-10 leading-7 text-center text-gray-700">
            Total Users: {users?.length}
          </p>
          <div className="w-full">
            <table className="border-collapse w-full bg-slate-200">
              <thead>
                <tr className="text-center">
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Index
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Users
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Status
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers
                  ? users?.map((user, index) => (
                      <UserDetails key={user._id} user={user} index={index} />
                    ))
                  : users
                      ?.slice(0, 7)
                      ?.map((user, index) => (
                        <UserDetails key={user._id} user={user} index={index} />
                      ))}
              </tbody>
            </table>
            {users?.length > 7 && (
              <div className="pt-7">
                <button
                  onClick={() => setAllUsers(!allUsers)}
                  className="btn btn-outline btn-secondary flex items-center justify-center mx-auto"
                >
                  {`${allUsers ? "See Less Users" : "See More Users"}`}{" "}
                  <span className="text-2xl -mt-1">&#8608;</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;

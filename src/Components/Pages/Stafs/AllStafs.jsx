import React from "react";
import UseStafs from "../../../Hooks/useStafs";
import AllStafsGrid from "./AllStafsGrid";

const AllStafs = () => {
  const [stafs] = UseStafs();

  console.log(stafs);
  return (
    <div className="w-full h-full py-20">
      <h1 className="text-3xl md:text-5xl pb-10 font-semibold leading-10 text-gray-800 text-center">
        Meet our Stafs
      </h1>

      <div className="w-full md:w-5/6 mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center">
        {stafs?.map((staf) => (
          <AllStafsGrid staf={staf} key={staf?._id} />
        ))}
      </div>
    </div>
  );
};

export default AllStafs;

import React from "react";
import AllJobsGrid from "./AllJobsGrid";
import useJobs from "../../../Hooks/useJobs";

const RelatedServices = ({ service }) => {
  const [services] = useJobs();
  const disMatchId = services?.filter((s) => s?._id !== service?._id);

  return (
    disMatchId?.length > 0 && (
      <div className="py-10">
        <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-center font-display py-7">
          More Job Post You Might Like
        </h3>
        <div className="w-[70px] mx-auto h-[3px] bg-[#1584f3] mb-10 relative ">
          <div className="radiant bg-[#FFFFFF]"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5 p5 md:px-10">
          {disMatchId &&
            disMatchId?.slice(0,3)?.map((job) => (
              <AllJobsGrid job={job} key={job?._id} />
            ))}
        </div>
      </div>
    )
  );
};

export default RelatedServices;
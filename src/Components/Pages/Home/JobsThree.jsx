import React from "react";
import { useNavigate } from "react-router-dom";
import useJobs from "../../../Hooks/useJobs";
import AllJobsGrid from "../Jobs/AllJobsGrid";

const JobsThree = () => {
  const [jobs] = useJobs();
  const navigate = useNavigate();

  console.log(jobs);
  return (
    <div className="w-full">
      <div className="py-10">
        <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-center font-display py-7">
          Our top 3 Jobs
        </h3>
        <div className="w-[70px] mx-auto h-[3px] bg-[#1584f3] mb-10 relative ">
          <div className="radiant bg-[#FFFFFF]"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5 p5 md:px-10">
          {jobs &&
            jobs?.slice(0,3)?.map((job) => (
              <AllJobsGrid job={job} key={job?._id} />
            ))}
        </div>
      </div>
      <button onClick={() => navigate('/jobs')} className="btn btn-outline btn-danger">See More Jobs</button>
    </div>
  );
};

export default JobsThree;

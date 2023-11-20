import React from 'react';
import useJobs from '../../../Hooks/useJobs';
import AllJobsGrid from './AllJobsGrid';

const AllJobs = () => {
    const [jobs] = useJobs();

    console.log(jobs);
    return (
        <div className="w-full h-full py-20">
        <h1 className="text-3xl md:text-5xl pb-10 font-semibold leading-10 text-gray-800 text-center">
          Total Jobs - {jobs?.length}
        </h1>
  
        <div className="w-full md:w-5/6 mx-auto p-5 grid grid-cols-1 gap-5 justify-center items-center">
          {jobs?.map((job) => (
            <AllJobsGrid job={job} key={job?._id} />
          ))}
        </div>
      </div>
    );
};

export default AllJobs;
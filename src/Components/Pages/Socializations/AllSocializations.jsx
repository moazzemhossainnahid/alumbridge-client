import React from 'react';
import AllSocializationsGrid from './AllSocializationsGrid';
import useSocializations from '../../../Hooks/useSocializations';

const AllSocializations = () => {
    const [socializations] = useSocializations();

    console.log(socializations);
    return (
        <div className="w-full h-full py-20">
        <h1 className="text-3xl md:text-5xl pb-10 font-semibold leading-10 text-gray-800 text-center">
          Total Socialization Posts - {socializations?.length}
        </h1>
  
        <div className="w-full md:w-5/6 mx-auto p-5 grid grid-cols-1 gap-5 justify-center items-center">
          {socializations?.map((socialization) => (
            <AllSocializationsGrid socialization={socialization} key={socialization?._id} />
          ))}
        </div>
      </div>
    );
};

export default AllSocializations;
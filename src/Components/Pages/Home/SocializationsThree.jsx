import React from 'react';
import useSocializations from '../../../Hooks/useSocializations';
import { useNavigate } from 'react-router-dom';
import AllSocializationsGrid from '../Socializations/AllSocializationsGrid';

const SocializationsThree = () => {
  const [socializations] = useSocializations();
  const navigate = useNavigate();

  // console.log(jobs);
  return (
    <div className="w-full">
      <div className="py-10">
        <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-center font-display py-7">
          Our Socialization Posts
        </h3>
        <div className="w-[70px] mx-auto h-[3px] bg-[#1584f3] mb-10 relative ">
          <div className="radiant bg-[#FFFFFF]"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5 p5 md:px-10">
          {socializations &&
            socializations?.slice(0, 3)?.map((socialization) => (
              <AllSocializationsGrid socialization={socialization} key={socialization?._id} />
            ))}
        </div>
      </div>
      {socializations?.length > 3 && <button button onClick={() => navigate('/socializations')} className="btn btn-outline btn-danger">See More Posts</button>}
      </div >
    );
};

export default SocializationsThree;
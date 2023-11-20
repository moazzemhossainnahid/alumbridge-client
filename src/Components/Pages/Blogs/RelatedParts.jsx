import React from "react";
import useBlogs from "../../../Hooks/useBlogs";
import AllBlogsGrid from "./AllBlogsGrid";

const RelatedParts = ({ part }) => {
  const [parts] = useBlogs();
  const matchedCategories = parts?.filter(
    (prt) => prt?.category === part?.category
  );
  const disMatchId = matchedCategories?.filter((p) => p?._id !== part?._id);

  return (
    disMatchId?.length > 0 && (
      <div className="py-10">
        <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-center font-display py-7">
          More Parts You Might Like
        </h3>
        <div className="w-[70px] mx-auto h-[3px] bg-[#1584f3] mb-10 relative ">
          <div className="radiant bg-[#FFFFFF]"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5 p5 md:px-10">
          {disMatchId &&
            disMatchId?.map((part) => (
              <AllBlogsGrid part={part} key={part?._id} />
            ))}
        </div>
      </div>
    )
  );
};

export default RelatedParts;

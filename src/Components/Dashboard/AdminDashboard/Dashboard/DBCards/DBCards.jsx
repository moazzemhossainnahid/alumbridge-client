import {
  faArrowAltCircleRight,
  faBookAtlas,
  faBraille,
  faCartShopping,
  faListCheck,
  faBookmark,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../../../../../firebase.init";

const DBCards = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [socializations, setSocializations] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`https://alumbridge-server.vercel.app/api/v1/users`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetch(`https://alumbridge-server.vercel.app/api/v1/jobs`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setJobs(data?.data?.result));
  }, []);

  useEffect(() => {
    fetch(`https://alumbridge-server.vercel.app/api/v1/blogs`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBlogs(data?.data?.result));
  }, []);

  useEffect(() => {
    fetch(`https://alumbridge-server.vercel.app/api/v1/socializations`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSocializations(data?.data?.result));
  }, []);

  useEffect(() => {
    fetch(`https://alumbridge-server.vercel.app/api/v1/jobapplications`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setJobApplications(data?.data?.result));
  }, []);


  const blogsFilter = blogs && blogs?.filter(blog => blog?.email === user?.email);
  const jobsFilter = jobs && jobs?.filter(job => job?.email === user?.email);
  const socializationsFilter = socializations && socializations?.filter(s => s?.email === user?.email);
  const jobApplicationsFilter = jobApplications && jobApplications?.filter(ja => ja?.email === user?.email);


  return (
    <div className="">
      <div className="grid md:grid-cols-2 gap-5 py-10 text-start">
        {/* Registered Users */}
        {/* <div className="">
          <div className="flex items-center justify-between bg-[#252525] p-3 rounded-t-xl">
            <div className="">
              <h3 className="text-3xl md:text-4xl font-bold py-2 text-white">
                {users?.length}
              </h3>
              <h3 className="text-md font-bold text-white">Total Users</h3>
            </div>
            <div className="">
              <FontAwesomeIcon
                className="text-[#42424281] text-3xl md:text-4xl"
                icon={faUsers}
              />
            </div>
          </div>
          <div
            onClick={() => navigate("/cpanel/musers")}
            className="bg-[#1e1e1e] cursor-pointer py-2 text-center rounded-b-xl"
          >
            <h2 className="text-md text-white">
              More Info{" "}
              <FontAwesomeIcon className="pl-2" icon={faArrowAltCircleRight} />{" "}
            </h2>
          </div>
        </div> */}
        {/* Total Jobs */}
        <div className="">
          <div className="flex items-center justify-between bg-[#17A2BB] p-3 rounded-t-xl">
            <div className="">
              <h3 className="text-3xl md:text-4xl font-bold py-2 text-white">
                {jobsFilter?.length}
              </h3>
              <h3 className="text-md font-bold text-white">Total Job Posts</h3>
            </div>
            <div className="">
              <FontAwesomeIcon
                className="text-[#42424281] text-3xl md:text-4xl"
                icon={faCartShopping}
              />
            </div>
          </div>
          <div
            onClick={() => navigate("/cpanel/mjobs")}
            className="bg-[#0c93ab] cursor-pointer py-2 text-center rounded-b-xl"
          >
            <h2 className="text-md text-white">
              More Info{" "}
              <FontAwesomeIcon className="pl-2" icon={faArrowAltCircleRight} />{" "}
            </h2>
          </div>
        </div>
        {/* Total Blogs */}
        <div className="">
          <div className="flex items-center justify-between bg-[#219422] p-3 rounded-t-xl">
            <div className="">
              <h3 className="text-3xl md:text-4xl font-bold py-2 text-white">
                {blogsFilter?.length}
              </h3>
              <h3 className="text-md font-bold text-white">Total Blog Posts</h3>
            </div>
            <div className="">
              <FontAwesomeIcon
                className="text-[#42424281] text-3xl md:text-4xl"
                icon={faBraille}
              />
            </div>
          </div>
          <div
            onClick={() => navigate("/cpanel/mblogs")}
            className="bg-[#186e1a] cursor-pointer py-2 text-center rounded-b-xl"
          >
            <h2 className="text-md text-white">
              More Info{" "}
              <FontAwesomeIcon className="pl-2" icon={faArrowAltCircleRight} />{" "}
            </h2>
          </div>
        </div>

        {/* Total Socializations */}
        <div className="">
          <div className="flex items-center justify-between bg-[#572194b9] p-3 rounded-t-xl">
            <div className="">
              <h3 className="text-3xl md:text-4xl font-bold py-2 text-white">
                {socializationsFilter?.length}
              </h3>
              <h3 className="text-md font-bold text-white">Total Socialization Posts</h3>
            </div>
            <div className="">
              <FontAwesomeIcon
                className="text-[#42424281] text-3xl md:text-4xl"
                icon={faBookAtlas}
              />
            </div>
          </div>
          <div
            onClick={() => navigate("/cpanel/msocializations")}
            className="bg-[#572194ea] cursor-pointer py-2 text-center rounded-b-xl"
          >
            <h2 className="text-md text-white">
              More Info{" "}
              <FontAwesomeIcon className="pl-2" icon={faArrowAltCircleRight} />{" "}
            </h2>
          </div>
        </div>

        {/* Total Job Applications */}
        <div className="">
          <div className="flex items-center justify-between bg-[#ad5530] p-3 rounded-t-xl">
            <div className="">
              <h3 className="text-3xl md:text-4xl font-bold py-2 text-white">
                {jobApplicationsFilter?.length}{" "}
              </h3>
              <h3 className="text-md font-bold text-white">Total Job Applications</h3>
            </div>
            <div className="">
              <FontAwesomeIcon
                className="text-[#42424281] text-3xl md:text-4xl"
                icon={faBookmark}
              />
            </div>
          </div>
          <div
            onClick={() => navigate("/cpanel/mjobapplications")}
            className="bg-[#8f4626] cursor-pointer py-2 text-center rounded-b-xl"
          >
            <h2 className="text-md text-white">
              More Info{" "}
              <FontAwesomeIcon className="pl-2" icon={faArrowAltCircleRight} />{" "}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBCards;

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
import { useNavigate } from "react-router-dom";

const DBCards = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [bloodRequest, setBloodRequest] = useState([]);
  const [volunteerrequest, setVolunteerRequest] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/users`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/jobs`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setJobs(data?.data?.result));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/blogs`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBlogs(data?.data?.result));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/bloods`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBloodRequest(data?.data?.result));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/orders`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setVolunteerRequest(data?.data?.result));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/bookings`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data?.data?.result));
  }, []);


  return (
    <div className="">
      <div className="grid md:grid-cols-2 gap-5 py-10 text-start">
        {/* Registered Users */}
        <div className="">
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
        </div>
        {/* Total Jobs */}
        <div className="">
          <div className="flex items-center justify-between bg-[#17A2BB] p-3 rounded-t-xl">
            <div className="">
              <h3 className="text-3xl md:text-4xl font-bold py-2 text-white">
                {jobs?.length}
              </h3>
              <h3 className="text-md font-bold text-white">Total Jobs</h3>
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
                {blogs?.length}
              </h3>
              <h3 className="text-md font-bold text-white">Total Blogs</h3>
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

        {/* Total Blood Request */}
        <div className="">
          <div className="flex items-center justify-between bg-[#572194b9] p-3 rounded-t-xl">
            <div className="">
              <h3 className="text-3xl md:text-4xl font-bold py-2 text-white">
                {bloodRequest?.length}
              </h3>
              <h3 className="text-md font-bold text-white">Total Blood Request</h3>
            </div>
            <div className="">
              <FontAwesomeIcon
                className="text-[#42424281] text-3xl md:text-4xl"
                icon={faBookAtlas}
              />
            </div>
          </div>
          <div
            onClick={() => navigate("/cpanel/mbloodrequest")}
            className="bg-[#572194ea] cursor-pointer py-2 text-center rounded-b-xl"
          >
            <h2 className="text-md text-white">
              More Info{" "}
              <FontAwesomeIcon className="pl-2" icon={faArrowAltCircleRight} />{" "}
            </h2>
          </div>
        </div>

        {/* Total Volunteer Request */}
        <div className="">
          <div className="flex items-center justify-between bg-[#4040f5] p-3 rounded-t-xl">
            <div className="">
              <h3 className="text-3xl md:text-4xl font-bold py-2 text-white">
                {volunteerrequest?.length}{" "}
              </h3>
              <h3 className="text-md font-bold text-white">Total Volunteer Request</h3>
            </div>
            <div className="">
              <FontAwesomeIcon
                className="text-[#42424281] text-3xl md:text-4xl"
                icon={faListCheck}
              />
            </div>
          </div>
          <div
            onClick={() => navigate("/cpanel/mvolunteerrequest")}
            className="bg-[#2c2c9c] cursor-pointer py-2 text-center rounded-b-xl"
          >
            <h2 className="text-md text-white">
              More Info{" "}
              <FontAwesomeIcon className="pl-2" icon={faArrowAltCircleRight} />{" "}
            </h2>
          </div>
        </div>

        {/* Total Booking */}
        <div className="">
          <div className="flex items-center justify-between bg-[#ad5530] p-3 rounded-t-xl">
            <div className="">
              <h3 className="text-3xl md:text-4xl font-bold py-2 text-white">
                {bookings?.length}{" "}
              </h3>
              <h3 className="text-md font-bold text-white">Total Bookings</h3>
            </div>
            <div className="">
              <FontAwesomeIcon
                className="text-[#42424281] text-3xl md:text-4xl"
                icon={faBookmark}
              />
            </div>
          </div>
          <div
            onClick={() => navigate("/cpanel/mbookings")}
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

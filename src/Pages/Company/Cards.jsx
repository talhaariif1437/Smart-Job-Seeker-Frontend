import React, { useState, useRef, useEffect } from "react";
import { jobCard } from "../jobseeker/commonTailwindStyles";
import ButtonComponent from "./ButtonComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobCard = ({ job, JobseekerOptions }) => {
  const [selectedjob, setSelectedJob] = useState(null);
  const [isRemote, setIsRemote] = useState(false);
  const navigate = useNavigate();

  const divRef = useRef();
  const [viewActionContainer, setViewActionContainer] = useState(false);
  const currentUserType = JSON.parse(localStorage.getItem("user"))?.userType;

  const incrementViewCount = (jobId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://smartjobseeker-fe218b533e4f.herokuapp.com/api/job/jobViewCount/${jobId}`,
        
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        console.log("View count incremented:", response.data);
      })
      .catch((error) => {
        console.error("Error incrementing view count:", error);
      });
  };

  const handleViewDetails = (job) => {
    incrementViewCount(job._id);
    setSelectedJob(job);
    navigate(`/jobDetails/${job._id}`);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const excludeClassNames = ["exclude-click"];
      if (
        divRef.current &&
        !divRef.current.contains(event.target) &&
        !excludeClassNames.some((className) =>
          event.target.classList.contains(className)
        )
      ) {
        setViewActionContainer(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);

  return (
    <div className="job-card border w-[300px] shadow-md drop-shadow-sm shadow-slate-400 relative flex-row justify-between max-h-min p-3 rounded-xl bg-white mb-5 ">
      <div>
        <div className="flex items-start justify-between text-black ">
          <div className="flex items-center ">
            {job?.logo && (
              <img className="h-20 w-20 rounded-full " src={job?.logo} alt="Company Logo" />
            )}
            <div className="flex flex-col text-left pl-4 text-black ">
              <p className={`text-[14px] font-ligh m-0 title-length text-black`}>
                {job?.mode === "remote" || job?.mode === "Remote"
                  ? job?.mode
                  : `${job?.state}, ${job?.country}`}{" "}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setViewActionContainer(!viewActionContainer);
            }}
            className="me-[-10px] text-black "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>
        </div>
        <p className={`text-left mt-2 mb-0 text-[16px] text-black ${jobCard?.singleTruncate}`}>
          {job?.companyName}
        </p>

        <p className={`font-bold m-0 text-left text-[20px] text-black ${jobCard?.singleTruncate}`}>
          {job?.title}({job?.positions})
        </p>

        <p className="text-left font-bold underline my-1 text-[14px] text-black card-description">
          {job?.industry}
        </p>

        <p className="text-left font-light my-1 text-[14px] text-black card-description">
          {job?.description}
        </p>

        <p className={`text-[14px] font-light text-red-600 m-0 text-left mt-1 ${jobCard?.singleTruncate}`}>
          Last Date: {job?.endDate?.split("T")[0]}
        </p>
      </div>
      <div className="flex flex-row justify-end mt-2">
        <ButtonComponent
          onClick={() => {
            handleViewDetails(job);
          }}
          text="View Details"
        />
      </div>
    </div>
  );
};

const JobList = () => {
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios
      .get("https://smartjobseeker-fe218b533e4f.herokuapp.com/api/job/jobslist", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        // console.log(response)
        setJobs(response.data.result.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  return (
    <div className="job-list flex flex-wrap -mx-1 pl-5 p-5 justify-between bg-gray-200">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} JobseekerOptions={<div>Options here</div>} />
      ))}
    </div>
  );
};

export default JobList;

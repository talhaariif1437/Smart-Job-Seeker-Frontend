

import React, { useState, useRef, useEffect } from "react";
import { jobCard } from "../jobseeker/commonTailwindStyles";
import ButtonComponent from "./ButtonComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InternationalJob = ({ job, JobseekerOptions }) => {
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
        `http://localhost:7000/api/job/jobViewCount/${jobId}`,
        
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
    console.log("asdasdad",job)
    setSelectedJob(job);
    // if (job.mode === "remote" || job.mode === "Remote") {
    //   setIsRemote(true);
    // }
    // if (currentUserType === "jobseekers") {
    //   navigate(`/jobseeker/jobs/${job._id}`, {
    //     state: { job, isRemote },
    //   });
    // } else if (currentUserType === "companies") {
    //   navigate(`/company/jobs/${job._id}`, {
    //     state: { job: job, isRemote: isRemote },
    //   });
    // }
    navigate(`/jobDetails/${job._id}`)
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
    // Adjusted class names for consistent card sizing and layout
      <div className="job-card border w-[300px] shadow-md drop-shadow-sm shadow-slate-400 relative flex-row justify-between max-h-min p-3 rounded-xl text-black mb-5 ">
        {/* {viewActionContainer && (
          <div
            className={`min-w-[170px] absolute right-4 top-8 mt-2 bg-white py-2 shadow-lg shadow-gray-0 rounded `}
            ref={divRef}
          >
            {JobseekerOptions}
          </div>
        )} */
      }
   
        <div>
          <div className="flex items-start justify-between text-black ">
            <div className="flex items-center ">
              {job?.logo && (
                <img className="h-20 w-20 rounded-full " src={job?.logo} alt="Company Logo" />
              )}
              <div className="flex flex-col text-left pl-4 ">
                {/* <p className={`text-[18px] font-medium m-0  ${jobCard?.singleTruncate}`}>
                  {job?.companyName}
                </p> */}
                <p className={`text-[14px] font-light  m-0 title-length`}>
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
              className="me-[-10px] "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </button>
          </div>
          <p className={`text-left mt-2 mb-0 text-[16px]  ${jobCard?.singleTruncate}`}>
            {job?.companyName}
          </p>

          <p className={`font-bold m-0 text-left  text-[20px]  ${jobCard?.singleTruncate}`}>
            {job?.title}({job?.positions})
             
          </p>

          <p className="text-left font-bold underline my-1 text-[14px] card-description">
            {job?.industry}
          </p>

          <p className="text-left font-light my-1 text-[14px] card-description">
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
    // <h1>he</h1>
  );
};



const InterJobList = () => {

  const token= localStorage.getItem("token");

  const [jobs ,setJobs ]=useState([]);  
  useEffect(()=>{
    axios
    .get("http://localhost:7000/api/job/internationalJob"
      ,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }}
    ).then((response) => {
      console.log(response.data)
        setJobs(response?.data?.internationalJobs)
 
      })
      .catch((error) => {
        console.error("Signup error:", error);
        // toast.error(error.response.data.msg)
        
      });
  },[])

  return (
    <>
       <h1  style={{ 
  color: 'darkslategray', 
  fontSize: '28px', 
  fontWeight: 'bold', 
  margin: '0px 0px', 
  textAlign: 'center', 
  backgroundColor: 'lightgray', 
  padding: '10px',
  borderRadius: '8px'
}}>  
        International Jobs</h1>
       <div className="job-list flex flex-wrap -mx-1 pl-5 p-5 justify-between bg-gray-200  " >
      {jobs.map((job) => (
        <InternationalJob key={job._id} job={job} JobseekerOptions={<div>Options here</div>} />
      ))}
    </div>
    </>
    
  );
};

export default InterJobList;

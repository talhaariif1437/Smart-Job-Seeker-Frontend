// JobModal.js
// import { PaperClipIcon } from "@heroicons/react/24/solid";
import { jobDetails } from "../../jobseeker/commonTailwindStyles";
import React, { useState, useEffect } from "react";
import { FaRegBookmark, FaShareAlt } from "react-icons/fa";
import { FaBookmark, FaLocationDot } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const JobDetails = () => {
  const { id } = useParams();
  const [isPressed, setIsPressed] = useState(false);
  const userType = JSON.parse(localStorage.getItem("user"))?.userType;
  const jobseekerId = JSON.parse(localStorage.getItem("jobseekerId"));
  const navigate = useNavigate();
  const location = useLocation();
  const [job,setJob]=useState();
  


  const isRemote = location?.state?.isRemote;
  const skills = JSON.parse(localStorage.getItem("skills"));
  const [formatedFile, setFormatedFile] = useState({});
  const currentUrl = window.location.href;

  const token= localStorage.getItem("token");


  
  
  useEffect(()=>{
    axios
    .get(`http://localhost:7000/api/job/jobItem/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }})
      
      .then((response) => {
        console.log("Jobdetails", response.data);
        setJob(response.data.job)
        
      })
      .catch((error) => {
        console.error("Signup error:", error);
        toast.error(error.response.data.msg)
        
      });
  },[])
  useEffect(() => {
    const item = localStorage.getItem(`pressed${job?._id}`);
    setIsPressed(item === "true");
  }, [location, job?._id]);



  const handlePress = async (id) => {
    setIsPressed(!isPressed);
    localStorage.setItem(`pressed${id}`, true);

    const res = await updateAPI(
      "api/jobseekers/save-job",
      {},
      job._id,
      jobseekerId
    );
    if (res.success) {
      alert("Job saved successfully");
    } else {
      console.error("Error saving job:", res.error);
      alert("Job could not be saved");
    }
  };
  const handleUnsavePress = async (id) => {
    setIsPressed(!isPressed);
    localStorage.setItem(`pressed${id}`, false);

    const res = await updateAPI(
      "api/jobseekers/unsave-job",
      {},
      job._id,
      jobseekerId
    );
    if (res.success) {
      alert("Job saveUnsaved successfully");
    } else {
      console.error("Error saving job:", res.error);
      alert("Job could not be saved");
    }
  };
  
  const handleApply = () => {
    console.log(id)
    axios
    .post(`http://localhost:7000/api/job/applyJob/${id}`,{},{
      headers: {
        
        'Authorization': `Bearer ${token}`
      }})
      
      .then((response) => {
        console.log("Application Response", response.data);
  
        
        toast.success(response.data.message || "Application submitted successfully");
  
        setTimeout(() => {
          navigate('/jobcard');
        }, 2000); 
      })
      .catch((error) => {
        console.error("Error applying for job:", error);
        toast.error(error.response?.data?.message || "An error occurred while applying for the job.");
      });
    
  };

  const handleShare = async () => {};

  const handleDownload = (fileUrl, filename) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = filename;
    link.click();
  };

  return (
    <div className="px-10 py-4 bg-white">
      

      <p className="font-bold text-2xl text-left text-black">Job Details</p>
      <div className="mt-2 flex justify-between items-center text-black ">
        <h1 className="text-xl font-semibold text-left ">{job?.title} </h1>

        <div className="flex justify-end">
          {/* <button
            onClick={handleApply}
            className="bg-blue-600 px-3 py-2 shadow-md rounded-md text-white font-bold max-w-max mt-2 "
          >
          Edit Post Job
          </button> */}
        </div>
 
      </div>
      {/* Second Part */}
      <div className="mt-4 flex justify-between text-black">
        <div className="flex">
          {/* <img className="h-20 w-20 rounded-full" src={job.logo} /> */}
          <div className="flex flex-col justify-center text-black gap-1">
            <div className="flex items-center justify-left text-black  ml-4">
              <p className="m-0 text-sm text-blue-400   text-black ">
                {job?.companyName || "TBD"}
              </p>
                  {job?.country && (
                    <FaLocationDot
                      className="h-3 w-3 mb- mx-1"
                      style={{ fill: "#718096" }}
                    />
                  )}

                  <p className="m-0 text-sm text-gray-500">{`${job?.city}, ${job?.country}`}</p>
                
                
            </div>
            <div className="flex mt-2 ml-4  gap-2">
              <div className={`${jobDetails.divStyle}`}>
                <p className="text-xs text-black m-0">{job?.type}</p>
              </div>
              {/* <div className={`${jobDetails.divStyle}`}>
                      <p className="text-xs m-0">Remote</p>
                    </div> */}
              <div className={`${jobDetails.divStyle}`}>
                <p className="text-xs text-black m-0">
                  {job?.experience} Years
                </p>
              </div>
              <div className={`${jobDetails.divStyle}`}>
                <p className="text-xs text-black m-0"> {job?.positions} positions</p>
              </div>
            </div>
          </div>
          
        </div>
        <div className="flex text-black">
          <p className="p-1 font-bold  text-black text-lg">{job?.salary}</p>
          {/* <p className="p-1 font-bold  text-black text-lg">{job?.salary}</p> */}
        </div>
      </div>

      <p className="border-1 mt-8 mb-4 text-black "></p>
      {/* part 3 */}
      <div className="flex flex-col text-black justify-left ">
        <div className="mb-3">
          <h6 className={`${jobDetails.headingStyle}`}>About this Job</h6>
          <p className="text-sm text-left text-gray-500">{job?.description}</p>
        </div>
        <div className="mb-3">
          <h6 className={`${jobDetails.headingStyle}`}>Requirements</h6>
          <div className="text-sm text-left">
            <li className="text-gray-500">{job?.education}</li>
            <li className="text-gray-500">
              {job?.educationMajor}
            </li>
          </div>
        </div>
        {job?.tasksAndResponsibilities && (
          <div className="mb-3">
            <h6 className={`${jobDetails.headingStyle}`}>
              Job Tasks and Resposibilities
            </h6>
            <div className="text-sm text-left">
              {job.tasksAndResponsibilities.map((task) => (
                <li className="text-gray-500">{task}</li>
              ))}
            </div>
          </div>
        )}
        {job?.skills && (
          <div className="mb-2">
            <h6 className={`${jobDetails.headingStyle}`}>Skills</h6>
            <div className="text-sm text-left">
              <div className="flex my-2.5 gap-2 flex-wrap">
                {job?.skills?.map((skill) => (
                  <div className={`${jobDetails.skillsContainer}`}>
                    <p className={`${jobDetails.skillsText}`}>{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {job?.benefits && (
          <div className="mb-1">
            <h6 className={`${jobDetails.headingStyle}`}>Benefits</h6>
            <div className="flex my-2 gap-2 flex-wrap">
              {job.benefits.map((perk) => (
                <div className={`${jobDetails.skillsContainer}`}>
                  <p className={`${jobDetails.skillsText}`}>{perk}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {job?.document && (
          <div className="mt-2">
            <h6 className={`${jobDetails.headingStyle}`}>Attachment </h6>
            <ul
              role="list"
              className="divide-y divide-gray-100 rounded-md border border-gray-200 mt-2"
            >
              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                <div className="flex w-0 flex-1 items-center">
                  <faPaperclip
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium text-black">
                      {formatedFile.name}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 ">
                  <button
                    onClick={() =>
                      handleDownload(formatedFile.url, formatedFile.name)
                    }
                    className="font-medium text-indigo-600 hover:text-indigo-500 "
                  >
                    Download
                  </button>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* part 4 */}

     
       

     
        <div className="flex justify-end mt-4">
          <button
            onClick={handleApply}
            className="bg-blue-600 px-3 py-2 shadow-md rounded-md text-white font-bold max-w-max mt-2"
          >
            Apply Now
          </button>
        </div>
       
    </div>
    //   </div>
    // </div>
    // )
  );
};

export default JobDetails;


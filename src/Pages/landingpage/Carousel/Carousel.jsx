import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ButtonComponent from "..//..//Company/ButtonComponent";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, JobseekerOptions }) => {
  const navigate = useNavigate();

  const incrementViewCount = (jobId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:7000/api/job/jobViewCount/${jobId}`,
        {},
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
    navigate(`/jobDetails/${job._id}`);
  };

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
        </div>
        <p className={`text-left mt-2 mb-0 text-[16px] text-black`}>
          {job?.companyName}
        </p>
        <p className={`font-bold m-0 text-left text-[20px] text-black`}>
          {job?.title} ({job?.positions})
        </p>
        <p className="text-left font-bold underline my-1 text-[14px] text-black card-description">
          {job?.industry}
        </p>
        {/* <p className="text-left font-light my-1 text-[14px] text-black card-description">
          {job?.description}
        </p> */}
        <p className={`text-[14px] font-light text-red-600 m-0 text-left mt-1`}>
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

const Carousel = () => {
  const token = localStorage.getItem("token");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/job/jobslist", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setJobs(response.data.result.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: "40px",
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px", // Adjust center padding for smaller screens
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0px", // No center padding for smallest screens
        }
      }
    ]
  };

  return (
    <div className="job-list bg-gray-200 p-5">
      <Slider {...settings}>
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} JobseekerOptions={<div>Options here</div>} />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import "./JobSeekerProfilePreview.css";
import axios from "axios";

export default function ApplicantProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://smartjobseeker-fe218b533e4f.herokuapp.com/api/user/ApplicantProfile/${id}`, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log("User data fetched:", response.data);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError('Error fetching user data');
      }
    };

    if (id) {
      fetchUser();
    } else {
      console.error("User ID is missing");
      setError('User ID is missing');
    }
  }, [id]);

  // Debug user state
  useEffect(() => {
    console.log("Current user data after fetch:", user);
  }, [user]);

  // Handle CV download
  const handleDownloadCv = async () => {
    if (!user || !user._id) {
      console.error("User data or User ID is not available");
      return;
    }

    const userId = user._id;
    console.log("User ID is", userId);

    try {
      const response = await axios.get(`https://smartjobseeker-fe218b533e4f.herokuapp.com/api/user/pdfResume/${userId}`, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'blob'
      });

      // Create a blob URL for the PDF and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cv.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download CV error:", error);
    }
  };
  return (
    <div className="profile-container bg-white p-10">
      <div className="profile-header text-black text-xl">
        <div className="py-2 flex flex-wrap relative">
          <img
            src={`https://smartjobseeker-fe218b533e4f.herokuapp.com/${user?.profilePicture}`}
            alt="Profile"
            className="rounded-full w-[120px] h-[120px]"
          />
          <div className="flex flex-col gap-2 mt-4 ms-3">
            <h1 className="font-sans font-bold text-3xl">
              {user?.name}
            </h1>
            <span className="font-sans font-medium text-lg text-gray-500 text-start">
              {user?.headline}
            </span>
          </div>
        </div>
        <div className="flex font-sans flex-wrap justify-center items-center gap-x-12">
          <div>
            <FontAwesomeIcon icon={faPhoneAlt} color="lightGray" flip="horizontal" />
            <span className="font-sans text-md font-semibold text-gray-400 text-left ml-3">
              {user?.phoneNo}
            </span>
          </div>
          <div>
            <FontAwesomeIcon icon={faEnvelope} color="lightGray" flip="horizontal" />
            <span className="font-sans text-md font-semibold text-gray-400 text-left ml-3">
              {user?.email}
            </span>
          </div>
          <div>
            <FontAwesomeIcon icon={faMapMarkerAlt} color="lightGray" />
            <span className="font-sans text-md font-semibold text-gray-400 text-left ml-3">
              {user?.city} {user?.state} {user?.country}
            </span>
          </div>
          <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleDownloadCv}>
            Download CV
          </button>
        </div>
      </div>
      <hr className="mt-6 text-black text-xl" />
      {user?.summary && (
        <div className="text-left py-2 text-black text-xl">
          <h4 className="font-sans font-bold text-start text-gray-400">Summary:</h4>
          <p className="text-start font-sans text-md mt-2">{user?.summary}</p>
        </div>
      )}
      {user?.gender && (
        <div className="text-left py-2 text-black text-xl">
          <h4 className="font-sans font-bold text-start text-gray-400">Gender:</h4>
          <p className="text-start font-sans text-md mt-2">{user?.gender}</p>
        </div>
      )}
      {user?.dob && (
        <div className="text-left py-2 text-black text-xl">
          <h4 className="font-sans font-bold text-start text-gray-400">Date of Birth:</h4>
          <p className="text-start font-sans text-md mt-2">{user?.dob}</p>
        </div>
      )}
      {user?.currentJob && (
        <div className="text-left py-2 text-black text-xl">
          <h4 className="font-sans font-bold text-start text-gray-400">Current Job:</h4>
          <p className="text-start font-sans text-md mt-2">{user?.currentJob}</p>
        </div>
      )}
      {user?.experience && (
        <div className="text-left py-2 text-black text-xl">
          <h4 className="font-sans font-bold text-start text-gray-400">Experience:</h4>
          <p className="text-start font-sans text-md mt-2">{user?.experience}</p>
        </div>
      )}
      {user?.education?.length > 0 && (
        <div className="text-left py-2 text-black text-xl">
          <h4 className="font-sans font-bold text-gray-400">Education:</h4>
          {user?.education?.map((elem, index) => (
            <h5 key={index} className="font-sans text-md mt-2">{elem}</h5>
          ))}
        </div>
      )}
      {user?.certification?.length > 0 && (
        <div className="text-left py-2 text-black text-xl">
          <h4 className="text-gray-400 font-sans font-bold">Certifications:</h4>
          {user?.certification?.map((elem, index) => (
            <div key={index} className="flex gap-2 text-black">
              <h5 className="font-sans text-md mt-2">{elem?.title}</h5>
              <p className="font-sans text-md mt-2">{elem?.organization}</p>
              <h5 className="font-sans text-md mt-2">{elem.link}</h5>
            </div>
          ))}
        </div>
      )}
      {user?.hobby && (
        <div className="text-left py-3 text-black text-xl">
          <h4 className="font-sans font-bold text-gray-400">Hobbies:</h4>
          <p className="font-sans text-md mt-2">{user?.hobby}</p>
        </div>
      )}
      {user?.projects?.length > 0 && (
        <div className="text-left py-2 text-black text-xl">
          <h4 className="font-sans font-bold text-gray-400">Projects:</h4>
          {user?.projects?.map((elem, index) => (
            <h5 key={index} className="font-sans text-md mt-2">{elem}</h5>
          ))}
        </div>
      )}
    </div>
  );
}

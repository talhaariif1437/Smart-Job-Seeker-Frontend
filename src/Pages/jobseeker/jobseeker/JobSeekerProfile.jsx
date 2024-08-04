import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import "./JobSeekerProfilePreview.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
// import BackButton from "../../components/common/BackButton";
import person from "../../jobseeker/components/WhatsApp Image 2024-04-30 at 06.01.58_0057abe7.jpg";
import ResponsiveAppBar from "../../../Components/mainNavbar/mainNavbar";

export default function JobSeekerProfile() {
  const userType = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  console.log({ userType });

  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const item = localStorage.getItem(`pressed${userType?._id}`);
    setIsPressed(item === "true");
  }, [location, userType?._id]);

  const handleDownloadCv = () => {
    const userId = userType?._id;
    console.log("User id is",userId);
    axios
      .get(`https://smartjobseeker-fe218b533e4f.herokuapp.com/api/user/pdfResume/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
     
  };

  
  return (
    <>
      <ResponsiveAppBar />
      <div className="profile-container bg-white  p-10">
        <div className="profile-header text-black text-xl">
          <div className="py-2 flex flex-wrap relative">
              {console.log({"profile":userType.profilePicture})}
              <img
                src={`https://smartjobseeker-fe218b533e4f.herokuapp.com/${userType?.profilePicture}`}
                alt="hammad"
                className="rounded-full w-[120px] h-[120px]"
              />
            
            <div className="flex flex-col gap-2 mt-4 ms-3">
              <h1 className="font-sans font-bold  text-3xl">
                {userType?.name} {/* {data?.personalInformation?.lastName} */}
              </h1>

              <span className="font-sans font-medium text-lg text-gray-500 text-start">
                {userType?.headline}
              </span>

              
            </div>
          </div>
          <div className="flex  font-sans flex-wrap justify-center items-center gap-x-12">
            <div>
              <FontAwesomeIcon
                icon={faPhoneAlt}
                color="lightGray"
                flip="horizontal"
              />
              <span className="font-sans text-md font-semibold text-black-400 text-left ml-3">
                {userType?.phoneNo}
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faEnvelope}
                color="lightGray"
                flip="horizontal"
              />
              <span className="font-sans text-md font-semibold text-black-400 text-left ml-3">
                {userType?.email}
              </span>
            </div>

            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} color="lightGray" />
              <span className="font-sans text-md font-semibold text-black-400 text-left ml-3">
                {userType?.city} {userType?.state} {userType?.country}
              </span>
             
            </div>
            <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-white ">
                <a href="/JobSeekerForm "> Edit Profile</a>
              </button>
              <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  "
                 onClick={handleDownloadCv}>
                  Download CV
              </button>
          </div>
        </div>
        <hr className="mt-6 text-black text-xl" />
        {userType?.summary && (
          <div className="text-left py-2 text-black text-xl">
            <h4 className=" font-sans font-bold text-start text-black-400">
              Summary:
            </h4>
            <p className=" text-start font-sans  text-md mt-2  ">
              {userType?.summary}
            </p>
          </div>
        )}
        {userType?.address && (
          <div className="text-left py-2 text-black text-xl">
            <h4 className=" font-sans font-bold text-start text-black-400">
              Address:
            </h4>
            <p className=" text-start font-sans  text-md mt-2  ">
              {userType?.address} {userType?.city} {userType?.state} {userType?.country}
            </p>
          </div>
        )}

        {userType?.gender && (
          <div className="text-left py-2 text-black text-xl">
            <h4 className=" font-sans font-bold text-start text-black-400">
              Gender:
            </h4>
            <p className=" text-start font-sans  text-md mt-2  ">
              {userType?.gender}
            </p>
          </div>
        )}

        {userType?.dob && (
          <div className="text-left py-2 text-black text-xl">
            <h4 className=" font-sans font-bold text-start text-black-400">
              Date of Birth:
            </h4>
            <p className=" text-start font-sans  text-md mt-2  ">
              {userType?.dob}
            </p>
          </div>
        )}

        {userType?.currentJob && (
          <div className="text-left py-2 text-black text-xl">
            <h4 className=" font-sans font-bold text-start text-black-400">
              Current Job:
            </h4>
            <p className=" text-start font-sans  text-md mt-2  ">
              {userType?.currentJob}
            </p>
          </div>
        )}

        {userType?.experience && (
          <div className="text-left py-2 text-black text-xl">
            <h4 className=" font-sans font-bold text-start text-black-400">
              Experience:
            </h4>
            <p className=" text-start font-sans  text-md mt-2 text-[20px]  ">
              {userType?.experience}
            </p>
          </div>
        )}
        {userType?.education?.length > 0 && (
          <div className="text-left py-2 text-black text-xl ">
            <h4 className="font-sans font-bold text-black-400 ">Education:</h4>
            {userType?.education?.map((elem) => {
              return (
                <>
                  <p className="font-sans text-md mt-2  ">
                    {" "}
                    {elem}
                    {/* {elem?.fieldOfStudy} | {elem?.institution} */}
                  </p>
                  {/* <p className="font-sans text-md mt-2">{elem?.description}</p> */}
                </>
              );
            })}
          </div>
        )}

        {userType?.certification?.length > 0 && (
          <div className="text-left py-2  text-black  text-xl">
            <h4 className=" text-black-400 font-sans font-bold">
              Professional Experience:
            </h4>
            {userType?.employementHistories?.map((elem) => {
              return (
                <>
                  <h5 className=" font-sans text-md mt-2  ">
                    {elem?.title} | {elem?.employer} {elem?.city}{" "}
                    {elem?.country}
                  </h5>

                  <p className=" font-sans text-md mt-2 ">
                    {elem?.description}
                  </p>
                </>
              );
            })}
          </div>
        )}

        {userType?.skills && (
          <div className=" text-left text-black py-2 text-xl">
            <h4 className="text-black-400 font-sans font-bold">Skills:</h4>
            <div className="flex flex-wrap mt-3 gap-3">
              {typeof userType?.skills === "string" ? (
                <Button className="rounded-md p-1 cursor-pointer hover:bg-yellow-400 border-yellow-400 hover:border-yellow-400 text-gray-600 font-sans">
                  {data.skills}
                </Button>
              ) : (
                userType?.skills?.map((elem, index) => (
                  <Button
                    key={index}
                    className="rounded-md p-1 cursor-pointer hover:bg-yellow-400 border-yellow-400 hover:border-yellow-400 text-gray-600 text-[13px]"
                  >
                    {elem}
                  </Button>
                ))
                
              )}
            </div>
          </div>
        )}

        {userType?.projects?.length > 0 && (
          <div className="text-left py-2 text-black text-xl ">
            <h4 className="font-sans font-bold text-black-400 ">Projects:</h4>
            {userType?.projects?.map((elem) => {
              return (
                <>
                  <h5 className="font-sans text-md mt-2 ">
                    {" "}
                    {elem}
                    {/* {elem?.fieldOfStudy} | {elem?.institution} */}
                  </h5>
                  {/* <p className="font-sans text-md mt-2">{elem?.description}</p> */}
                </>
              );
            })}
          </div>
        )}

        {/* {userType?.projects && (
          <div className=" text-left text-black py-2 text-xl">
            <h4 className="text-black-400 font-sans font-bold">Skills:</h4>
            <div className="flex flex-wrap mt-3 gap-3">
              {typeof userType?.projects === "string" ? (
                <Button className="rounded-md p-1 cursor-pointer hover:bg-yellow-400 border-yellow-400 hover:border-yellow-400 text-gray-600 font-sans">
                  {data.projects}
                </Button>
              ) : (
                userType?.projects?.map((elem, index) => (
                  <Button
                    key={index}
                    className="rounded-md p-1 cursor-pointer hover:bg-yellow-400 border-yellow-400 hover:border-yellow-400 text-gray-600"
                  >
                    {elem}
                  </Button>
                ))
              )}
            </div>
          </div>
        )} */}

        {/* {userType?.projects?.length > 0 && (
          <div className="text-left py-3 text-black text-xl">
            <h4 className=" font-sans font-bold text-black-400">Projects:</h4>
            {userType?.projects?.map((elem) => {
              return (
                <>
                  <h5 className="font-sans text-md mt-2">
                    {elem?.name} | {elem?.organization}
                  </h5>
                  <p className="font-sans text-md mt-2">{elem?.link}</p>
                  <p className="font-sans text-md mt-2">{elem?.description}</p>
                </>
              );
            })}
          </div>
        )} */}

{userType?.hobby && (
          <div className=" text-left text-black py-2 text-xl">
            <h4 className="text-black-400 font-sans font-bold">Hobbies:</h4>
            <div className="flex flex-wrap mt-3 gap-3">
              {typeof userType?.hobby === "string" ? (
                <Button className="rounded-md p-1 cursor-pointer hover:bg-yellow-400 border-yellow-400 hover:border-yellow-400 text-gray-600 font-sans">
                  {data.hobby}
                </Button>
              ) : (
                userType?.hobby?.map((elem, index) => (
                  <Button
                    key={index}
                    className="rounded-md p-1 cursor-pointer hover:bg-yellow-400 border-yellow-400 hover:border-yellow-400 text-gray-600 text-[13px]"
                  >
                    {elem}
                  </Button>
                ))
              )}
            </div>
          </div>
        )}


                {/* {userType?.hobby && (
                  <div className="text-left py-3 text-black text-xl">
                    <h4 className="font-sans font-bold text-black-400">Hobbies:</h4>
                    <p className="font-sans text-md mt-2">{userType?.hobby}</p>
                  </div>
                )} */}
        {userType?.certification?.length > 0 && (
          <div className=" text-left py-3 text-black text-xl ">
            <h4 className="  text-black-400 font-sans font-bold">
              Certifications:
            </h4>
            {userType?.certification?.map((elem) => {
              return (
                <div className="flex gap-2 text-black">
                  <h5 className=" font-sans text-md mt-2 ">{elem?.title}</h5>
                  <p className=" font-sans text-md mt-2">
                    {elem?.organization}
                  </p>
                  <h5 className=" font-sans text-md mt-2 ">{elem.link}</h5>
                </div>
              );
            })}
          </div>
        )}
        {userType?.timeExchangeDescription
 && (
          <div className="text-left py-2 text-black text-xl">
            <h4 className=" font-sans font-bold text-start text-black-400">
              Time Exchange:
            </h4>
            <p className=" text-start font-sans  text-md mt-2  ">
              {userType?.timeExchangeDescription
              } - {userType?.availableFrom}  -To-  {userType?.availableFrom} 
            </p>
          </div>
        )}
        <div className="profile-content">
        
        
        </div>
      </div>
    </>
  );
}

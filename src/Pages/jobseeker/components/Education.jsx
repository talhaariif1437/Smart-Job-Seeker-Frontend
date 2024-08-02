// EducationDetails.jsx
import { useState } from "react";
import InputField from "./InputField";
import ParagraphInput from "./ParagraphInput";
import { resumeStyles } from "../commonTailwindStyles";
import { useStepperContext } from "../../../contexts/StepperContext";
import ArrowDownIcon from "./ArrowDownIcon";
import { dateFormatting } from "./dateFormatting";
import ArrowUpIcon from "./ArrowUpIcon";
import DeleteIcon from "./DeleteIcon";
import {  FaMicrophone } from "react-icons/fa";

export default function EducationDetails({
  index,
  data,
  educationDataHandling,
  handlingEducationDelete,
}) {
  const { jobSeekerData, setJobSeekerData, jobseekerDataErrors, setJobseekerDataErrors } =
    useStepperContext();
  const [showEducationDetails, setShowEducationDetails] = useState(true);

  const handleChange = (field, value) => {
    educationDataHandling(index, { [field]: value });
  };



  const handleMicrophoneClick = () => {
    // Logic for microphone button click
    console.log("Microphone clicked");
  };

  const handleEndDateChange = (e) => {
    const endDate = e.target.value;
    handleChange("endDate", endDate);

    if (data.startDate && endDate < data.startDate) {
      setJobseekerDataErrors((prevErrors) => ({
        ...prevErrors,
        education: {
          ...prevErrors.education,
          endDate: "End date cannot be before the start date.",
        },
      }));
      handleChange("endDate", "");
    }else{
      handleChange("endDate", endDate);

    }
  };

  return (
    <div
      className={` my-3 relative mt-3 border-1 rounded-md  grid grid-cols-1  gap-x-6 gap-y-4 sm:grid-cols-6 ${
        showEducationDetails ? "px-2.5" : ""
      }`}
    >
      <div
        className={`flex p-2.5 pe-2 sm:col-span-full ${
          showEducationDetails ? "px-0" : ""
        }`}
      >
        <div
          onClick={() => {
            setShowEducationDetails(!showEducationDetails);
          }}
          className={`pe-1 hover:cursor-pointer me-1.5 border-r flex w-full align-items-center justify-content-between ${
            showEducationDetails ? "pe-0" : ""
          }`}
        >
          <div className="justify-content-center">
            <h5 className="text-start fw-bold m-0 text-[16px]">
              {data.degree}
              {data.institution && data.degree ? " at " : ""}
              {data.institution ? data.institution : ""}
              {!data.degree && !data.institution ? "Not Specified" : ""}
            </h5>
            <p className="text-[13px] m-0 mt-2 text-start">
              {data.startDate ? dateFormatting(data.endDate) : ""}{" "}
              {data.startDate && data.endDate ? " - " : ""}
              {data.endDate ? dateFormatting(data.endDate) : ""}
            </p>
          </div>
          {!showEducationDetails ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </div>
        <div
          className={`flex items-center ${
            showEducationDetails ? "me-[-10px]" : ""
          }`}
        >
          <button onClick={() => handlingEducationDelete(index)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      {showEducationDetails ? (
        <>
          <div className="sm:col-span-3">
            <InputField
              htmlFor="institution"
              labelText="Institution"
              placeholder="e.g. Comsats University Lahore"
              id="institution"
              handleChange={(e) => handleChange("institution", e.target.value)}
              value={data.institution}
              // handleChange={handleChange}
              // value={jobSeekerData["school"]}
              required
              error={jobseekerDataErrors.institution}
            />
            <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
          </div>
          <div className="sm:col-span-3">
            <InputField
              htmlFor="degree"
              labelText="Degree"
              placeholder="e.g. Bachelor in Computer Science"
              id="degree"
              // handleChange={handleChange}
              // value={jobSeekerData["education"]}
              required
              error={jobseekerDataErrors.degree}
              handleChange={(e) => handleChange("degree", e.target.value)}
              value={data.degree}
            />
            <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="startDate"
              className="block text-start text-sm font-medium leading-6 text-gray-900"
            >
              Start Date<span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="date"
                id="startDate"
                onChange={(e) => {
                  handleChange("startDate", e.target.value);
                }}
                value={data.startDate}
                className="block w-full h-[40px] px-2 rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                placeholder="Pick a date"
              />
              <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="endDate"
              className="block text-start text-sm font-medium leading-6 text-gray-900"
            >
              End Date<span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="date"
                id="endDate"
                onChange={handleEndDateChange}
                value={data.endDate}
                className="block w-full h-[40px] px-2 rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                placeholder="Pick a date"
              />
              <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
            </div>
          </div>
          <div className="sm:col-span-3">
            <InputField
              htmlFor="grade"
              labelText="CGPA/Obtained Marks"
              placeholder="e.g. 3.5"
              id="grade"
              // handleChange={handleChange}
              // value={jobSeekerData["grade"]}
              handleChange={(e) => handleChange("grade", e.target.value)}
              value={data.grade}
              required
              error={jobseekerDataErrors.grade}
            />
            <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="subject"
              className="block text-start  text-sm font-medium leading-6 text-gray-900"
            >
              <span className="text-red-500">*</span> Choose Field of Study
            </label>
            <div className="mt-1">
              <select
                id="fieldOfStudy"
                name="fieldOfStudy"
                onChange={(e) => handleChange("fieldOfStudy", e.target.value)}
                value={data.subject}
                autoComplete="fieldOfStudy"
                className="block w-full h-[40px] rounded-md border-0 py-1.5 px-2 text-gray-900 border-2 outline-none ring-[1.5px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1.5px] focus:ring-inset focus:ring-blue-500 sm:text-md sm:leading-6"
              >
                <option value="" disabled hidden>
                  Select subject level
                </option>
                <option>Mathematics</option>
                <option>English Language</option>
                <option>Science</option>
                <option>Social Studies</option>
                <option>History</option>
                <option>Geography</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Biology</option>
                <option>Computer Science</option>
                <option>Physical Education</option>
                <option>Art</option>
                <option>Music</option>
                <option>Literature</option>
                <option>Foreign Language (e.g., Spanish, French)</option>
                <option>Economics</option>
                <option>Business Studies</option>
                <option>Accounting</option>
                <option>Psychology</option>
                <option>Sociology</option>
                <option>Political Science</option>
                <option>Philosophy</option>
                <option>Religious Studies</option>
                <option>Physical Education</option>
                <option>Health Education</option>
                <option>Environmental Science</option>
                <option>Astronomy</option>
                <option>Statistics</option>
                <option>Engineering</option>
                <option>Medicine</option>
                <option>Law</option>
                <option>Architecture</option>
                <option>Communication Studies</option>
                <option>Media Studies</option>
                <option>Information Technology</option>
                <option>Design</option>
                <option>Agriculture</option>
                <option>Food Technology</option>
                <option>Home Economics</option>
                <option>Drama</option>
                <option>Dance</option>
                <option>Public Speaking</option>
                <option>Critical Thinking</option>
                <option>Ethics</option>
                <option>Civics</option>
                <option>World Cultures</option>
                <option>Foreign Affairs</option>
                <option>Criminal Justice</option>
                <option>Astrophysics</option>
                <option>Robotics</option>
                <option>Creative Writing</option>
                <option>Journalism</option>
                <option>Anthropology</option>
                <option>Archaeology</option>
                <option>Meteorology</option>
                <option>Culinary Arts</option>
                <option>Fashion Design</option>
                <option>Graphic Design</option>
                <option>Web Development</option>
                <option>Animation</option>
                <option>Film Studies</option>
                <option>Gender Studies</option>
                <option>Global Studies</option>
                {/* Add other subjects as needed */}
              </select>
            </div>
            {jobseekerDataErrors.subject ? (
              <p className="text-start job-error text-danger">
                {jobseekerDataErrors.subject}
              </p>
            ) : null}
            <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
          </div>
          <div className="sm:col-span-3">
            <InputField
              htmlFor="country"
              labelText="Country"
              placeholder="e.g. Pakistan"
              id="country"
              handleChange={(e) => handleChange("country", e.target.value)}
              value={data.country}
              // handleChange={handleChange}
              // value={jobSeekerData["EduCountry"]}
            />
            <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
          </div>
          <div className="sm:col-span-3">
            <InputField
              htmlFor="city"
              labelText="City"
              placeholder="e.g. Lahore"
              id="city"
              handleChange={(e) => handleChange("city", e.target.value)}
              value={data.city}
              // handleChange={handleChange}
              //     value={jobSeekerData["EduCity"]}
            />
            <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
          </div>
          <div className="sm:col-span-full p-0 ">
            <label htmlFor="description" className={resumeStyles.label1}>
              Description
            </label>
            <div className=" ">
              <ParagraphInput
                bottomText={""}
                id={"description"}
                placeholder={
                  "e.g. Currently doing bachelor in computer science"
                }
                value={data.description}
                handleTextChange={(e) => {
                  handleChange("description", e.target.value);
                }}
                maxLength={300}
                heading={""}
              />
              <button
                type="button"
                className="microphone-button12  right-12 top-6"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

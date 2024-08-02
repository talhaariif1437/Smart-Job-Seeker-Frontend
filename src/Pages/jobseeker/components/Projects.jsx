import InputField from "./InputField";
import { useState } from "react";
import { dateFormatting } from "./dateFormatting";
import ArrowDownIcon from "./ArrowDownIcon";
import ArrowUpIcon from "./ArrowUpIcon";
import { resumeStyles } from "../commonTailwindStyles";
import DeleteIcon from "./DeleteIcon";
import ParagraphInput from "./ParagraphInput";
import { useStepperContext } from "../../../contexts/StepperContext";
import { FaMicrophone } from "react-icons/fa";


export default function Project({
  handlingProjectData,
  index,
  project,
  handlingProjectDelete,
}) {
  const [showProjectData, setShowProjectData] = useState(true);
  const { jobSeekerData, setJobSeekerData, jobseekerDataErrors, setJobseekerDataErrors} =    useStepperContext();


  const handleChange = (field, value) => {
    handlingProjectData(index, { [field]: value });
  };

  const handleEndDateChange = (e) => {
    const endDate = e.target.value;
    handleChange("endDate", endDate);

    if (project.startDate && endDate < project.startDate) {
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


  const handleMicrophoneClick = () => {
    // Logic for microphone button click
    console.log("Microphone clicked");
  };

  return (
    <div
      className={` my-3 relative mt-3 border-1 rounded-md  grid grid-cols-1  gap-x-6 gap-y-4 sm:grid-cols-6 ${
        showProjectData ? "px-2.5" : " "
      }`}
    >
      <div
        className={`flex p-2.5 pe-2 sm:col-span-full ${
          showProjectData ? "px-0" : ""
        }`}
      >
        <div
          onClick={() => {
            setShowProjectData(!showProjectData);
          }}
          className={`pe-1 hover:cursor-pointer me-1.5 border-r flex w-full align-items-center justify-content-between ${
            showProjectData? "pe-0" : ""
          }`}
        >
          <div className="">
            <h5 className="text-start fw-bold m-0 text-[16px]">
              {project.name}
              {!project.name ? "Not Specified" : ""}
            </h5>
            <p className="text-[13px] m-0 mt-2 text-start">
              {project.startDate ? dateFormatting(project.startDate) : ""}
              {project.startDate && project.endDate ? " - " : ""}
              {project.endDate ? dateFormatting(project.endDate) : ""}
            </p>
          </div>
          {!showProjectData ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </div>
        <div
          className={`flex items-center ${showProjectData ? "me-[-10px]" : ""}`}
        >
          <button onClick={() => handlingProjectDelete(index)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      {showProjectData ? (
        <>
          <div className="sm:col-span-3">
            <InputField
              htmlFor="name"
              labelText="Name"
              placeholder="e.g. Advanced React"
              id="name"
              handleChange={(e) => {
                handleChange("name", e.target.value);
              }}
              value={project.name}
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
              htmlFor="organization"
              labelText="Organization"
              placeholder="e.g. freecodecamp"
              id="organization"
              handleChange={(e) => {
                handleChange("organization", e.target.value);
              }}
              value={project.organization}
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
            <div className="sm:col-span-full">
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
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  value={project.startDate}
                  className="block w-full h-[40px] px-2 rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  placeholder="Pick a date"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-3">
            <div className="sm:col-span-full">
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
                  value={project.endDate}
                  className="block w-full h-[40px] px-2 rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  placeholder="Pick a date"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-full">
            <InputField
              htmlFor="link"
              labelText="Link"
              placeholder="e.g. www.vercel.app.blogs-app.com"
              id="link"
              handleChange={(e) => {
                handleChange("link", e.target.value);
              }}
              value={project.link}
            />
            <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
          </div>
          <div className="sm:col-span-full p-0">
            <label htmlFor="city" className={resumeStyles.label1}>
              Description
            </label>
            <div className="">
              <ParagraphInput
                bottomText={
                  "Recruiter tip: write 200+ characters to increase interview chances"
                }
                value={project.description}
                id={"experienceDescription"}
                placeholder={
                  "e.g. Experience developer with 5+ years of experience in react."
                }
                handleTextChange={(e) =>
                  handleChange("description", e.target.value)
                }
                maxLength={300}
                heading={""}
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
        </>
      ) : null}
    </div>
  );
}

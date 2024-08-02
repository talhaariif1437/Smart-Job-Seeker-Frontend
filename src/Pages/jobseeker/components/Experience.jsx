import ParagraphInput from "./ParagraphInput";
import { resumeStyles } from "../commonTailwindStyles";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import { dateFormatting } from "./dateFormatting";
import ArrowDownIcon from "./ArrowDownIcon";
import ArrowUpIcon from "./ArrowUpIcon";
import DeleteIcon from "./DeleteIcon";
import { useStepperContext } from "../../../contexts/StepperContext";
import { FaMicrophone } from "react-icons/fa";

export default function EmployementHistory({
  employmentHistoryDataHandling,
  handleEmployementDelete,
  index,
  data,
}) {
  const [showEmployementHistory, setShowEmployementHistory] = useState(true);
  const { jobSeekerData, setJobSeekerData, jobseekerDataErrors, setJobseekerDataErrors} =
    useStepperContext();
  const handleChange = (field, value) => {
    employmentHistoryDataHandling(index, { [field]: value });
  };





  const handleEndDateChange = (e) => {
    const endDate = e.target.value;
    handleChange("endDate", endDate);

    if (data.startDate && endDate < data.startDate) {
      setJobseekerDataErrors((prevErrors) => ({
        ...prevErrors,
        employmentHistory: {
          ...prevErrors.employmentHistory,
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
        showEmployementHistory ? "px-2.5" : " "
      }`}
    >
      <div
        className={`flex p-2.5 pe-2 sm:col-span-full ${
          showEmployementHistory ? "px-0" : ""
        }`}
      >
        <div
          onClick={() => {
            setShowEmployementHistory(!showEmployementHistory);
          }}
          className={`pe-1 hover:cursor-pointer me-1.5 border-r flex w-full align-items-center justify-content-between ${
            showEmployementHistory ? "pe-0" : ""
          }`}
        >
          <div className="">
            <h5 className="text-start fw-bold m-0 text-[16px]">
              {data.title}
              {data.employer && data.title ? " at " : ""}
              {data.employer ? data.employer : ""}
              {!data.title && !data.employer ? "Not Specified" : ""}
            </h5>
            <p className="text-[13px] m-0 mt-2 text-start">
              {data.startDate ? dateFormatting(data.startDate) : ""}{" "}
              {data.startDate && data.endDate ? " - " : ""}
              {data.endDate ? dateFormatting(data.endDate) : ""}
            </p>
          </div>
          {!showEmployementHistory ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </div>
        <div
          className={`flex items-center ${
            showEmployementHistory ? "me-[-10px]" : ""
          }`}
        >
          <button onClick={() => handleEmployementDelete(index)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      {showEmployementHistory ? (
        <>
          <div className="sm:col-span-3">
            <InputField
              htmlFor="title"
              labelText="Job Title"
              placeholder="e.g. Software Developer"
              id="title"
              handleChange={(e) => handleChange("title", e.target.value)}
              value={data.title}
              required
              error={jobseekerDataErrors.job}
            />
            <button
                type="button"
                className="microphone-button12  right-12 top-6"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
          </div>
          <div className="sm:col-span-3">
            <InputField
              htmlFor="employer"
              labelText="Employer"
              placeholder="e.g. TalentHunt"
              id="employer"
              handleChange={(e) => handleChange("employer", e.target.value)}
              value={data.employer}
              required
              error={jobseekerDataErrors.employer}
            />
            <button
                type="button"
                className="microphone-button12  right-12 top-6"
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
                  onChange={(e) => {
                    handleChange("startDate", e.target.value);
                  }}
                  value={data.startDate}
                  className="block w-full h-[40px] px-2 rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  placeholder="Pick a date"
                />
                <button
                type="button"
                className="microphone-button12  right-12 top-6"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button><button
                type="button"
                className="microphone-button12  right-12 top-6"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
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
                  value={data.endDate}
                  className="block w-full h-[40px] px-2 rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  placeholder="Pick a date"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-3">
            <InputField
              htmlFor="country"
              labelText="Country"
              placeholder="e.g. Pakistan"
              id="country"
              handleChange={(e) => handleChange("country", e.target.value)}
              value={data.country}
            />
            <button
                type="button"
                className="microphone-button12  right-12 top-6"
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
            />
            <button
                type="button"
                className="microphone-button12  right-12 top-6"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
          </div>

          <div className="sm:col-span-full p-0">
            <label htmlFor="city" style={{marginBottom:'50px'}} className={resumeStyles.label1}>
              Description
            </label>
            <div className="mt-[-43px]">
              <ParagraphInput
                bottomText={
                  "Recruiter tip: write 200+ characters to increase interview chances"
                }
                value={data.description}
                id={"description"}
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

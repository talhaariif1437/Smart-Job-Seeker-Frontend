import InputField from "./InputField";
import { useState } from "react";
import { dateFormatting } from "./dateFormatting";
import ArrowDownIcon from "./ArrowDownIcon";
import ArrowUpIcon from "./ArrowUpIcon";
import DeleteIcon from "./DeleteIcon";
import { useStepperContext } from "../../../contexts/StepperContext";
import { FaMicrophone } from "react-icons/fa";


export default function Certification({
  handlingCertificationData,
  index,
  data,
  handlingCertificationDelete,
}) {
  const [showCertificationData, setShowCertificationData] = useState(true);
  const { jobSeekerData, setJobSeekerData, jobseekerDataErrors , setJobseekerDataErrors} =
    useStepperContext();
  const handleChange = (field, value) => {
    handlingCertificationData(index, { [field]: value });
  };

  const handleMicrophoneClick = () => {
    // Logic for microphone button click
    console.log("Microphone clicked");
  };

  const handleEndDateChange = (e) => {
    const endDate = e.target.value;
    handleChange("expirationDate", endDate);

    if (data.issueDate && endDate < data.issueDate) {
      setJobseekerDataErrors((prevErrors) => ({
        ...prevErrors,
        certifications: {
          ...prevErrors.certifications,
          expirationDate: "Expiration date cannot be before the issue date.",
        },
      }));
      handleChange("expirationDate", "");
    }else{
      handleChange("expirationDate", endDate);

    }
  };


  return (
    <div
      className={` my-3 relative mt-3 border-1 rounded-md  grid grid-cols-1  gap-x-6 gap-y-4 sm:grid-cols-6 ${
        showCertificationData ? "px-2.5" : " "
      }`}
    >
      <div
        className={`flex p-2.5 pe-2 sm:col-span-full ${
          showCertificationData ? "px-0" : ""
        }`}
      >
        <div
          onClick={() => {
            setShowCertificationData(!showCertificationData);
          }}
          className={`pe-1 hover:cursor-pointer me-1.5 border-r flex w-full align-items-center justify-content-between ${
            showCertificationData ? "pe-0" : ""
          }`}
        >
          <div className="">
            <h5 className="text-start fw-bold m-0 text-[16px]">
              {data.title}
              {data.title && data.organization ? " at " : ""}
              {data.organization ? data.organization : ""}
              {!data.title && !data.organization ? "Not Specified" : ""}
            </h5>
            <p className="text-[13px] m-0 mt-2 text-start">
              {data.issueDate ? dateFormatting(data.issueDate) : ""}
              {data.issueDate && data.expirationDate ? " - " : ""}
              {data.expirationDate ? dateFormatting(data.expirationDate) : ""}
            </p>
          </div>
          {!showCertificationData ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </div>
        <div
          className={`flex items-center ${
            showCertificationData ? "me-[-10px]" : ""
          }`}
        >
          <button onClick={() => handlingCertificationDelete(index)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      {showCertificationData ? (
        <>
          <div className="sm:col-span-3">
            <InputField
              htmlFor="title"
              labelText="Title"
              placeholder="e.g. Advanced React"
              id="title"
              handleChange={(e) => {
                handleChange("title", e.target.value);
              }}
              value={data.title}
              required
              error={jobseekerDataErrors.title}
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
              htmlFor="organization"
              labelText="Organization"
              placeholder="e.g. freecodecamp"
              id="organization"
              handleChange={(e) => {
                handleChange("organization", e.target.value);
              }}
              value={data.organization}
              required
              error={jobseekerDataErrors.organization}
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
                htmlFor="issueDate"
                className="block text-start text-sm font-medium leading-6 text-gray-900"
              >
                Issue Date<span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  id="issueDate"
                  onChange={(e) => handleChange("issueDate", e.target.value)}
                  value={data.issueDate}
                  className="block w-full h-[40px] px-2 rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  placeholder="Pick a date"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-3">
            <div className="sm:col-span-full">
              <label
                htmlFor="expirationDate"
                className="block text-start text-sm font-medium leading-6 text-gray-900"
              >
                Expiration Date<span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  id="expirationDate"
                  onChange={handleEndDateChange}
                  value={data.expirationDate}
                  className="block w-full h-[40px] px-2 rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  placeholder="Pick a date"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-full mb-3">
            <InputField
              htmlFor="link"
              labelText="Credential URL"
              placeholder="e.g. www.freecodecamp.com/22jow2/advanced-react"
              id="link"
              handleChange={(e) => {
                handleChange("link", e.target.value);
              }}
              value={data.link}
            />
             <button
                type="button"
                className="microphone-button12  right-12 top-6"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

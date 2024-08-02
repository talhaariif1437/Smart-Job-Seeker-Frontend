import React from "react";
import DeleteIcon from "../components/DeleteIcon";
import { useStepperContext } from "../../../contexts/StepperContext";
import { FaMicrophone } from "react-icons/fa";

export default function Hobbies()
{
  const { jobSeekerData, setJobSeekerData, jobseekerDataErrors } =
    useStepperContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobSeekerData({ ...jobSeekerData, [name]: value });
  };

  const handleMicrophoneClick = () => {
    // Logic for microphone button click
    console.log("Microphone clicked");
  };

  return (
    <div className="ml-5">
      <div className="flex m-0 items-center mb-3">
        <h1 className="fs-4 text-start m-0 fw-bold">Hobbies</h1>
        <button
          className="flex ms-2"
          onClick={() => {
            setJobSeekerData((data) => ({
              ...data,
              hobbies: { ...data.hobbies, display: false },
            }));
            setSelectedItems({
              ...selectedItems,
              hobbies: false,
            });
          }}
        >
          <DeleteIcon />
        </button>
      </div>
      <p className={"mb-4 mt-[-12px] text-gray-800 text-start text-sm"}>
        What do you like? Write them by comman separation
      </p>

      <div className="">
        <textarea
          id="hobbies"
          name="hobbies"
          className="w-full text-gray-700 h-20 border-2 border-gray-300 rounded-sm p-2.5 outline-none"
          placeholder="e.g. Reading, Writing, Playing"
          onChange={handleChange}
          value={jobSeekerData["hobbies"]}
          defaultValue={""}
        />
        {jobseekerDataErrors.hobbies ? (
          <p className="text-danger m-0 text-left mt-2">
            {jobseekerDataErrors.hobbies}
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
    </div>
  );
}

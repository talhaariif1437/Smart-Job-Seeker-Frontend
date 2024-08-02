import React from "react";
import EducationDetails from "../components/Education";
import { resumeStyles } from "../commonTailwindStyles";
import AddMoreBtn from "../components/AddMoreBtn";
import { useStepperContext } from "../../../contexts/StepperContext";
import {  FaMicrophone } from "react-icons/fa";


export default function Education() {

  const handleMicrophoneClick = () => {
    // Logic for microphone button click
    console.log("Microphone clicked");
  };


  const { jobSeekerData, setJobSeekerData } = useStepperContext();

  const handlingEducationData = (index, updatedData) => {
    setJobSeekerData((data) => {
      const newEducationDetails = [...data.education];
      newEducationDetails[index] = {
        ...newEducationDetails[index],
        ...updatedData,
      };

      return {
        ...data,
        education: newEducationDetails,
      };
    });
  };

  const handlingEducationDelete = (index) => {
    setJobSeekerData((data) => {
      const newEducationDetails = data.education.filter((_, i) => i !== index);

      return {
        ...data,
        education: newEducationDetails,
      };
    });
  };

  const addNewEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      grade: "",
      country: "",
      city: "",
      description: "",
      fieldOfStudy: "",
    };
    setJobSeekerData((prevData) => ({
      ...prevData,
      education: [...(prevData.education || []), newEducation],
    }));
  };

  return (
    <div className="ml-5">
      <h1 className={resumeStyles.headings}>Education</h1>
      {(jobSeekerData.education || []).map((education, index) => (
        <EducationDetails
          key={index}
          data={education}
          index={index}
          educationDataHandling={handlingEducationData}
          handlingEducationDelete={handlingEducationDelete}
        />
      ))}
      <AddMoreBtn handleClick={addNewEducation} />
    </div>
  );
}

import React from "react";
import EmployementHistory from "../components/Experience";
import { resumeStyles } from "../commonTailwindStyles";
import AddMoreBtn from "../components/AddMoreBtn";
import { useStepperContext } from "../../../contexts/StepperContext";
import { FaMicrophone } from "react-icons/fa";



export default function Experience() {
  const { jobSeekerData, setJobSeekerData } = useStepperContext();
  //Handling employement information
  const addNewEmployement = () => {
    const newEmployement = {
      title: "",
      employer: "",
      startDate: "",
      endDate: "",
      country: "",
      city: "",
      description: "",
    };
    setJobSeekerData((prevData) => ({
      ...prevData,
      employementHistories: [
        ...(prevData.employementHistories || []),
        newEmployement,
      ],
    }));
  
    // setResumeData((data) => {
    //   return {
    //     ...data,
    //     employementHistories: [...data.employementHistories, newEmployement],
    //   };
    // });
  };

  const employmentHistoryDataHandling = (index, updatedData) => {
    setJobSeekerData((data) => {
      const newEmploymentHistories = [...data.employementHistories];
      newEmploymentHistories[index] = {
        ...newEmploymentHistories[index],
        ...updatedData,
      };

      return {
        ...data,
        employementHistories: newEmploymentHistories,
      };
    });
  };

  const handleEmployementDelete = (index) => {
    setJobSeekerData((data) => {
      const newEmploymentHistories = data.employementHistories.filter(
        (_, i) => i !== index
      );

      return {
        ...data,
        employementHistories: newEmploymentHistories,
      };
    });
  };
  return (
    <div className="ml-5">
      <h1 className={resumeStyles.headings}>Experience</h1>
      <p className={resumeStyles.textBelowHeading}>
        Show some relevant experience. This will help you in the recruitement
        process as it highlights your profile
      </p>
      {(jobSeekerData.employementHistories || []).map((hist, index) => (
        <EmployementHistory
          key={index}
          data={hist}
          index={index}
          employmentHistoryDataHandling={employmentHistoryDataHandling}
          handleEmployementDelete={handleEmployementDelete}
        />
      ))}
      <AddMoreBtn handleClick={addNewEmployement} />
      {/* <button className="flex ms-3" onClick={addNewEmployement}>
        <PlusIcon />
        <p className="text-blue-800">Add another experience</p>
      </button> */}
    </div>
  );
}

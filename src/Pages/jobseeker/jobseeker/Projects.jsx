import React from "react";
import { resumeStyles } from "../commonTailwindStyles";
import Project from "../components/Projects";
import AddMoreBtn from "../components/AddMoreBtn";
import { useStepperContext } from "../../../contexts/StepperContext";

export default function Projects() {
  //Handling project information
  const { jobSeekerData, setJobSeekerData } = useStepperContext();

  const addNewProject = () => {
    const project = {
      name: "",
      organization: "",
      description: "",
      startDate: "",
      endDate: "",
      link: "",
    };
    setJobSeekerData((prevData) => ({
      ...prevData,
      projects: [...(prevData.projects || []), project],
    }));
  };

  const handlingProjectData = (index, updatedData) => {
    const projectData = [...jobSeekerData?.projects];
    projectData[index] = {
      ...projectData[index],
      ...updatedData,
    };
    setJobSeekerData((data) => {
      return {
        ...data,
        projects: projectData,
      };
    });
  };

  const handlingProjectDelete = (index) => {
    setJobSeekerData((data) => {
      const newProjects = data?.projects?.filter((_, i) => i !== index);
      return {
        ...data,
        projects: newProjects,
      };
    });
    if (index === 0) {
      setSelectedItems({
        ...selectedItems,
        projects: false,
      });
    }
  };

  return (
    <div className="">
      <h1 className={resumeStyles.headings}>Project</h1>
      <p className={resumeStyles.textBelowHeading}>
        Add your projects. This will help you in the recruitement process as it
        highlights your profile
      </p>
      {jobSeekerData?.projects?.map((hist, index) => (
        <Project
          key={index}
          project={hist}
          index={index}
          handlingProjectData={handlingProjectData}
          handlingProjectDelete={handlingProjectDelete}
        />
      ))}
      <AddMoreBtn handleClick={addNewProject} />
      {/* <button className="flex ms-3" onClick={addNewProject}>
        <PlusIcon />
        <p className="text-blue-800">Add one more project</p>
      </button> */}
    </div>
  );
}

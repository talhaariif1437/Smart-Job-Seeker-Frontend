import React from "react";
import { resumeStyles } from "../commonTailwindStyles";
import Certification from "../components/Certifications";
import AddMoreBtn from "../components/AddMoreBtn";
import { useStepperContext } from "../../../contexts/StepperContext";

export default function Certifications() {
  const { jobSeekerData, setJobSeekerData } = useStepperContext();
  //Handling certification information
  const addNewCertification = () => {
    const certification = {
      title: "",
      organization: "",
      issueDate: "",
      expirationDate: "",
      link: "",
    };
    setJobSeekerData((prevData) => ({
      ...prevData,
      certification: [...(prevData.certification || []), certification],
    }));
  };

  const handlingCertificationData = (index, updatedData) => {
    setJobSeekerData((data) => {
      const certificationData = [...data.certification];
      certificationData[index] = {
        ...certificationData[index],
        ...updatedData,
      };
      return {
        ...data,
        certification: certificationData,
      };
    });
  };

  const handlingCertificationDelete = (index) => {
    setJobSeekerData((data) => {
      const newCertifications = data.certification.filter(
        (_, i) => i !== index
      );
      return {
        ...data,
        certification: newCertifications,
      };
    });
    if (index === 0) {
      setSelectedItems({
        ...selectedItems,
        certification: false,
      });
    }
  };

  return (
    <div className="ml-5">
      <h1 className={resumeStyles.headings}>Certifications</h1>
      <p className={resumeStyles.textBelowHeading}>
        Add your certifications. This will help you in the recruitement process
        as it highlights your profile
      </p>
      {(jobSeekerData.certification || []).map((hist, index) => (
        <Certification
          key={index}
          data={hist}
          index={index}
          handlingCertificationData={handlingCertificationData}
          handlingCertificationDelete={handlingCertificationDelete}
        />
      ))}
      <AddMoreBtn handleClick={addNewCertification} />
      {/* <button className="flex ms-3" onClick={addNewCertification}>
        <PlusIcon />
        <p className="text-blue-800">Add one more certification</p>
      </button> */}
    </div>
  );
}

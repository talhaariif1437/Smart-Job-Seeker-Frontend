import React, { useContext, useEffect, useState } from "react";
import { useStepperContext } from "../../contexts/StepperContext";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import PersonalInfo from "./jobseeker/PersonalInfo";
import Skills from "./jobseeker/Skills";
import Certification from "./jobseeker/Certification";
import Education from "./jobseeker/Education";
import Experience from "./jobseeker/Experience";
import Hobbies from "./jobseeker/Hobbies";
import JobInfo from "./jobseeker/JobInfo";
import Projects from "./jobseeker/Projects";
const Form = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const jobseekerData = JSON.parse(localStorage.getItem("jobseeker"));
  const { jobSeekerData, setJobSeekerData, setJobseekerDataErrors } =
    useStepperContext();
  const jobseeker = JSON.parse(localStorage.getItem("jobseekerId"));

  // useEffect(() => {
  //   setJobSeekerData(jobSeekerData);
  // }, []);
  console.log(jobSeekerData)

  function isValidEmail(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  }

  const handlingJobseekerFormErrors = () => {
    switch (currentStep) {
      case 1:
        setJobseekerDataErrors((error) => ({
          ...error,
          personalInformation: {
            firstName: jobSeekerData.personalInformation.firstName
              ? ""
              : "First Name is required",
            lastName: jobSeekerData.personalInformation.lastName
              ? ""
              : "Last Name is required",
            dob: jobSeekerData.personalInformation.dob
              ? ""
              : "Date of Birth is required",
            phoneNumber: jobSeekerData.personalInformation.phoneNumber
              ? ""
              : "Phone Number is required",
            email: jobSeekerData.personalInformation.email
              ? !isValidEmail(jobSeekerData.personalInformation.email)
                ? "Email is invalid"
                : ""
              : "Email is required",
            gender: jobSeekerData.personalInformation.gender
              ? ""
              : "Gender is required",
            country: jobSeekerData.personalInformation.country
              ? ""
              : "Country is required",
            state: jobSeekerData.personalInformation.state
              ? ""
              : "State is required",
            city: jobSeekerData.personalInformation.city
              ? ""
              : "City is required",
            zip: jobSeekerData.personalInformation.zip
              ? ""
              : "Zip / Postal Code is required",
            address: jobSeekerData.personalInformation.address
              ? ""
              : "Street Address is required",
          },
          educationLevel: jobSeekerData.educationLevel
            ? ""
            : "Education is required",
          experience: jobSeekerData.experience
            ? ""
            : "Experience Level is required",
          summary: jobSeekerData.summary ? "" : "Summary is required",
        }));
        break;

      case 2:
        setJobseekerDataErrors((error) => ({
          ...error,
          industry: jobSeekerData.industry ? "" : "Enter the industry",
          skills: jobSeekerData.skills ? "" : "Enter at least one Skill",
        }));
        break;

      // case 3:
      //   setJobseekerDataErrors((error) => ({
      //     ...error,
      //     certification: {
      //       title: jobSeekerData.title ? "" : "Title is required",
      //       organization: jobSeekerData.organization ? "" : "Name is required",
      //       startDate: jobSeekerData.startDate ? "" : "Start Date is required",
      //       endDate: jobSeekerData.endDate ? "" : "End Date is required",
      //     },
      //   }));
      //   break;

      // case 4:
      //   setJobseekerDataErrors((error) => ({
      //     ...error,
      //     education: {
      //       institution: jobSeekerData.education.institution
      //         ? ""
      //         : "Institution is required",
      //       degree: jobSeekerData.education.degree ? "" : "Degree is required",
      //       endDate: jobSeekerData.education.endDate
      //         ? ""
      //         : "Start Date is required",
      //       startDate: jobSeekerData.education.startDate
      //         ? ""
      //         : "End Date is required",
      //       grade: jobSeekerData.education.grade ? "" : "Grade is required",
      //       fieldOfStudy: jobSeekerData.education.fieldOfStudy
      //         ? ""
      //         : "Subject is required",
      //       description: jobSeekerData.education.description
      //         ? ""
      //         : "Description is required",
      //       city: jobSeekerData.education.city ? "" : "City is required",
      //       country: jobSeekerData.education.country
      //         ? ""
      //         : "Country is required",
      //     },
      //   }));
      //   break;
      // // case 5:
      //   setJobseekerDataErrors((error) => ({
      //     ...error,
      //     employementHistory: {
      //       title: jobSeekerData.employementHistory?.title
      //         ? ""
      //         : "Job Title is required",
      //       employer: jobSeekerData.employementHistory.employer
      //         ? ""
      //         : "Employer is required",
      //       startDate: jobSeekerData.employementHistory.startDate
      //         ? ""
      //         : "Start Date is required",
      //       endDate: jobSeekerData.employementHistory.endDate
      //         ? ""
      //         : "End Date is required",
      //       jobDescdescriptionription: jobSeekerData.employementHistory
      //         .description
      //         ? ""
      //         : "Description is required",
      //       city: jobSeekerData.employementHistory.city
      //         ? ""
      //         : "City is required",
      //       country: jobSeekerData.employementHistory.country
      //         ? ""
      //         : "Country is required",
      //     },
      //   }));
      //   break;
      // case 7:
      //   setJobseekerDataErrors((error) => ({
      //     ...error,
      //     hobbies: jobSeekerData.hobbies ? "" : "Enter at least one Hobby",
      //   }));
      //   break;
      // case 7:
      //   setJobseekerDataErrors((error) => ({
      //     ...error,
      //     requiredJobDetails: {
      //       jobType: jobSeekerData.jobType ? "" : "Please select job type",
      //       salaryExpectation: jobSeekerData.salaryExpectation
      //         ? ""
      //         : "Please select desired salary",
      //       jobCity: jobSeekerData.jobCity ? "" : "Please select city",
      //       jobState: jobSeekerData.jobState ? "" : "Please select state",
      //       jobCountry: jobSeekerData.jobCountry ? "" : "Please select country",
      //       jobMode: jobSeekerData.requiredJobDetails.jobMode
      //         ? ""
      //         : "Please select job mode",
      //     },
      //   }));
      //   break;
      default:
        break;
    }
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          jobSeekerData?.personalInformation?.firstName !== "" &&
          jobSeekerData?.personalInformation?.lastName !== "" &&
          jobSeekerData?.personalInformation?.dob !== "" &&
          jobSeekerData?.personalInformation?.phoneNumber !== "" &&
          jobSeekerData?.personalInformation?.email !== "" &&
          isValidEmail(jobSeekerData?.personalInformation?.email) &&
          jobSeekerData?.personalInformation?.gender !== "" &&
          jobSeekerData?.educationLevel !== "" &&
          jobSeekerData?.experience !== "" &&
          jobSeekerData?.summary !== "" &&
          jobSeekerData?.personalInformation?.country !== "" &&
          jobSeekerData?.personalInformation?.state !== "" &&
          jobSeekerData?.personalInformation?.city !== "" &&
          jobSeekerData?.personalInformation?.zip !== "" &&
          jobSeekerData?.personalInformation?.address !== ""
        );
      case 2:
        return jobSeekerData?.industry != "" && jobSeekerData?.skills !== "";
      case 3:
        return (
          jobSeekerData?.certification?.title !== "" &&
          jobSeekerData?.certification?.organization !== "" &&
          jobSeekerData?.certification?.issueDate != "" &&
          jobSeekerData?.certification?.expirationDate != ""
        );
      case 4:
        return (
          jobSeekerData?.education?.institution !== "" &&
          jobSeekerData?.education?.degree !== "" &&
          jobSeekerData?.education?.startDate !== "" &&
          jobSeekerData?.education?.endDate !== "" &&
          jobSeekerData?.education?.grade !== "" &&
          jobSeekerData?.education?.fieldOfStudy !== ""
        );
      case 5:
        return (
          jobSeekerData?.employementHistory?.title !== "" &&
          jobSeekerData?.employementHistory?.employer !== "" &&
          jobSeekerData?.employementHistory?.startDate !== "" &&
          jobSeekerData?.employementHistory?.endDate !== "" &&
          jobSeekerData?.employementHistory?.description !== ""
        );
      case 6:
        return (
          jobSeekerData?.project?.title !== "" &&
          jobSeekerData?.project?.organization !== "" &&
          jobSeekerData?.project?.startDate !== "" &&
          jobSeekerData?.project?.endDate !== "" &&
          jobSeekerData?.project?.link !== "" &&
          jobSeekerData?.project?.description !== ""
        );
      case 7:
        return jobSeekerData?.hobbies !== "";
      case 8:
        return (
          jobSeekerData?.requiredJobDetails?.jobType !== "" &&
          jobSeekerData?.requiredJobDetails?.jobCountry !== "" &&
          jobSeekerData?.requiredJobDetails?.jobState !== "" &&
          jobSeekerData?.requiredJobDetails?.jobCity !== "" &&
          jobSeekerData?.requiredJobDetails?.industry != "" &&
          jobSeekerData?.requiredJobDetails?.salary != "" &&
          jobSeekerData?.requiredJobDetails?.jobMode != ""
        );

      default:
        return false;
    }
  };

  const handleClick = async (direction) => {
    if (direction === "next" && currentStep < steps.length) {
      if (isSubmitting) return;
      const isValid = isCurrentStepValid();
      if (isValid) {
        let newStep = currentStep + 1;
        setCurrentStep(newStep);
        handlingJobseekerFormErrors();
        localStorage.setItem("jobSeekerData", JSON.stringify(jobSeekerData));
        const res = await updateAPI("api/jobseekers", jobSeekerData, jobseeker);
        // if (res.success) {
        // } else {
        //   showErrorToast("Profile could not be updated");
        // }
      } else {
        alert("Please fill all required fields");
        handlingJobseekerFormErrors();
      }
    } else if (direction === "back" && currentStep > 1) {
      let newStep = currentStep - 1;
      setCurrentStep(newStep);
    } else if (currentStep === steps.length) {
      const isValid = isCurrentStepValid();
      if (isValid) {
        setIsSubmitting(true);
        const formated = {
          ...jobSeekerData,
          requiredJobDetails: {
            jobType: jobSeekerData.jobType,
            jobMode: jobSeekerData.jobMode,
            salaryExpectation: jobSeekerData.salaryExpectation,
            industryJob: jobSeekerData.industryJob,
            jobLocation: {
              city: jobSeekerData.jobCity,
              state: jobSeekerData.jobState,
              country: jobSeekerData.jobCountry,
            },
          },
        };
        localStorage.setItem("jobSeekerData", JSON.stringify(formated));
        const res = await updateAPI(
          "api/jobseekers",
          formated,
          jobseeker
          // "application/json"
        );
        if (res.success) {
          console.log("result is: ", res.data);
          alert("Profile Updated Successfully");
          // Swal.fire({
          //   icon: "success",
          //   title: "Success!",
          //   text: "Your data has been submitted successfully.",
          // });
        } else {
          console.log("error is: ", res.error);
        }

        handlingJobseekerFormErrors();
      } else {
        alert("Please fill all required fields");  
        handlingJobseekerFormErrors();
      }
    }
  };

  const handleStepClick = (step) => {
    const isValid = isCurrentStepValid();

    if (isValid || step < currentStep) {
      setCurrentStep(step);
      handlingJobseekerFormErrors();
    } else {
      if (step < steps.length) {
        alert("Please fill all required fields");
        handlingJobseekerFormErrors();
      }
    }
  };

  const steps = [
    "Personal Information",
    "Skills",
    "Education",
    "Experience",
    "Certifications",
    "Projects",
    "Hobbies",
    "Job Information",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <PersonalInfo />;
      case 2:
        return <Skills />;
      case 3:
        return <Education />;
      case 4:
        return <Experience />;
      case 5:
        return <Certification />;
      case 6:
        return <Projects />;
      case 7:
        return <Hobbies />;
      case 8:
        return <JobInfo />;

      default:
    }
  };

  return (
    <div className="mx-auto rounded-2xl bg-white my-3 pb-2 pr-4 shadow-lg max-w-full">
      <div className="horizontal container mt-2  p-10 ">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
          allFieldsFilled={isCurrentStepValid}
        />

        <div className="my-2 p-2 ">{displayStep(currentStep)}</div>
      </div>

      {currentStep <= steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  );
};

export default Form;

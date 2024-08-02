import { createContext, useContext, useState } from "react";

const StepperContext = createContext({
  userData: "",
  setUserData: null,
  jobSeekerData: "",
  setJobSeekerData: null,
  companyDataErrors: "",
  setCompanyDataErrors: null,
  jobseekerDataErrors: "",
  setJobseekerDataErrors: null,
});

export function UseContextProvider({ children }) {
  const jobseekerData1 = JSON.parse(localStorage.getItem("jobSeekerData"));
  const companyData = JSON.parse(localStorage.getItem("company"));

  // console.log('data: ',jobSeekerData)

  const [userData, setUserData] = useState(
    companyData
    // || {
    //   name: "",
    //   industry: "",
    //   size: "",
    //   logo: "",
    //   email: "",
    //   phone: "",
    //   location: {
    //     country: "",
    //     state: "",
    //     city: "",
    //     zip: "",
    //     address: "",
    //   },
    //   companyDescription: "",
    //   missionStatement: "",
    //   benefits: [],
    //   twitter: "",
    //   facebook: "",
    //   companyImages: [],
    //   document: [],
    // }
  );

  const [jobSeekerData, setJobSeekerData] = useState(
    jobseekerData1 && {
      ...jobseekerData1,
      jobType: jobseekerData1?.requiredJobDetails?.jobType,
      jobMode: jobseekerData1?.requiredJobDetails?.jobMode,
      industryJob: jobseekerData1?.requiredJobDetails?.industryJob,
      salaryExpectation: jobseekerData1?.requiredJobDetails?.salaryExpectation,
      jobCity: jobseekerData1?.requiredJobDetails?.jobLocation?.city,
      jobCountry: jobseekerData1?.requiredJobDetails?.jobLocation?.country,
      jobState: jobseekerData1?.requiredJobDetails?.jobLocation?.state,
      employementHistories: jobseekerData1?.employementHistories?.map((emp) => {
        return {
          ...emp,
          startDate: emp?.startDate ? emp?.startDate.split("T")[0] : "",
          endDate: emp?.endDate ? emp?.endDate.split("T")[0] : "",
        };
      }),
      education: jobseekerData1?.education?.map((edu) => {
        return {
          ...edu,
          startDate: edu?.startDate ? edu?.startDate.split("T")[0] : "",
          endDate: edu?.endDate ? edu?.endDate.split("T")[0] : "",
        };
      }),
      certifications: jobseekerData1?.certifications?.map((cert) => {
        return {
          ...cert,
          issueDate: cert?.issueDate ? cert?.issueDate.split("T")[0] : "",
          expirationDate: cert?.expirationDate
            ? cert?.expirationDate.split("T")[0]
            : "",
        };
      }),
      projects: jobseekerData1?.projects?.map((proj) => {
        return {
          ...proj,
          startDate: proj?.startDate ? proj?.startDate.split("T")[0] : "",
          endDate: proj?.endDate ? proj?.endDate.split("T")[0] : "",
        };
      }),
    }

    // {

    //   personalInformation: {
    //     firstName: "",
    //     lastName: "",
    //     dob: "",
    //     phoneNumber: "",
    //     email: "",
    //     gender: "",
    //     country: "",
    //     state: "",
    //     city: "",
    //     zip: "",
    //     address: "",
    //     profilePicture: "",
    //   },
    //   educationLevel: "",
    //   summary: "",
    //   experience: 0,
    //   industry: "",
    //   skills: [],
    //   employementHistory: {
    //     title: "",
    //     employer: "",
    //     city: "",
    //     country: "",
    //     startDate: "",
    //     endDate: "",
    //     description: "",
    //   },
    //   education: {
    //     institution: "",
    //     degree: "",
    //     grade: "",
    //     fieldOfStudy: "",
    //     startDate: "",
    //     endDate: "",
    //     description: "",
    //     country: "",
    //     city: "",
    //   },
    //   certifications: {
    //     title: "",
    //     organization: "",
    //     issueDate: "",
    //     expirationDate: "",
    //     link: "",
    //   },
    // }
  );

  // const [jobseekerDataErrors, setJobseekerDataErrors] = useState({
  //   firstName: "",
  //   lastName: "",
  //   dob: "",
  //   phoneNumber: "",
  //   email: "",
  //   gender: "",
  //   educationLevel: "",
  //   experienceLevel: "",
  //   summary: "",
  //   country: "",
  //   state: "",
  //   city: "",
  //   zip: "",
  //   address: "",
  //   industry: "",
  //   skills: [],
  //   certification: "",
  //   issueOrg: "",
  //   certStart: "",
  //   certEnd: "",
  //   school: "",
  //   education: "",
  //   // educationStart: "",
  //   // educationEnd: "",
  //   grade: "",
  //   subject: "",
  //   // description: "",
  //   job: "",
  //   company: "",
  //   jobStart: "",
  //   jobEnd: "",
  //   jobDescription: "",
  //   hobbies: [],
  //   jobType: "",
  //   jobLocations: [],
  // });

  const [jobseekerDataErrors, setJobseekerDataErrors] = useState({
    personalInformation: {
      firstName: "",
      lastName: "",
      dob: "",
      phoneNumber: "",
      
      email: "",
      gender: "",
      country: "",
      state: "",
      city: "",
      zip: "",
      address: "",
      profilePicture: "",
    },
    educationLevel: "",
    summary: "",
    experience: 0,
    industry: "", 
    skills: [],
    employementHistory: {
      title: "",
      employer: "",
      city: "",
      country: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    education: {
      institution: "",
      degree: "",
      grade: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: "",
      country: "",
      city: "",
    },
    certifications: {
      title: "",
      organization: "",
      issueDate: "",
      expirationDate: "",
      link: "",
    },
  });
  const [companyDataErrors, setCompanyDataErrors] = useState({
    name: "",
    industry: "",
    size: "",
    logo: "",
    email: "",
    phone: "",
    location: {
      country: "",
      state: "",
      city: "",
      zip: "",
      address: "",
    },
    companyDescription: "",
    missionStatement: "",
    benefits: [],
    twitter: "",
    facebook: "",
    companyImages: [],
    document: [],
  });

  return (
    <StepperContext.Provider
      value={{
        userData,
        setUserData,
        jobSeekerData,
        setJobSeekerData,
        jobseekerDataErrors,
        setJobseekerDataErrors,
        companyDataErrors,
        setCompanyDataErrors,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const {
    userData,
    setUserData,
    jobSeekerData,
    setJobSeekerData,
    jobseekerDataErrors,
    setJobseekerDataErrors,
    companyDataErrors,
    setCompanyDataErrors,
  } = useContext(StepperContext);

  return {
    userData,
    setUserData,
    jobSeekerData,
    setJobSeekerData,
    jobseekerDataErrors,
    setJobseekerDataErrors,
    companyDataErrors,
    setCompanyDataErrors,
  };
}
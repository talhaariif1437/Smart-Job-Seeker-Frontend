import React, { useState, useEffect } from "react";
import { useStepperContext } from "../../../contexts/StepperContext.jsx";
import Select from "react-select";
import { FaMicrophone } from "react-icons/fa";

const industryWiseSkills = [
  {
    industry: "Technology",
    skills: [
      { label: "JavaScript", value: "JavaScript" },
      { label: "React", value: "React" },
      { label: "Node.js", value: "Node.js" },
    ],
  },
  {
    industry: "Healthcare",
    skills: [
      { label: "Nursing", value: "Nursing" },
      { label: "First Aid", value: "First Aid" },
      { label: "Medical Coding", value: "Medical Coding" },
    ],
  },
  // Add more industries and skills as needed
];

const industryOptions = industryWiseSkills.map((industry) => ({
  label: industry.industry,
  value: industry.industry,
}));

const Skills = () => {
  const handleMicrophoneClick = () => {
    // Logic for microphone button click
    console.log("Microphone clicked");
  };

  const { jobSeekerData, setJobSeekerData, jobseekerDataErrors } = useStepperContext();
  const [industry, setIndustry] = useState("");
  const [industrySkills, setIndustrySkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (jobSeekerData.industry) {
      setIndustry(jobSeekerData.industry);
      let filteredSkills = industryWiseSkills.find((skill) => skill.industry === jobSeekerData.industry);
      if (filteredSkills) {
        setIndustrySkills(filteredSkills.skills);
        if (jobSeekerData.skills) {
          const selectedSkills = jobSeekerData.skills.map((skill) => {
            return { label: skill, value: skill };
          });
          setSelectedSkills(selectedSkills);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (industry) {
      const skill = industryWiseSkills.find((skill) => skill.industry === industry);
      if (skill) {
        setIndustrySkills(skill.skills);
      }
    }
  }, [industry]);

  return (
    <div className="ml-4 mr-5">
      <div className="sm:col-span-3">
        <label htmlFor="industry" className="block text-start text-sm font-medium leading-6 text-gray-900 pt-10">
          Industry <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Select
            className="basic-single block w-full rounded-md border-0 py-1.5 text-gray-900 text-start placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            isClearable={!!industry}
            isSearchable={true}
            name="industry"
            placeholder="Select an industry"
            options={industryOptions}
            value={industry ? { label: industry, value: industry } : null}
            onChange={(selectedOption) => {
              if (selectedOption) {
                setIndustry(selectedOption.value);
                setJobSeekerData({
                  ...jobSeekerData,
                  industry: selectedOption.value,
                });
              } else {
                setIndustry("");
                setJobSeekerData({
                  ...jobSeekerData,
                  industry: "",
                });
              }
            }}
          />
          <button
            type="button"
            className="microphone-button absolute right-12 top-6"
            onClick={handleMicrophoneClick}
          >
            <FaMicrophone className="microphone-icon" />
          </button>
        </div>
        {jobseekerDataErrors.industry ? (
          <p className="text-start job-error text-danger">{jobseekerDataErrors.industry}</p>
        ) : null}
      </div>

      {industry && (
        <div className="sm:col-span-3">
          <label htmlFor="skills" className="block text-start text-sm font-medium leading-6 text-gray-900">
            Skills <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Select
              isMulti
              name="skills"
              placeholder="Select skills"
              options={industrySkills}
              value={selectedSkills}
              className="basic-multi-select block w-full rounded-md border-0 py-1.5 text-gray-900 text-start placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(selectedOption) => {
                const selectedSkills = selectedOption ? selectedOption.map((skill) => skill.value) : [];
                const formattedSkills = selectedSkills.map((skill) => ({
                  label: skill,
                  value: skill,
                }));
                setSelectedSkills(formattedSkills);
                setJobSeekerData({
                  ...jobSeekerData,
                  skills: selectedSkills,
                });
              }}
            />
          </div>
          {jobseekerDataErrors.skills ? (
            <p className="text-start job-error text-danger">{jobseekerDataErrors.skills}</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Skills;

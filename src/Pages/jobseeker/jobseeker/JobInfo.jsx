import React, { useState, useEffect } from "react";
import { useStepperContext } from "../../../contexts/StepperContext.jsx";
// import industryOptions from "../../../data_arrays/industries.json";
import Select from "react-select";
import InputField from "../components/InputField.jsx";
import CountryStateCityDropdown from "../components/CountryStateCityDropdown.jsx";

import { GetCity, GetCountries, GetState } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import {  FaMicrophone } from "react-icons/fa";


function JobInfo() {
  const { jobSeekerData, setJobSeekerData, jobseekerDataErrors } =
    useStepperContext();

  const [country, setCountry] = useState("");
  const [countryId, setCountryid] = useState("");
  const [stateId, setstateid] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cityId, setCityId] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  //fetching countries
  useEffect(() => {
    const fetchCountries = async () => {
      const data = await GetCountries();
      const formatedData = data.map((d) => {
        return {
          label: d.name,
          id: d.id,
        };
      });
      setCountries(formatedData);
    };
    fetchCountries();
  }, []);

  const handleMicrophoneClick = () => {
    // Logic for microphone button click
    console.log("Microphone clicked");
  };

  //fetching states
  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        const data = await GetState(countryId);
        const formatedData = data.map((d) => {
          return {
            label: d.name,
            id: d.id,
          };
        });
        setStates(formatedData);
      };

      fetchStates();
    }
  }, [selectedCountry, countryId]);

  //fetching cities
  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        const data = await GetCity(countryId, stateId);
        const formatedData = data.map((d) => {
          return {
            label: d.name,
            id: d.id,
          };
        });
        setCities(formatedData);
      };

      fetchCities();
    }
  }, [selectedState, stateId]);

  //handling country change
  const handleCountryChange = (selectedOption) => {
    setJobSeekerData({
      ...jobSeekerData,
      jobCountry: selectedOption.label,
    });
    setSelectedCountry(selectedOption.label);
    setCountryid(selectedOption.id);
    setCountry(selectedOption);
    setSelectedState(null);
    setSelectedCity(null);
    setCities([]);
    setStates([]);
    setState(null);
    setCity(null);
  };

  //handling state change
  const handleStateChange = (selectedOption) => {
    setJobSeekerData({
      ...jobSeekerData,
      jobState: selectedOption.label,
    });
    setSelectedState(selectedOption.label);
    setstateid(selectedOption.id);
    setState(selectedOption);
    setSelectedState(selectedOption.label);
    setCities([]);
    setSelectedCity(null);
    setCity(null);
  };

  //handling city change
  const handleCityChange = (selectedOption) => {
    setJobSeekerData({
      ...jobSeekerData,
      jobCity: selectedOption.label,
    });
    setSelectedCity(selectedOption.label);
    setCityId(selectedOption.id);
    setCity(selectedOption);
  };

  useEffect(() => {
    const getCountries = async () => {
      setIndustry(jobSeekerData?.industryJob);
      const data = await GetCountries();
      const selectedCountry = data.find(
        (c) => c.name === jobSeekerData?.jobCountry
      );
      const states = await GetState(selectedCountry?.id);
      const selectedState = states.find(
        (s) => s.name === jobSeekerData?.jobState
      );
      const cities = await GetCity(selectedCountry?.id, selectedState?.id);
      const selectedCity = cities.find(
        (c) => c.name === jobSeekerData?.jobCity
      );
      const formatedStates = states.map((d) => {
        return {
          label: d.name,
          id: d.id,
        };
      });
      setStates(formatedStates);
      const formatedCities = cities.map((d) => {
        return {
          label: d.name,
          id: d.id,
        };
      });
      setCities(formatedCities);
      setCountry({
        label: selectedCountry?.name,
        value: selectedCountry?.name,
      });
      setCountryid(selectedCountry?.id);
      setState({
        label: selectedState?.name,
        value: selectedState?.name,
      });
      setstateid(selectedState?.id);
      setCity({
        label: selectedCity?.name,
        value: selectedCity?.name,
      });
      setCityId(selectedCity?.id);
    };

    getCountries();
  }, []);

  const [industry, setIndustry] = useState("");
  return (
    <div className="text-left ml-4">
      <h1 className=" font-normal text-xl">Job Information</h1>
      <div className="sm:col-span-2 mt-4">
        <label
          htmlFor="industry"
          className="block text-start  text-sm font-medium leading-6 text-gray-900"
        >
          Industry <span className="text-red-500">*</span>
        </label>
        <Select
          className="basic-single  block w-full rounded-md border-0 py-1.5 text-gray-900 text-start placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          isClearable={industry ? true : false}
          isSearchable={true}
          name="industryJob"
          // options={industryOptions}
          placeholder="Select an industry"
          value={industry ? { label: industry, value: industry } : null}
          onChange={(selectedOption) => {
            if (selectedOption) {
              setIndustry(selectedOption.value);
              setJobSeekerData({
                ...jobSeekerData,
                industryJob: selectedOption.value,
              });
            } else {
              setIndustry(null);
              setJobSeekerData({
                ...jobSeekerData,
                industryJob: null,
              });
            }
          }}
        />
        {jobseekerDataErrors.industryJob ? (
          <p className="text-start job-error text-danger">
            {jobseekerDataErrors.industryJob}
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
      <div className="sm:col-span-1 mt-2 ">
        <InputField
          id="salaryExpectation"
          htmlFor="salary"
          labelText="Salary Expectation"
          placeholder="123456"
          handleChange={(e) => {
            setJobSeekerData({
              ...jobSeekerData,
              salaryExpectation: e.target.value,
            });
          }}
          value={jobSeekerData["salaryExpectation"] || ""}
          error={jobseekerDataErrors.salaryExpectation}
        />
         <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
        <CountryStateCityDropdown
          label="Country"
          name="jobCountry"
          placeholder="Select Country"
          value={country}
          required
          error={jobseekerDataErrors.jobCountry}
          type="basic-single"
          array={countries}
          handleProficiency={handleCountryChange}
        />
        

        {country ? (
          <CountryStateCityDropdown
            label="State"
            name="jobState"
            placeholder="Select state"
            value={state}
            required
            error={jobseekerDataErrors.jobState}
            type="basic-single"
            array={states}
            handleProficiency={handleStateChange}
          />
        ) : null}
        

        {state ? (
          <CountryStateCityDropdown
            label="City"
            name="jobCity"
            placeholder="Select city"
            value={city}
            required
            error={jobseekerDataErrors.jobCity}
            type="basic-single"
            array={cities}
            handleProficiency={handleCityChange}
          />
        ) : null}
        
      </div>
      {/* <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
        <div className="col-span-2">
          <label
            htmlFor="jobCountry"
            className="block text-start  text-sm font-medium leading-6 text-gray-900"
          >
            <span className="text-red-500">*</span> Country
          </label>
          <div className="mt-1">
            <CountrySelect
              onChange={(selectedCountry) => {
                console.log(selectedCountry);
                setCountryid(selectedCountry.id);
                setCountry(selectedCountry);
                setJobSeekerData({
                  ...jobSeekerData,
                  jobCountry: selectedCountry.name,
                });
              }}
              defaultValue={jobSeekerData["jobCountry"] || ""}
              inputClassName="block w-full h-[30px] rounded-md border-0 py-1 px-2 text-gray-900 border-2 outline-none  sm:text-md sm:leading-6 "
              placeHolder="Select Country"
              showFlag={false}
            />
          </div>
          {jobseekerDataErrors.jobCountry ? (
            <p className="text-danger m-0 text-left mt-2">
              {jobseekerDataErrors.jobCountry}
            </p>
          ) : null}
        </div>
        {country ? (
          <div className="col-span-2">
            <label
              htmlFor="jobState"
              className="block text-start  text-sm font-medium leading-6 text-gray-900"
            >
              <span className="text-red-500">*</span> State
            </label>
            <div className="mt-1">
              <StateSelect
                countryid={countryId}
                onChange={(selectedState) => {
                  console.log(selectedState);
                  setstateid(selectedState.id);
                  setState(selectedState);
                  setJobSeekerData({
                    ...jobSeekerData,
                    jobState: selectedState.name,
                  });
                }}
                defaultValue={jobSeekerData["jobState"] || ""}
                placeHolder="Select State"
                inputClassName=" block w-full h-[30px] rounded-md border-0 py-1 px-2 text-gray-900 border-2 outline-none  sm:text-md sm:leading-6 "
              />
            </div>
            {jobseekerDataErrors.jobState ? (
              <p className="text-danger m-0 text-left mt-2">
                {jobseekerDataErrors.jobState}
              </p>
            ) : null}
          </div>
        ) : null}

        {state ? (
          <div className="col-span-2">
            <label
              htmlFor="jobCity"
              className="block text-start  text-sm font-medium leading-6 text-gray-900"
            >
              <span className="text-red-500">*</span> City
            </label>
            <div className="mt-1">
              <CitySelect
                countryid={countryId}
                stateid={stateId}
                // onChange={handleCity}
                onChange={(selectedCity) => {
                  setCityId(selectedCity.id);
                  setCity(selectedCity);
                  setJobSeekerData({
                    ...jobSeekerData,
                    jobCity: selectedCity.name,
                  });
                }}
                defaultValue={jobSeekerData["jobCity"] || ""}
                placeHolder="Select City"
                inputClassName=" block w-full h-[30px] rounded-md border-0 py-1 px-2 text-gray-900 border-2 outline-none  sm:text-md sm:leading-6 "
                container
              />
            </div>
            {jobseekerDataErrors.jobCity ? (
              <p className="text-danger m-0 text-left mt-2">
                {jobseekerDataErrors.jobCity}
              </p>
            ) : null}
          </div>
        ) : null}
      </div> */}
      <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        <div className="col-span-1">
          <label
            htmlFor="jobType"
            className="block text-start  text-sm font-medium leading-6 text-gray-900"
          >
            Job Type<span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <select
              id="jobType"
              name="jobType"
              onChange={(e) => {
                setJobSeekerData({
                  ...jobSeekerData,
                  jobType: e.target.value,
                });
              }}
              value={jobSeekerData["jobType"] || ""}
              className={`block w-full h-[40px] rounded-md border-0 py-1.5 px-2 text-gray-900 border-2 outline-none ring-[1.5px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1.5px] focus:ring-inset focus:ring-blue-500 sm:text-md sm:leading-6 ${
                jobseekerDataErrors.jobType
                  ? "ring-red-500 focus:ring-red-500"
                  : ""
              } `}
            >
              <option value="" disabled hidden>
                Select job type
              </option>
              <option>Full time</option>
              <option>Part time</option>
              <option>Contract</option>
              <option>Temporary</option>
              <option>Internship</option>
            </select>
          </div>
          {jobseekerDataErrors.jobType ? (
            <p className="text-danger m-0 text-left mt-2">
              {jobseekerDataErrors.jobType}
            </p>
          ) : null}
        </div>
        <div className="col-span-1">
          <label
            htmlFor="jobMode"
            className="block text-start  text-sm font-medium leading-6 text-gray-900"
          >
            Job Mode<span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <select
              id="jobMode"
              name="jobMode"
              onChange={(e) => {
                setJobSeekerData({
                  ...jobSeekerData,
                  jobMode: e.target.value,
                });
              }}
              value={jobSeekerData["jobMode"] || ""}
              className={`block w-full h-[40px] rounded-md border-0 py-1.5 px-2 text-gray-900 border-2 outline-none ring-[1.5px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1.5px] focus:ring-inset focus:ring-blue-500 sm:text-md sm:leading-6 ${
                jobseekerDataErrors.jobMode
                  ? "ring-red-500 focus:ring-red-500"
                  : ""
              } `}
            >
              <option value="" disabled hidden>
                Select job mode
              </option>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>
          </div>
          {jobseekerDataErrors.jobMode ? (
            <p className="text-danger m-0 text-left mt-2">
              {jobseekerDataErrors.jobMode}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default JobInfo;

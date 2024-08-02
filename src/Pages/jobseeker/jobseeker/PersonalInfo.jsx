import React, { useState, useEffect } from "react";
import { useStepperContext } from "../../../contexts/StepperContext.jsx";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import CountryStateCityDropdown from "../components/CountryStateCityDropdown.jsx";
import InputField from "../components/InputField.jsx";
import "react-phone-number-input/style.css";
import {  FaMicrophone } from "react-icons/fa";
import ResponsiveAppBar from "../../../Components/mainNavbar/mainNavbar.jsx";

const PersonalInfo = () => {
  const handleMicrophoneClick = () => {
    // Logic for microphone button click
    console.log("Microphone clicked");
  };
  
  
  const {
    jobSeekerData,
    setJobSeekerData,
    jobseekerDataErrors,
    setJobseekerDataErrors,
  } = useStepperContext();

  const [selectedGender, setSelectedGender] = useState(
    jobSeekerData?.personalInformation?.gender
  );

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
    // setJobSeekerData({
    //   ...jobSeekerData,
    //   personalInformation: {
    //     ...jobSeekerData.personalInformation,
    //     country: selectedOption.label,
    //   },
    // });
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
    // setJobSeekerData({
    //   ...jobSeekerData,
    //   personalInformation: {
    //     ...jobSeekerData.personalInformation,
    //     state: selectedOption.label,
    //   },
    // });
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
    // setJobSeekerData({
    //   ...jobSeekerData,
    //   personalInformation: {
    //     ...jobSeekerData.personalInformation,
    //     city: selectedOption.label,
    //   },
    // });
    setSelectedCity(selectedOption.label);
    setCityId(selectedOption.id);
    setCity(selectedOption);
  };

  useEffect(() => {
    const getCountries = async () => {
      const data = await GetCountries();
      const selectedCountry = data.find(
        (c) => c.name === jobSeekerData?.personalInformation?.country
      );
      const states = await GetState(selectedCountry?.id);
      const selectedState = states.find(
        (s) => s.name === jobSeekerData?.personalInformation?.state
      );
      const cities = await GetCity(selectedCountry?.id, selectedState?.id);
      const selectedCity = cities.find(
        (c) => c.name === jobSeekerData?.personalInformation?.city
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobSeekerData({
      ...jobSeekerData,
      personalInformation: {
        ...jobSeekerData.personalInformation,
        [name]: value,
      },
    });
  };

  const handleChange1 = (e) => {
    setSelectedGender(e.target.value);
    setJobSeekerData({
      ...jobSeekerData,
      personalInformation: {
        ...jobSeekerData.personalInformation,
        gender: e.target.value,
      },
    });
  };

  const handlePhoneChange = (value) => {
    setJobSeekerData({
      ...jobSeekerData,
      personalInformation: {
        ...jobSeekerData.personalInformation,
        phoneNumber: value,
      },
    });
  };

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleDateChange = (e) => {
    const dob = e.target.value;
    setJobSeekerData((prevData) => ({
      ...prevData,
      personalInformation: {
        ...prevData.personalInformation,
        dob: dob,
      },
    }));

    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      setJobseekerDataErrors((prevErrors) => ({
        ...prevErrors,
        personalInformation: {
          ...prevErrors.personalInformation,
          dob: "Age must be at least 18 years old.",
        },
      }));
    } else {
      setJobseekerDataErrors((prevErrors) => ({
        ...prevErrors,
        personalInformation: {
          ...prevErrors.personalInformation,
          dob: "",
        },
      }));
    }
  };

  return (
  
    <div className="flex w-full h-full justify-center items-center ">

      
      <div>
        <form>
          <div className="space-y-8">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1">
                <div className="sm:col-span-1">
                  <InputField
                    id="headline"
                    htmlFor="headline"
                    labelText="Headline"
                    placeholder="Senior Software Engineer"
                    handleChange={(e) => {
                      setJobSeekerData({
                        ...jobSeekerData,
                        headline: e.target.value,
                      });
                    }}
                    value={jobSeekerData?.headline}
                    required
                    error={jobseekerDataErrors?.headline}
                  />
                  <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
                </div>
                <div className="grid grid-cols-2 gap-x-6">
                  <div className="sm:col-span-1">
                    <InputField
                      id="firstName"
                      htmlFor="firstName"
                      labelText="First Name"
                      placeholder="Muhammad"
                      handleChange={handleChange}
                      value={jobSeekerData?.personalInformation?.firstName}
                      required
                      error={
                        jobseekerDataErrors?.personalInformation?.firstName
                      }
                    />
                    <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
                  </div>
                  <div className="sm:col-span-1">
                    <InputField
                      id="lastName"
                      htmlFor="lastName"
                      labelText="Last Name"
                      placeholder="Ahmad"
                      handleChange={handleChange}
                      value={jobSeekerData?.personalInformation?.lastName}
                      required
                      error={jobseekerDataErrors?.personalInformation?.lastName}
                    />
                    <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
                  </div>
                </div>
                <div className="sm:col-span-full grid grid-cols-1  sm:grid-cols-2 gap-4">
                  {/* Start Date */}
                  {/* <div className="sm:col-span-1">
                    <label
                      htmlFor="birthDate"
                      className="block text-start text-sm font-medium leading-6 text-gray-900"
                    >
                      Date of Birth<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        id="dob"
                        onChange={handleDateChange}
                        value={jobSeekerData?.personalInformation?.dob}
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Pick a date"
                      />
                    </div>
                    {jobseekerDataErrors?.personalInformation?.dob ? (
                      <p className="text-danger m-0 text-left mt-2">
                        {jobseekerDataErrors?.personalInformation?.dob}
                      </p>
                    ) : null}
                  </div> */}
                  {/* <div className="sm:col-span-1">
                    <label
                      htmlFor="birthDate"
                      className="block text-sm text-start font-semibold leading-6 text-gray-900"
                    >
                      Date of Birth<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        onChange={handleChange}
                        value={jobSeekerData.personalInformation["dob"]}
                        className={`block w-full h-[40px] rounded-md border-0 py-1.5 px-2 text-gray-900 border-2 outline-none ring-[1.5px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1.5px] focus:ring-inset focus:ring-blue-500 sm:text-md sm:leading-6 ${
                          jobseekerDataErrors.personalInformation.dob
                            ? "ring-red-500 focus:ring-red-500"
                            : ""
                        } `}
                        // className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset  sm:max-w-sm sm:text-sm sm:leading-6"
                        placeholder="Pick a date"
                      />
                    </div>
                    {jobseekerDataErrors.personalInformation.dob ? (
                      <p className="text-danger m-0 text-left mt-2">
                        {jobseekerDataErrors.personalInformation.dob}
                      </p>
                    ) : null}
                  </div> */}

                  <div className="sm:col-span-1">
                    <p
                      htmlFor="phone"
                      className="block text-start text-sm font-medium leading-6 text-gray-900"
                    >
                      {/* Phone Number<span className="text-red-500">*</span> */}
                    Phone Number
                    
                    </p>
                    
                    <div className="mt-1">
                      <PhoneInput
                        onChange={handlePhoneChange}
                        value={jobSeekerData?.personalInformation?.phoneNumber}
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        required
                        className={`px-2 w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-white sm:max-w-sm sm:text-sm sm:leading-6 ${
                          jobseekerDataErrors?.personalInformation?.phoneNumber
                            ? "ring-red-500 focus:ring-red-500"
                            : ""
                        } `}
                      />
                       <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
                    </div>
                    {jobseekerDataErrors?.personalInformation?.phoneNumber ? (
                      <p className="text-danger m-0 text-left mt-2">
                        {jobseekerDataErrors?.personalInformation?.phoneNumber}
                      </p>
                    ) : null}
                    
                  </div>
                </div>
                <div className="sm:col-span-full grid grid-cols-1  sm:grid-cols-2 gap-4">
                  <div className="col-span-1 ">
                    <InputField
                      id="email"
                      htmlFor="email"
                      labelText="Email"
                      placeholder="ahmad@gmail.com"
                      type={"email"}
                      handleChange={handleChange}
                      value={jobSeekerData?.personalInformation?.email}
                      required
                      error={jobseekerDataErrors?.personalInformation?.email}
                    />
                     <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
                  </div>

                  <div className="sm:col-span-1 ">
                    <label
                      htmlFor="gender"
                      className="block text-start text-sm font-medium leading-6 text-gray-900"
                    >
                      Gender<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 text-black ">
                      <div className={`flex rounded-sm `}>
                        {genders.map((gender) => (
                          <div className="me-2" key={gender.value}>
                            <input
                              type="radio"
                              id={gender.value}
                              name="gender"
                              onChange={handleChange1}
                              value={gender.value}
                              checked={selectedGender === gender.value}
                            />
                            <label className="ms-1" htmlFor={gender.value}>
                              {gender.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      {jobseekerDataErrors?.personalInformation?.gender ? (
                        <p className="text-danger  m-0 text-left mt-2">
                          {jobseekerDataErrors?.personalInformation?.gender}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-full grid grid-cols-1  sm:grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label
                      htmlFor="education"
                      className="block text-start  text-sm font-medium leading-6 text-gray-900"
                    >
                      Education level<span className="text-red-500">*</span>
                    </label>
                    
                    <div className="mt-2">
                      <select
                        id="educationLevel"
                        name="educationLevel"
                        onChange={(e) => {
                          setJobSeekerData({
                            ...jobSeekerData,
                            educationLevel: e.target.value,
                          });
                        }}
                        value={jobSeekerData?.educationLevel}
                        autoComplete="education"
                        className={`block w-full h-[40px] rounded-md border-0 py-1.5 px-2 text-gray-900 border-2 outline-none ring-[1.5px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1.5px] focus:ring-inset focus:ring-blue-500 sm:text-md sm:leading-6 ${
                          jobseekerDataErrors?.educationLevel
                            ? "ring-red-500 focus:ring-red-500"
                            : ""
                        } `}
                      >
                        <option value="" disabled hidden>
                          Select education level
                        </option>
                        <option>High school</option>
                        <option>Diploma</option>
                        <option>Associate</option>
                        <option>Bachelor's degree</option>
                        <option>Master's degree</option>
                        <option>Phd</option>
                      </select>
                      <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
                    </div>
                    {jobseekerDataErrors?.educationLevel ? (
                      <p className="text-danger m-0 text-left mt-2">
                        {jobseekerDataErrors?.educationLevel}
                      </p>
                    ) : null}
                  </div>

                  <div className="col-span-1">
                    <InputField
                      id="experience"
                      htmlFor="experience"
                      labelText="Experience (In Years)"
                      placeholder="3"
                      type={"number"}
                      handleChange={(e) => {
                        setJobSeekerData({
                          ...jobSeekerData,
                          experience: e.target.value,
                        });
                      }}
                      value={jobSeekerData?.experience}
                      required
                      error={jobseekerDataErrors?.experience}
                      
                    />
                     <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
                  </div>
                  
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="summary"
                    className="block  text-start text-sm font-medium leading-6 text-gray-900"
                  >
                    Summary <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="summary"
                      name="summary"
                      rows={3}
                      onChange={(e) => {
                        setJobSeekerData({
                          ...jobSeekerData,
                          summary: e.target.value,
                        });
                      }}
                      value={jobSeekerData?.summary}
                      placeholder="write about yourself..."
                      className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 border-2 outline-none ring-[1.5px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1.5px] focus:ring-inset focus:ring-blue-500 sm:text-md sm:leading-6 ${
                        jobseekerDataErrors?.summary
                          ? "ring-red-500 focus:ring-red-500"
                          : ""
                      } `}
                      // className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                     <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
                  </div>
                  {jobseekerDataErrors?.summary ? (
                    <p className="text-danger m-0 text-left mt-2">
                      {jobseekerDataErrors?.summary}
                    </p>
                  ) : null}
                </div>

                {/* <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-start  text-sm font-medium leading-6 text-gray-900"
                  >
                    Profile Pic
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {image ? (
                        <img src={image} alt="cover photo" />
                      ) : (
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                      )}
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600  hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            //onChange={(e) => setImage(e.target.value)}
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base text-start  font-semibold leading-7 text-gray-900">
                Location Information
              </h2>
              <p className="mt-1 text-start  text-sm leading-6 text-gray-600">
                Enter the address details here.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                <CountryStateCityDropdown
                  label="Country"
                  name="country"
                  placeholder="Select Country"
                  value={country}
                  required
                  error={jobseekerDataErrors?.personalInformation?.country}
                  type="basic-single"
                  array={countries}
                  handleProficiency={handleCountryChange}
                />
                

                {country ? (
                  <CountryStateCityDropdown
                    label="State"
                    name="state"
                    placeholder="Select state"
                    value={state}
                    required
                    error={jobseekerDataErrors?.personalInformation?.state}
                    type="basic-single"
                    array={states}
                    handleProficiency={handleStateChange}
                  />
                  
                ) : null}

                {state ? (
                  <CountryStateCityDropdown
                    label="City"
                    name="city"
                    placeholder="Select city"
                    value={city}
                    required
                    error={jobseekerDataErrors?.personalInformation?.city}
                    type="basic-single"
                    array={cities}
                    handleProficiency={handleCityChange}
                  />
                ) : null}
                

                <div className="col-span-2">
                  <InputField
                    id="zip"
                    htmlFor="zip"
                    labelText="Zip"
                    placeholder="55120"
                    handleChange={handleChange}
                    value={jobSeekerData?.personalInformation?.zip}
                  />
                   <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
                </div>

                <div className="col-span-full">
                  <InputField
                    id="address"
                    htmlFor="address"
                    labelText="Address"
                    placeholder="House # 1104, M block, LDA Avenue One, near Comsats University Lahore"
                    handleChange={handleChange}
                    value={jobSeekerData?.personalInformation?.address}
                  />
                   <button
                type="button"
                className="microphone-button12 position-relative"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon  " />
              </button>
                </div>
                
              </div>
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PersonalInfo;

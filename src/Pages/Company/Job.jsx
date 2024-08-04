import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useStepperContext } from "../../contexts/StepperContext.jsx";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import "./job.css";
import "react-datepicker/dist/react-datepicker.css";
import InputField from "../components/InputField.jsx";
import MultilineInput from "../components/MultilineInput.jsx";
import DropdownComponent from "../components/DropdownComponent.jsx";
import { useLocation } from "react-router-dom";
import { FaMicrophone ,FaVolumeUp } from "react-icons/fa";
import axios from "axios";
import CountryStateCityDropdown from "../components/DropdownComponent.jsx";
import "react-country-state-city/dist/react-country-state-city.css";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Job() {
  const location = useLocation();
  const editMode = location?.state?.edit;
  const jobData = location?.state?.job;

  const { transcript, resetTranscript } = useSpeechRecognition();

  const [listening, setListening] = useState(false);
  const [fieldToUpdate, setFieldToUpdate] = useState(null);
  const [spokenText, setSpokenText] = useState("");

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
  const navigate = useNavigate();

  const startListening = (field) => {
    setFieldToUpdate(field);
    resetTranscript(); // Reset the transcript
    setSpokenText(""); // Reset the spoken text
    SpeechRecognition.startListening({ continuous: true });
    setListening(true);

    setTimeout(() => {
      SpeechRecognition.stopListening();
      setListening(false);
    }, 30000);
  };
  const {
    jobSeekerData,
    setJobSeekerData,
    jobseekerDataErrors,
    setJobseekerDataErrors,
  } = useStepperContext();

  const handleMicrophoneClick = () => {
    // Logic for microphone button click
    console.log("Microphone clicked");
  };

  useEffect(() => {
    const getCountries = async () => {
      const data = await GetCountries();
      const selectedCountry = data.find(
        (c) => c.name === jobSeekerData?.personalInformation?.country
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

  //fetching states
  useEffect(() => {
    if (selectedCountry) {
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobSeekerData({
      ...jobSeekerData,
    });
  };

  //handling country change
  const handleCountryChange = async (selectedOption) => {
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
    setJob({ ...job, country: selectedOption.label });
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
    setJob({ ...job, state: selectedOption.label });
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
    setJob({ ...job, city: selectedOption.label });
  };

  const validateAndUpdateField = (field, value) => {
    let isValid = true;
    let formattedValue = value;

    switch (field) {
      case "positions":
      case "experience":
      case "salary":
        formattedValue = parseInt(value, 10);
        if (isNaN(formattedValue)) isValid = false;
        break;
      case "startDate":
      case "endDate":
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) isValid = false;
        break;
      default:
        break;
    }

    if (isValid) {
      setJob((prevJob) => ({
        ...prevJob,
        [field]: formattedValue,
      }));
    }
  };

  useEffect(() => {
    if (listening && transcript !== spokenText) {
      setSpokenText(transcript);
      validateAndUpdateField(fieldToUpdate, transcript);
    }
  }, [listening, transcript, fieldToUpdate, spokenText]);

  const [job, setJob] = useState({
    title: "",
    companyName: "",
    description: "",
    type: "",
    positions: 0,
    startDate: "",
    endDate: "",
    country: "",
    state: "",
    city: "",
    education: "",
    industry: "",
    experience: "",
    skills: [],
    category: "",
    zip: "",

    salary: "",
  });

  const [error, setError] = useState({
    title: "",
    companyName: "",
    description: "",
    type: "",
    positions: "",
    startDate: "",
    endDate: "",
    education: "",
    industry: "",
    experience: 0,
    skills: [],
    category: "",
    zip: "",

    salary: "",
  });

  const validateJob = () => {
    let isValid = true;
    const newError = {
      title: "",
      description: "",
      type: "",
      positions: "",
      startDate: "",
      endDate: "",
      education: "",
      industry: "",
      experience: 0,
      skills: [],
      category: "",
      salary: "",
    };

    if (job.title === "") {
      newError.title = "Please enter job title";
      isValid = false;
    }
    if (job.companyName === "") {
      newError.title = "Please enter Your Company Name";
      isValid = false;
    }
    if (job.description === "") {
      newError.description = "Please enter job description";
      isValid = false;
    }
    if (job.type === "") {
      newError.type = "Please select job type";
      isValid = false;
    }
    if (job.positions === 0) {
      newError.positions = "Please select number of positions";
      isValid = false;
    }
    if (job.education === "") {
      newError.education = "Please select education level";
      isValid = false;
    }
    if (job.experience < 0) {
      newError.experience = "Please select experience level";
      isValid = false;
    }
    if (job.startDate === "") {
      newError.startDate = "Please select application start date";
      isValid = false;
    }
    if (job.endDate === "") {
      newError.endDate = "Please select application end date";
      isValid = false;
    }
    if (job.industry === "") {
      newError.industry = "Please select industry";
      isValid = false;
    }
    if (job?.skills?.length === 0) {
      newError.skills = "Please select at least one skill";
      isValid = false;
    }
    if (job?.salary === 0) {
      newError.salary = "Please enter salary amount";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const token = localStorage.getItem("token");

  const handlePost = async (e) => {
    e.preventDefault();
    if (validateJob()) {
      if (!token) {
        console.error("No token found");
        toast.error("Authentication token is missing");
        return;
      }
      console.log(token);
  
      axios
        .post(
          "https://smartjobseeker-fe218b533e4f.herokuapp.com/api/job/jobPost",
          { job },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log('Success:', response.data);
          toast.success(response.data.message || "Job added successfully");
  
          // Navigate to the company profile form page after a short delay to allow the toast to be displayed
          setTimeout(() => {
            navigate('/CompanyDashboard');
          }, 2000); // Adjust the delay time as needed
        })
        .catch((error) => {
          console.error("Error posting job:", error);
          toast.error(error.response?.data?.message || "An error occurred while posting the job.");
        });
    }
  };
  useEffect(() => {
    if (jobData) {
      setJob(jobData);
    }
  }, [editMode, jobData]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col flex-grow">
        <div className="job-form py-10" style={{ marginTop: "-17px" }}>
          <form>
            <div className="space-y-8">
              <div className=" pb-12">
                <h2 className="text-base text-start text-lg font-semibold leading-7 text-gray-900">
                  Job Post
                </h2>
                <p className="text-sm text-start leading-6 text-gray-600">
                  This data will be displayed publicly so be careful what you
                  share. <br /> یہ ڈیٹا عوامی طور پر ظاہر کیا جائے گا لہذا محتاط
                  رہیں کہ آپ کیا شیئر کرتے ہیں۔
                </p>

                <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                  <div className="sm:col-span-4 relative inputMic">
                  <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                    <InputField
                      id="title"
                      htmlFor="title"
                      labelText="Job title &nbsp; ملازمت کا عہدہ"
                      placeholder="React developer"
                      handleChange={(e) => {
                        setJob({ ...job, title: e.target.value });
                      }}
                      value={job.title}
                      required={true}
                      error={error.title}
                    />
                  
                    <button
                      type="button"
                      className="microphone-button11"
                      onClick={() => startListening("title")}
                    >
                      <FaMicrophone className="microphone-icon11" />
                    </button>
                    {/* <FontAwesomeIcon icon={faVolumeUp} className="input-icon" /> */}
                  </div>

                  <div className="sm:col-span-4 relative inputMic">
                  <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                    <InputField
                      id="companyName"
                      htmlFor="companyName"
                      labelText="Company Name &nbsp; کمپنی کا نام"
                      placeholder="Enter Company Name"
                      handleChange={(e) => {
                        setJob({ ...job, companyName: e.target.value });
                      }}
                      value={job.companyName}
                      required={true}
                      error={error.companyName}
                    />
                    <button
                      type="button"
                      className="microphone-button11"
                      onClick={() => startListening("companyName")}
                    >
                      <FaMicrophone className="microphone-icon11" />
                    </button>
                  </div>

                  <div className="col-span-full relative ">
                  <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                    <MultilineInput
                      id="description"
                      heading="Job descriptions &nbsp;  کام کی تفصیلات "
                      placeholder="write job description..."
                      handleTextChange={(e) => {
                        setJob({ ...job, description: e.target.value });
                      }}
                      value={job.description}
                      required={true}
                      error={error.description}
                    />
                    <button
                      type="button"
                      className="microphone-button11"
                      onClick={() => startListening("description")}
                    >
                      <FaMicrophone className="microphone-icon11" />
                    </button>
                  </div>

                  <div className="sm:col-span-3">
                  <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                    <DropdownComponent
                      id="type"
                      label="Job type &nbsp;  ملازمت کی قسم"
                      placeholder={"Select job type"}
                      array={[
                        { label: "Full time", value: "Full time" },
                        { label: "Part time", value: "Part time" },
                        { label: "Contract", value: "Contract" },
                        { label: "Temporary", value: "Temporary" },
                        { label: "Internship", value: "Internship" },
                      ]}
                      handleProficiency={(e) => {
                        setJob({ ...job, type: e.value });
                      }}
                      value={
                        editMode
                          ? { label: jobData?.type, value: jobData?.type }
                          : job.type
                      }
                      required={true}
                      error={error.type}
                      isMulti={false}
                    />
                  </div>

                  <div className="sm:col-span-3 relative">
                  <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                    <InputField
                      id="positions"
                      htmlFor="positions"
                      labelText="No of positions &nbsp;   ملازمت کی تعداد"
                      type={"number"}
                      placeholder="5"
                      handleChange={(e) => {
                        setJob({ ...job, positions: e.target.value });
                      }}
                      value={job.positions}
                      required={true}
                      error={error.positions}
                    />
                    <button
                      type="button"
                      className="microphone-button11"
                      onClick={() => startListening("positions")}
                    >
                      <FaMicrophone className="microphone-icon11" />
                    </button>
                  </div>

                  <div className="sm:col-span-3">
                  <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                    <DropdownComponent
                      id="education"
                      label="Education &nbsp;  تعلیم"
                      placeholder={"Select education"}
                      array={[
                        { label: "High School", value: "High School" },
                        { label: "Bachelors", value: "Bachelors" },
                        { label: "Masters", value: "Masters" },
                        { label: "PhD", value: "PhD" },
                      ]}
                      handleProficiency={(e) => {
                        setJob({
                          ...job,
                          education: e.value,
                        });
                      }}
                      value={
                        editMode
                          ? {
                              label: jobData?.education,
                              value: jobData?.education,
                            }
                          : job.education
                      }
                      required={true}
                      error={error.education}
                      isMulti={false}
                    />
                  </div>

                  <div className="sm:col-span-3 relative">
                  <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                    <InputField
                      id="experience"
                      htmlFor="experience"
                      labelText="Experience &nbsp; تجربہ"
                      placeholder="2 years"
                      type={"number"}
                      handleChange={(e) => {
                        setJob({
                          ...job,
                          experience: e.target.value,
                        });
                      }}
                      value={job?.experience}
                      required={true}
                      error={error?.experience}
                    />
                    {/* <button
                      type="button"
                      className="microphone-button11"
                      onClick={() => startListening("experience")}
                    >
                      <FaMicrophone className="microphone-icon" />
                    </button> */}
                  </div>

                  <div className="sm:col-span-3">
                  <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                    <DropdownComponent
                      id="industry"
                      label="Industry  &nbsp;  صنعت"
                      placeholder={"Select industry"}
                      array={[
                        {
                          label: "Software Development",
                          value: "Software Development",
                        },
                        { label: "Healthcare", value: "Healthcare" },
                        { label: "Finance", value: "Finance" },
                        { label: "Education", value: "Education" },
                        { label: "Manufacturing", value: "Manufacturing" },
                      ]}
                      handleProficiency={(e) => {
                        setJob({
                          ...job,
                          industry: e.value,
                        });
                      }}
                      value={
                        editMode
                          ? {
                              label: jobData?.industry,
                              value: jobData?.industry,
                            }
                          : job.industry
                      }
                      required={true}
                      error={error.industry}
                      isMulti={false}
                    />
                  </div>

                  <div className="sm:col-span-3">
                  <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                    <DropdownComponent
                      id="skills"
                      label="Skills &nbsp; ہنر"
                      placeholder={"Select skills"}
                      array={[
                        { label: "React", value: "React" },
                        { label: "Node.js", value: "Node.js" },
                        { label: "Python", value: "Python" },
                        { label: "Django", value: "Django" },
                        {
                          label: "Project Management",
                          value: "Project Management",
                        },
                        { label: "Leadership", value: "Leadership" },
                      ]}
                      handleProficiency={(e) => {
                        setJob({
                          ...job,
                          skills: e.map((skill) => skill.value),
                        });
                      }}
                      value={
                        editMode
                          ? jobData?.skills.map((skill) => ({
                              label: skill,
                              value: skill,
                            }))
                          : job.skills.map((skill) => ({
                              label: skill,
                              value: skill,
                            }))
                      }
                      required={true}
                      error={error.skills}
                      isMulti={true}
                    />
                  </div>

                  <div className="sm:col-span-3 relative">
                  <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                    <InputField
                      id="salary"
                      htmlFor="salary "
                      labelText="Salary &nbsp; تنخواہ"
                      placeholder="50000"
                      type={"number"}
                      handleChange={(e) => {
                        setJob({
                          ...job,
                          salary: e.target.value,
                        });
                      }}
                      value={job?.salary}
                      required={true}
                      error={error.salary}
                    />
                    <button
                      type="button"
                      className="microphone-button11"
                      onClick={() => startListening("salary")}
                    >
                      <FaMicrophone className="microphone-icon" />
                    </button>
                  </div>

                  <div className="sm:col-span-3 relative">
                  <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                    <InputField
                      id="startDate"
                      htmlFor="startDate"
                      labelText="Start Date &nbsp;    شروع کرنے کی تاریخ"
                      placeholder="YYYY-MM-DD"
                      type="date"
                      handleChange={(e) => {
                        setJob({ ...job, startDate: e.target.value });
                      }}
                      value={job.startDate}
                      required={true}
                      error={error.startDate}
                    />
                  </div>

                  <div className="sm:col-span-3 relative">
                  <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                    <InputField
                      id="endDate"
                      htmlFor="endDate "
                      labelText="End Date   &nbsp;  آخری تاریخ"
                      placeholder="YYYY-MM-DD"
                      type="date"
                      handleChange={(e) => {
                        setJob({ ...job, endDate: e.target.value });
                      }}
                      value={job.endDate}
                      required={true}
                      error={error.endDate}
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
              <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                  
                  <CountryStateCityDropdown 
                    label="Country &nbsp; ملک "
                    name="country"
                    placeholder="Select Country"
                    value={country}
                    required
                    error={jobseekerDataErrors?.personalInformation?.country}
                    type="basic-single"
                    array={countries}
                    
                    handleProficiency={handleCountryChange}
                  />
                  

                  {states.length > 0 && (
                    
                    <CountryStateCityDropdown
                      label="State &nbsp; صوبہ "
                      name="state"
                      placeholder="Select state"
                      value={state}
                      required
                      error={jobseekerDataErrors?.personalInformation?.state}
                      type="basic-single"
                      array={states}
                      handleProficiency={handleStateChange}
                    />
                  )}

                  {cities.length > 0 && (
                    <CountryStateCityDropdown
                      label="City &nbsp; شہر "
                      name="city"
                      placeholder="Select city"
                      value={city}
                      required
                      error={jobseekerDataErrors?.personalInformation?.city}
                      type="basic-single"
                      array={cities}
                      handleProficiency={handleCityChange}
                    />
                  )}

                  <div className="col-span-2">
                  <button
                      type="button"
                      // onClick={handleSpeakClick}
                      className="inline-flex items-center ml-2 text-black"
                    >
                      <FaVolumeUp />
                    </button>
                    <InputField
                      id="zip"
                      name="zip "
                      htmlFor="zip"
                      labelText="Zip &nbsp; ڈاک کامخصوص نمبر"
                      placeholder="55120"
                      value={job.value}
                      handleChange={(e) => {
                        setJob({ ...job, zip: e.target.value });
                      }}
                      // value={jobSeekerData?.personalInformation?.zip}
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

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePost}
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

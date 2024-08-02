import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { FaMicrophone } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { select } from "@material-tailwind/react";

const JobSeekerForm = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [listening, setListening] = useState(false);
  const [fieldToUpdate, setFieldToUpdate] = useState(null);
  const [spokenText, setSpokenText] = useState("");
  const navigate = useNavigate();

  const validateAndUpdateField = (field, value) => {
    let isValid = true;
    let formattedValue = value;

    switch (field) {
      case "name":
      case "email":
      case "salary":
        formattedValue = parseInt(value, 10);
        if (isNaN(formattedValue)) isValid = false;
        break;
      case "dob":
      case "availableTill":
      case "availableFrom":
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
      setFormData((formData) => ({
        ...formData,
        [fieldToUpdate]: transcript,
      }));
    }
  }, [listening, transcript, fieldToUpdate, spokenText]);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    address: "",
    country: "",
    state: "",
    city: "",

    education: [],
    experience: [],
    skills: [],
    summary: "",
    profilePicture: null,
    hobby: [],
    projects: [],
    cnicNo: "",
    currentJob: "",
    dob: "",
    gender: "",
    expectedSalary: "",
    degreeLevel: "",
    industry: "",
    timeExchangeDescription: "",
    availableFrom: "",
    availableTill: "",
  });

  const handleSpeakerClick = () => {
    // Implement your logic here, for example, playing audio or toggling speaker state
    console.log("Speaker button clicked");
    // Example: You can toggle speaker on/off, play audio, etc.
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log({ file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setFormData({
      ...formData,
      profilePicture: file,
    });
  };

  // const handleMicroPhone() => {
  //    // Logic for microphone button click
  //    console.log("Microphone clicked");
  //  };

  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handling array fields
    if (
      name === "hobby" ||
      name === "education" ||
      name === "experience" ||
      name === "skills" ||
      name === "projects"
    ) {
      setFormData({
        ...formData,
        [name]: value.split(",").map((item) => item.trim()), // Split by comma and trim each item
      });
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    let validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "profilePicture") {
        validationErrors[key] = "This field is required";
      }
    });
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData1 = new FormData();
  
    // Add single value fields directly
    const singleFields = [
      "name", "address", "city", "cnicNo", "currentJob", "degreeLevel", 
      "country", "dob", "email", "expectedSalary", "gender", 
      "industry", "phoneNo", "state", "summary", 
      "timeExchangeDescription", "profilePicture", 
      "availableTill", "availableFrom"
    ];
  
    singleFields.forEach(field => {
      formData1.append(field, formData[field]);
    });
  
    // Add array fields
    const arrayFields = ["skills", "hobby", "education", "experience", "projects"];
    arrayFields.forEach(field => {
      formData[field].forEach(item => {
        formData1.append(field, item);
      });
    });
  
    try {
      const response = await axios.post(
        "http://localhost:7000/api/user/updateCompanyProfile",
        formData1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response);
  
      if (response.data.message === "Profile updated successfully") {
        // Show toast message
        toast.success("Profile updated successfully");
  
        // Navigate to "/JobSeekerProfile"
        navigate("/JobSeekerProfile");
      } else {
        // Handle other responses if needed
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
    }
  };

  

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    maxWidth: "950px",
    margin: "0 auto",

    backgroundColor: "#f9f9f9",
  };

  const sectionStyles = {
    width: "800px",
    marginBottom: "20px",
    padding: "20px",
    color: "black",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
  };

  const sectionHeadingStyles = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const rowStyles = {
    display: "flex",
    width: "100%",
    gap: "20px",
    marginBottom: "20px",
  };

  const columnStyles = {
    display: "flex",
    flexDirection: "column",
    flex: "1",
  };

  const fullWidthStyles = {
    ...columnStyles,
    width: "100%",
  };

  const labelStyles = {
    marginBottom: "8px",
    fontWeight: "bold",
  };

  const inputStyles = {
    padding: "10px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px",
  };

  const textAreaStyles = {
    ...inputStyles,
    height: "100px",
    resize: "none",
  };

  const errorStyles = {
    color: "red",
    fontSize: "12px",
    marginTop: "-10px",
    marginBottom: "10px",
  };

  const buttonStyles = {
    padding: "10px 20px",
    backgroundColor: "#61dafb",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const buttonHoverStyles = {
    backgroundColor: "#21a1f1",
  };

  const imagePreviewStyles = {
    width: "150px", // Adjust as needed
    height: "150px", // Adjust as needed
    objectFit: "cover",
    borderRadius: "50%", // Make it circular if needed
    border: "2px solid #ddd",
    marginTop: "10px",
  };

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
  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h1
        style={{
          color: "blue",
          fontSize: "28px",
          width: "100%",
          fontWeight: "bold",
          margin: "10px 50px",
          textAlign: "center",
          backgroundColor: "lightgray",
          padding: "10px",

          borderRadius: "8px",
        }}
      >
        Job Seeker Form
      </h1>

      <div style={sectionStyles}>
        <div style={sectionHeadingStyles}>
          Prfofile Picture &nbsp; پروفائل تصویر
          <button
            type="button"
            className="speaker-button"
            onClick={() => handleSpeakerClick()}
            style={{
              marginLeft: "10px",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <FaVolumeUp className="speaker-icon" />
          </button>
        </div>
        <div style={rowStyles}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: "10px" }}
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Profile Preview"
              style={imagePreviewStyles}
            />
          )}
        </div>
      </div>
      <div style={sectionStyles}>
        <div style={sectionHeadingStyles}>
          Personal Information ذاتی معلومات
          <button
            type="button"
            className="speaker-button"
            onClick={() => handleSpeakerClick()}
            style={{
              marginLeft: "10px",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <FaVolumeUp className="speaker-icon" />
          </button>
        </div>
        <div style={rowStyles}>
          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Full Name:&nbsp; پورا نام
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ ...inputStyles, paddingRight: "40px" }}
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("name")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.name && <div style={errorStyles}>{errors.name}</div>}
          </div>

          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Email:&nbsp; ای میل
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{ ...inputStyles, paddingRight: "40px" }}
                required
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("email")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.email && <div style={errorStyles}>{errors.email}</div>}
          </div>
        </div>

        <div style={rowStyles}>
          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              CNIC No:&nbsp; شناختی کارڈ نمبر
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                id="cnicNo"
                type="text"
                name="cnicNo"
                value={formData.cnicNo}
                onChange={handleChange}
                style={{ ...inputStyles, paddingRight: "40px" }}
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("cnicNo")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.cnicNo && <div style={errorStyles}>{errors.cnicNo}</div>}
          </div>

          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Date of Birth:&nbsp; پیدائش کی تاریخ
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={inputStyles}
              />
              {/* <button
              type="button"
              className="microphone-button"
              onClick={()=> startListening("")}
              style={{
               position: 'absolute',
               right: '10px', // Adjust as needed
               top: '50%',
               transform: 'translateY(-50%)',
               // backgroundColor: '#61dafb',
               border: 'none',
               borderRadius: '4px',
               cursor: 'pointer',
               padding: '10px'
             }}            >
              <FaMicrophone className="microphone-icon" />
            </button> */}
            </div>
            {errors.dob && <div style={errorStyles}>{errors.dob}</div>}
          </div>
        </div>

        <div style={rowStyles}>
          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Phone No:&nbsp; فون نمبر
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                id="phoneNo"
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                style={inputStyles}
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("phoneNo")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.phoneNo && <div style={errorStyles}>{errors.phoneNo}</div>}
          </div>

          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Address:&nbsp; پتہ
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={inputStyles}
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("address")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.address && <div style={errorStyles}>{errors.address}</div>}
          </div>
        </div>

        <div style={rowStyles}>
          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              State/Province:&nbsp; ریاست/صوبہ
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                id="state"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={inputStyles}
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("state")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.state && <div style={errorStyles}>{errors.state}</div>}
          </div>

          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              City:&nbsp; شہر
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                style={inputStyles}
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("city")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.city && <div style={errorStyles}>{errors.city}</div>}
          </div>
        </div>

        <div style={rowStyles}>
          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Country:&nbsp; ملک
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                id="country"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                style={inputStyles}
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("country")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.country && <div style={errorStyles}>{errors.country}</div>}
          </div>

          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Hobby: &nbsp; مشغلے
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                id="hobby"
                type="text"
                name="hobby"
                value={formData.hobby.join(", ")}
                onChange={handleChange}
                style={inputStyles}
              />
              <button
                type="button"
                className="microphone-button"
                // onClick={()=> startListening("hobby")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.hobby && <div style={errorStyles}>{errors.hobby}</div>}
          </div>
        </div>

        <div style={rowStyles}>
          <div style={fullWidthStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Gender:&nbsp; صنف
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />{" "}
                Male &nbsp; مرد
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />{" "}
                Female &nbsp; عورت
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                />{" "}
                Other &nbsp; دیگر
              </label>
            </div>
            {errors.gender && <div style={errorStyles}>{errors.gender}</div>}
          </div>
        </div>
      </div>
      <div style={sectionStyles}>
        <div style={sectionHeadingStyles}>
          Time Exchange
          <button
            type="button"
            className="speaker-button"
            onClick={() => handleSpeakerClick()}
            style={{
              marginLeft: "10px",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <FaVolumeUp className="speaker-icon" />
          </button>
        </div>
        <div style={rowStyles}>
          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Time Exchange Description : ٹائم ایکسچینج کی تفصیل
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                id="timeExchangeDescription"
                type="text"
                name="timeExchangeDescription"
                value={formData.timeExchangeDescription}
                onChange={handleChange}
                style={{ ...inputStyles, paddingRight: "40px" }}
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("timeExchangeDescription")}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  backgroundColor: "#f0f0f0", // adjust as needed
                  cursor: "pointer",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.timeExchangeDescription && (
              <div style={errorStyles}>{errors.timeExchangeDescription}</div>
            )}
          </div>
        </div>

        <div style={rowStyles}>
          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Availble from :&nbsp; سے دستیاب
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                id="availableFrom"
                type="date"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                style={{ ...inputStyles, paddingRight: "40px" }}
              />
            </div>
            {errors.availableFrom && (
              <div style={errorStyles}>{errors.availableFrom}</div>
            )}
          </div>

          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Availble Till :&nbsp; تک دستیاب
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                type="date"
                name="availableTill"
                value={formData.availableTill}
                onChange={handleChange}
                style={inputStyles}
              />
            </div>
            {errors.availableTill && (
              <div style={errorStyles}>{errors.availableTill}</div>
            )}
          </div>
        </div>
      </div>

      <div style={sectionStyles}>
        <div style={sectionHeadingStyles}>
          Education Background تعلیمی پس منظر
          <button
            type="button"
            className="speaker-button"
            onClick={() => handleSpeakerClick()}
            style={{
              marginLeft: "10px",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <FaVolumeUp className="speaker-icon" />
          </button>
        </div>

        <div style={rowStyles}>
          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Degree Level:&nbsp; ڈگری کی سطح
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <select
              name="degreeLevel"
              value={formData.degreeLevel}
              onChange={handleChange}
              style={inputStyles}
            >
              <option value="">Select Degree Level</option>
              <option value="High School">High School</option>
              <option value="Associate Degree">Associate Degree</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="Doctorate">Doctorate</option>
            </select>
            {errors.degreeLevel && (
              <div style={errorStyles}>{errors.degreeLevel}</div>
            )}
          </div>

          <div style={columnStyles}>
            <label
              id="degree"
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Degree:&nbsp; ڈگری
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                type="text"
                name="education"
                value={formData.education.join(", ")} // Join the array items for display
                onChange={handleChange}
                style={inputStyles}
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("degree")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.education && (
              <div style={errorStyles}>{errors.education}</div>
            )}
          </div>
        </div>
      </div>

      <div style={sectionStyles}>
        <div style={sectionHeadingStyles}>
          Skills & Experience &nbsp; ہنر اور تجربہ
          <button
            type="button"
            className="speaker-button"
            onClick={() => handleSpeakerClick()}
            style={{
              marginLeft: "10px",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <FaVolumeUp className="speaker-icon" />
          </button>
        </div>
        <div style={rowStyles}>
          <div style={columnStyles}>
            <label style={labelStyles}>
              Industry: &nbsp; صنعت
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                id="industry"
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                style={inputStyles}
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("industry")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.industry && (
              <div style={errorStyles}>{errors.industry}</div>
            )}
          </div>

          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Skills: &nbsp; ہنر
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                type="text"
                name="skills"
                value={formData.skills.join(", ")}
                onChange={handleChange}
                style={inputStyles}
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.skills && <div style={errorStyles}>{errors.skills}</div>}
          </div>
        </div>

        <div style={rowStyles}>
          <div style={columnStyles}>
            <label
              id="currentJob"
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Current Job:&nbsp; موجودہ نوکری{" "}
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                type="text"
                name="currentJob"
                value={formData.currentJob}
                onChange={handleChange}
                style={inputStyles}
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("currentJob")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.currentJob && (
              <div style={errorStyles}>{errors.currentJob}</div>
            )}
          </div>
          <div style={columnStyles}>
            <label
              id="expectedSalary"
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Expacted Salary: &nbsp; متوقع تنخواہ{" "}
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <input
                type="number"
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
                style={inputStyles}
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("expectedSalary")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.expectedSalary && (
              <div style={errorStyles}>{errors.expectedSalary}</div>
            )}
          </div>
        </div>

        <div style={rowStyles}>
          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Projects: &nbsp; پروجیکٹس
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <textarea
                name="projects"
                value={formData.projects.join(", ")}
                onChange={handleChange}
                style={textAreaStyles}
              ></textarea>
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.projects && (
              <div style={errorStyles}>{errors.projects}</div>
            )}
          </div>

          <div style={columnStyles}>
            <label
              style={{ ...labelStyles, display: "flex", alignItems: "center" }}
            >
              Experience: &nbsp;تجربہ{" "}
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleSpeakerClick()}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaVolumeUp className="speaker-icon" />
              </button>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <textarea
                name="experience"
                value={formData.experience.join(", ")}
                onChange={handleChange}
                style={textAreaStyles}
              ></textarea>
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("")}
                style={{
                  position: "absolute",
                  right: "10px", // Adjust as needed
                  top: "50%",
                  transform: "translateY(-50%)",
                  // backgroundColor: '#61dafb',
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            {errors.experience && (
              <div style={errorStyles}>{errors.experience}</div>
            )}
          </div>
        </div>

        <div style={fullWidthStyles}>
          <label
            id="summary"
            style={{ ...labelStyles, display: "flex", alignItems: "center" }}
          >
            Summary: &nbsp; خلاصہ{" "}
            <button
              type="button"
              className="speaker-button"
              onClick={() => handleSpeakerClick()}
              style={{
                marginLeft: "10px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              <FaVolumeUp className="speaker-icon" />
            </button>
          </label>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <button
              type="button"
              className="microphone-button"
              onClick={() => startListening("summary")}
              style={{
                position: "absolute",
                right: "20px", // Adjust as needed
                top: "70px",
                transform: "translateY(-50%)",
                // backgroundColor: '#61dafb',
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              <FaMicrophone className="microphone-icon" />
            </button>
          </div>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            style={textAreaStyles}
          ></textarea>
          {errors.summary && <div style={errorStyles}>{errors.summary}</div>}
        </div>
      </div>

      <button
        type="submit"
        style={buttonStyles}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = buttonStyles.backgroundColor)
        }
      >
        Submit
      </button>
    </form>
  );
};

export default JobSeekerForm;

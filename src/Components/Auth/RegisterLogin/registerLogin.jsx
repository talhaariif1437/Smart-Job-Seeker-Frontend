import { useState, useEffect } from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaMicrophone,
} from "react-icons/fa";
import axios from "axios";
import "./registerLogin.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const RegisterLogin = () => {
  // NLP
  const { transcript, resetTranscript } = useSpeechRecognition(); 
  const [listening, setListening] = useState(false);
  const [fieldToUpdate, setFieldToUpdate] = useState(null);
  const [spokenText, setSpokenText] = useState(""); 
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (listening && transcript !== spokenText) {
      setSpokenText(transcript);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldToUpdate]: transcript,
      }));
    }
  }, [listening, transcript, fieldToUpdate, spokenText]);

  // Other state variables
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState(3);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSignUpMode = () => {
    setIsSignUp(true);
  };

  const handleSignInMode = () => {
    setIsSignUp(false);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setConfirmPasswordError("");
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Password do not match");
      return;
    }

    axios.post("https://smartjobseeker-fe218b533e4f.herokuapp.com/api/auth/signup", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role,
    })
    .then((response) => {
      console.log("Signup success:", response.data);
      setIsSignUp(false);
    })
    .catch((error) => {
      console.error("Signup error:", error);
      toast.error(error.response.data.msg);
    });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    axios.post("https://smartjobseeker-fe218b533e4f.herokuapp.com/api/auth/login", {
      email: formData.email,
      password: formData.password,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.result.token);
      localStorage.setItem("role", response.data.result.role);
      const userString = JSON.stringify(response.data.result.user);
      localStorage.setItem("user", userString);

      let role = response.data.result.role;
      if (role === "1") navigate("/Dashboard");
      else if (role === "2") navigate("/CompanyDashboard");
      else if (role === "3") navigate("/JobSeekerProfile");
      else navigate("/");
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  const startListening = (field) => {
    setFieldToUpdate(field);
    resetTranscript(); 
    setSpokenText(""); 
    SpeechRecognition.startListening({ continuous: true });
    setListening(true);
  
    setTimeout(() => {
      // Save the current transcript in a variable
      const currentTranscript = transcript;
      SpeechRecognition.stopListening();
      setListening(false);
      
      // Check if the current transcript is not empty and update the form data
      if (currentTranscript.trim() !== '') {
        setSpokenText(currentTranscript);
        setFormData((prevFormData) => ({
          ...prevFormData,
          [fieldToUpdate]: currentTranscript,
        }));
      }
    }, 30000);
  };
  

  return (
    <div className={`container_register ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* sign in form */}
          <form
            action="#"
            className="sign-in-form"
            onSubmit={handleSignInSubmit}
          >
            <h2 className="title">Sign in</h2>
            <div className="input-fields">
              <FaUser className="icons" />
              <input
                type="text"
                name="email"
                placeholder="Username/Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("email")}
              >
                <FaMicrophone className="microphone-icon " />
              </button>
            </div>
            <div className="input-fields">
              <FaLock className="icons" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <span
                className="signup_password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("password")}
              >
                <FaMicrophone className="microphone-icon " />
              </button>
            </div>
            <div className="forgot">
              <a href="/forgot" className="forgot_password">
                Forgot Password?
              </a>
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
          <form
            action="#"
            className="sign-up-form"
            onSubmit={handleSignUpSubmit}
          >
            {role === 2 ? <h2 className="title">Company Sign up </h2> : <h2 className="title">Sign up </h2>}
            {confirmPasswordError && (
              <div className="error-signup">{confirmPasswordError}</div>
            )}
            <div className="input-fields">
              <FaUser className="icons" />
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("name")}
              >
                <FaMicrophone className="microphone-icon " />
              </button>
            </div>
            <div className="input-fields">
              <FaEnvelope className="icons" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("email")}
              >
                <FaMicrophone className="microphone-icon " />
              </button>
            </div>
            <div className="input-fields">
              <FaLock className="icons" />
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <span
                className="signup_password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("password")}
              >
                <FaMicrophone className="microphone-icon " />
              </button>
            </div>
            <div className="input-fields">
              <FaLock className="icons" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm-Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                title={
                  confirmPasswordError
                    ? confirmPasswordError
                    : "Confirm password"
                }
              />
              <span
                className="signup_password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <button
                type="button"
                className="microphone-button"
                onClick={() => startListening("confirmPassword")}
              >
                <FaMicrophone className="microphone-icon " />
              </button>
            </div>
            <input type="submit" className="btn " value="Sign up" />
            {role === 3 ? (
              <input
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => setRole(2)}
                type="button"
                className="btn1 text-blue-600 "
                value="Sign up As Company"
              />
            ) : (
              <input
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setRole(3)}
                type="button"
                className="btn1 text-blue-600 "
                value="Sign up As Job Seeker"
              />
            )}
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Lets make your experience memorable!</p>
            <button className="btn transparent" onClick={handleSignUpMode}>
              Sign up
            </button>
          </div>
          <img src="src/assets/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Welcome back! Dive back in and discover even more opportunities
              for growth and connection.
            </p>
            <button className="btn transparent" onClick={handleSignInMode}>
              Sign in
            </button>
          </div>
          <img src="src/assets/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;

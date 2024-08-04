import { useState } from "react";
import { FaLock, FaEnvelope, FaMicrophone } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../ForgotPassword/forgot.css";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log("Form submitted with email and OTP");

    
      const response = await axios.post("https://smartjobseeker-fe218b533e4f.herokuapp.com/api/auth/verifyCode", { email, otp });
      const responseData = response.data;
      console.log(response.data)

      if (responseData.msg === "OTP matched successfully") {
        setMessage("OTP verified successfully.");
        console.log('Verify OTP response:', responseData);
        // Navigate to set new password page after successful OTP verification
        window.location.href = "/SetNewPassword";
      }else{
        toast.error(responseData.msg)
      } 
    };


  const handleMicrophoneClick = () => {
    console.log("Microphone clicked");
  };

  return (
    <div className={`container_forgot ? "forgot-mode" : ""}`}>
      <div className="forgot-container">
        <div className="forgot-forgot">
          <form action="#" className="forgot-form" onSubmit={handleSubmit}>
            <h2 className="forgot-password-title">Verify OTP</h2>
            <div className="forgot-password-input-field">
              <FaEnvelope className="forgot-password-icons" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="button"
                className="microphone-button"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            <div className="forgot-password-input-field">
              <FaLock className="forgot-password-icons" />
              <input
                type="number"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                type="button"
                className="microphone-button"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </div>
            <button type="submit" className="forgot-password-btn">
              <span className="button-link"> 
                VERIFY
              </span> 
            </button>
            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
      <div className="forgot-panels-container">
        <div className="panel-forgot left-forgot-panel">
          <div className="forgot-content">
            <h3>Verify Your OTP!</h3>
            <p>
              No worries! We've got you covered. Verify your OTP to regain
              access to your account.
            </p>
          </div>
          <img src="src/assets/log.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;

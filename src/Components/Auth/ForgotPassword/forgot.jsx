import { useState } from "react";
import { FaEnvelope, FaMicrophone } from "react-icons/fa";
import axios from "axios";
import "./forgot.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log("hhhhhh")
    console.log(email)

    
      const response = await axios.post("http://localhost:7000/api/auth/forgotPassword", {email});
      const responseData = response.data;
      console.log(response.data)

      if (responseData.msg === "Code sent successfully") {
        setMessage("OTP verified successfully.");
        console.log('Forgot password response:', response.data);
        // Navigate to set new password page after successful OTP verification
        window.location.href = "/VerifyOtp";
      }else{
        toast.error(responseData.msg)
      } 
      
     
  };

  const handleMicrophoneClick = () => {
    console.log("Microphone clicked");
  };

  return (
    <div className={`container_forgot  ? "forgot-mode" : ""}`}>
      <div className="forgot-container">
        <div className="forgot-forgot">
          <form action="#" className="forgot-form" onSubmit={handleSubmit}>
            <h2 className="forgot-password-title">Forgot Password</h2>
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
                <FaMicrophone className="microphone-icon " />
              </button>
            </div>
            <button type="submit" className="forgot-password-btn">
              {/* <a href="/Verifyotp" className="button-link">  */}
                Reset
              {/* </a> */}
            </button>
            <div className="back">
              <p>
                Back to<a href="/"> Login</a>
              </p>
            </div>
            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
      <div className="forgot-panels-container">
        <div className="panel-forgot left-forgot-panel">
          <div className="forgot-content">
            <h3>Forgot Your Password?</h3>
            <p>
              No worries! We've got you covered. Reset your password to regain
              access to your account.
            </p>
          </div>
          <img src="src/assets/log.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

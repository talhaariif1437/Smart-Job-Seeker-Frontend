import { useState } from "react";
import {FaEnvelope, FaLock, FaMicrophone } from "react-icons/fa";
import axios from "axios";
import "../ForgotPassword/forgot.css";

const SetNewPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Make API request to set new password
      const response = await axios.post("https://smartjobseeker-fe218b533e4f.herokuapp.com/api/auth/resetPassword", { email,password });
      setMessage("Password updated successfully.");
      console.log('Password update response:', response.data);
      // Redirect to login page after successful password update
      window.location.href = "/Login";
    } catch (error) {
      setMessage("Error updating password. Please try again.");
      console.error('Error during password update:', error.message);
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
            <h2 className="forgot-password-title">Set New Password</h2>
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
                type="password"
                name="setnewpassword"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
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
              <span className="button-link">
                UPDATE PASSWORD
              </span>
            </button>
            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
      <div className="forgot-panels-container">
        <div className="panel-forgot left-forgot-panel">
          <div className="forgot-content">
            <h3>Set Your New Password!</h3>
            <p>
              No worries! We've got you covered. Set Your New Password to regain
              access to your account.
            </p>
          </div>
          <img src="src/assets/log.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;

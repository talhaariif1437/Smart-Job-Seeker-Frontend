import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaMicrophone, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./changePassword.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordMismatch("");
    if (newPassword !== confirmNewPassword) {
      setPasswordMismatch("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('http://localhost:7000/api/auth/changePassword', {
        currentPassword,
        newPassword,
        confirmNewPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log('Password changed successfully:', response.data);
      toast.success('Password changed successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirect after 3 seconds to allow the user to see the success message
    } catch (error) {
      console.error('Error changing password:', error.response?.data || error.message);
      toast.error('Error changing password: ' + (error.response?.data.message || error.message));
    }
  };

  const handleMicrophoneClick = () => {
    console.log("Microphone clicked");
  };

  return (
    <div className={`container_change ? "change-mode" : ""}`}>
      <div className="change-container">
        <div className="change-change">
          <form action="#" className="change-form form1" onSubmit={handleSubmit}>
            <h2 className="title">Change Password</h2>
            {passwordMismatch && (
              <div className="error">{passwordMismatch}</div>
            )}
            <div className="change-input-field">
              <FaLock className="icons" />
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <button
                type="button"
                className="microphone-button"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon " />
              </button>
            </div>
            <div className="change-input-field">
              <FaLock className="icons" />
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <button
                type="button"
                className="microphone-button"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon " />
              </button>
            </div>
            <div className="change-input-field">
              <FaLock className="icons" />
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                placeholder="Confirm Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
              >
                {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <button
                type="button"
                className="microphone-button"
                onClick={handleMicrophoneClick}
              >
                <FaMicrophone className="microphone-icon " />
              </button>
            </div>
            <input
              type="submit"
              className="change-btn"
              value="Change Password"
            />
          </form>
        </div>
      </div>
      <div className="change-panels-container">
        <div className="panel-change left-change-panel">
          <div className="change-content">
            <h3>Ready to Change Your Password?</h3>
            <p>
              Stay ahead of potential security risks by updating your password
              regularly. Protect your account with a strong, updated password.
            </p>
          </div>
          <img src="src/assets/log.svg" className="image" alt="" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;

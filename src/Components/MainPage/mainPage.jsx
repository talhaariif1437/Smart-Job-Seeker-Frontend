import "react";
import PropTypes from "prop-types";
import Navbar from "../../scenes/global/Navbar";
import Appbar from "../../scenes/global/Appbar";
import "./mainPage.css";

const MainPage = ({ children }) => {
  return (
    <div className="maindiv">
      <div className="header">
        <Appbar />
      </div>
      <div className="sidebar">
        <Navbar />
      </div>
      <div className="main">{children}</div>
    </div>
  );
};

MainPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainPage;

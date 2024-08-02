import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Protected = (props) => {
  const { component: Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("login");
    if (!login) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div>
      <Component />
    </div>
  );
};

Protected.propTypes = {
  component: PropTypes.elementType.isRequired, // Validate that component is a valid React element type
};

export default Protected;

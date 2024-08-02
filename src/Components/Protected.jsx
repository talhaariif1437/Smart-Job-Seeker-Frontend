import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let Login = localStorage.getItem("token");
    //     console.log(Login)
    if (!Login) {
      navigate("/Login");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;

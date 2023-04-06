import React, { useState } from "react";
import "./RegisterationForm.css";
import { useNavigate } from "react-router-dom";
import Services from "../../services/http";
import { Alert } from "@mui/material";

const RegisterationForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleOnClick = async () => {
    console.log({ signup });
    if (signup.password !== confirmPassword) {
      setError(true);
      setErrMsg("Password not matching!");
      return;
    }

    try {
      const signUpResp = await Services.signUp(signup);
      console.log({ signUpResp });
      navigate(`/signin`);
    } catch (error) {
      console.log(`signin api error`, error);
      setError(true);
      setErrMsg(error.message);
    }
  };

  const [signup, setSignup] = useState({
    user_name: "",
    user_role: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnChange = (event) => {
    setSignup({ ...signup, [event.target.name]: event.target.value });
  };

  const onCloseHandle = () => {
    setError(false);
  }

  return (
    <>
      {error ? (
        <Alert variant="outlined" severity="error" onClose={onCloseHandle}>
          {errMsg}
        </Alert>
      ) : null}

      <div className="page designer-font">
        <div className="signup-cover">
          <h1>Sign Up</h1>
          <input
            type="text"
            placeholder="username"
            name="user_name"
            value={signup.user_name}
            onChange={handleOnChange}
          />

          <input
            type="text"
            placeholder="userrole"
            name="user_role"
            value={signup.user_role}
            onChange={handleOnChange}
          />

          <input
            type="email"
            placeholder="email"
            name="email"
            value={signup.email}
            onChange={handleOnChange}
          />

          <input
            type="password"
            placeholder="password"
            name="password"
            value={signup.password}
            onChange={handleOnChange}
          />

          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={signup.confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="sign-btn" onClick={handleOnClick}>
            Sign Up
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterationForm;

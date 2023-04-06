import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import Services from "../../services/http";
import { Alert } from "@mui/material";
import jwt from 'jwt-decode';

const LoginForm = () => {
  // const [popupStyle, showPopup] = useState('hide');

  // const popup = () => {
  //     showPopup("login-popup");
  //     setTimeout(() => showPopup("hide"), 3000);
  // }

  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/signup`);
  };

  const onSignIn = async () => {
    try {
      const signinResp = await Services.signin(signin);
      const user = jwt(signinResp.data.data);
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem("token", signinResp.data.data);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log(`signin api error`, error);
      setError(true);
      setErrMsg(error.message);
    }
  };

  const handleOnChange = (event) => {
    setSignin({ ...signin, [event.target.name]: event.target.value });
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
      ) : (
        null
      )}
      
      <div className="page designer-font">
        <div className="cover">
          <h1>Login</h1>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={signin.email}
            onChange={handleOnChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={signin.password}
            onChange={handleOnChange}
          />

          {/* <div className='login-btn' onClick={popup}>Login</div> */}
          <div className="signin-signup-btn">
            <div onClick={onSignIn}>Sign In</div>
            <div onClick={handleOnClick}>Sign Up</div>
          </div>
          {/* <div className='login-btn'>Sign In</div>
      <div className='login-btn' onClick={handleOnClick}>Sign Up</div> */}

          <p className="text">Or login using</p>

          <div className="alt-login">
            <div className="facebook"></div>
            <div className="google"></div>
          </div>

          {/* <div className={popupStyle}>
            <h3>Login Failed</h3>
            <p>Username or password incorrect</p>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default LoginForm;

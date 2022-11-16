import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock
} from "@fortawesome/free-solid-svg-icons";

function LoginBox() {
  const [emailErrMsg, setEmailErrMsg] = useState(false)
  const [passErrMsg, setPassErrMsg] = useState(false)
  const [submitErrMsg, setSubmitErrMsg] = useState(false)
  const [validSubmit, setValidSubmit] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('Login')
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  
  //Redirect to different pages.
  const navigate = useNavigate();

  const updateForm = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      }
      
      //Passes the new input value instead of waiting for next onChange cycle.
      validateForm(newData) 
      return newData
    })
  };

  const validateForm = (input) => {
    const { email, password } = input;

    //Email validation
    if (email.length > 50
        || (email.length > 0 && !isEmail(email))) {
        setEmailErrMsg(true)
        setValidSubmit(true)
      } else {
        setEmailErrMsg(false);
      }

    //Password validation
    if (password !== ""
      && (password.length > 16 || password.length < 4)) {
        setPassErrMsg(true);
        setValidSubmit(true)
      } else {
        setPassErrMsg(false);
      }
      
    //If all requirements are met the submit button is now submitable
    if ((email.length <= 50 && isEmail(email))
      && (password.length < 17 && password.length > 3)) {
      return setValidSubmit(false)
    }
  }

  //Helper function for email validation with Regex.
  function isEmail(val) {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(val)
  }

  
  const handleSubmit = async(e) => {
    e.preventDefault()
    const { email, password } = loginForm

    /* Checks if all input fields are filled*/
    if (!email) { setEmailErrMsg(true) } 
    if (!password) { setPassErrMsg(true) } 

    if (passErrMsg || emailErrMsg || !email || !password) {
      return setValidSubmit(true)
    } 

    setSubmitErrMsg(false)

    try {
      setSubmitStatus('Loading..')
      setValidSubmit(true)

      //Sends a form obj in axios to endpoint
      const formData = new FormData()
      formData.append("email", email)
      formData.append("password", password)

      const { data } = await axios({
        url: "http://dev.rapptrlabs.com/Tests/scripts/user-login.php",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      //Stores logedin user data to Local Storage
      localStorage.setItem("userData", JSON.stringify(data));
      navigate("/homepage"); //Redirects to homepage
      
    } catch (error) {
      setSubmitErrMsg(true)
      setSubmitStatus('Login')
      setValidSubmit(false)
      console.log(error);
    }
  }

  return (
    <div className="login-box">
      <h1 className="login-title">Rapptr Labs</h1>
      <p className="login-subtitle">
        Building world-class apps & mobile experiences.
      </p>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-wrapper">
          <label htmlFor="email">
            <input
              type="email"
              className="login-input"
              placeholder="user@rapptrlabs.com"
              name="email"
              onChange={updateForm}
              value={loginForm.email}
              style={emailErrMsg ? { borderColor: "#da0000" } : {}}
            />
            <FontAwesomeIcon icon={faUser} className="login-icon" />
            <span className="email-label">Email</span>
          </label>
          {emailErrMsg && (
            <p className="input-error">Please enter a valid email address</p>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">
            <input
              type="password"
              className="login-input"
              placeholder="Must be at least 4 characters"
              name="password"
              onChange={updateForm}
              value={loginForm.password}
              style={passErrMsg ? { borderColor: "#da0000" } : {}}
            />
            <FontAwesomeIcon icon={faLock} className="login-icon" />
            <span className="password-label">Password</span>
          </label>
          {passErrMsg && (
            <p className="input-error">
              Password must be between 4-16 characters
            </p>
          )}
        </div>

        <button
          className="login-submit-btn"
          style={validSubmit
              ? {
                  opacity: "0.5",
                  pointerEvents: "none",
                }
              : {
                opacity: "1",
                pointerEvents: "all"
              }
          }>
          {submitStatus}
        </button>
        {submitErrMsg && (
          <p className="input-error-submit">
            Invalid account credentials
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginBox
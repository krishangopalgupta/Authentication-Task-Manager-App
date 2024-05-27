import React, { useState } from "react";
import "../Styles/Signup.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const url = "https://w3viilaassignment-7.onrender.com";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setUsernameError(false);
    setPasswordError(false);

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    try {
      const response = await Axios.post(`${url}/auth/login`, {
        username,
        password,
      });

      if (response.data.status) {
        navigate("/tasks");
      } else {
        setUsernameError(true);
        setPasswordError(true);
        usernameInput.setCustomValidity("Invalid username or password.");
        passwordInput.setCustomValidity("Invalid username or password.");
      }
    } catch (error) {
      setUsernameError(true);
      setPasswordError(true);
      usernameInput.setCustomValidity("Invalid username or password.");
      passwordInput.setCustomValidity("Invalid username or password.");
      console.log(error);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    e.target.setCustomValidity(""); // Reset custom validity on input change
  };

  return (
    <div className="form-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          className={usernameError ? "error" : ""}
          placeholder="Username"
          value={username}
          onChange={handleInputChange(setUsername)}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          className={passwordError ? "error" : ""}
          placeholder="******"
          value={password}
          onChange={handleInputChange(setPassword)}
          autoComplete="off"
          required
        />

        <button type="submit">Login</button>
        <p>
          Don't Have an Account? <Link to="/">signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

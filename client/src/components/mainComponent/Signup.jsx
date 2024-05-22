import React, { useState } from "react";
import "../Styles/Signup.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// const url = 'https://w3viilaassignment-5.onrender.com'
const url = 'http://localhost:3000';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Axios.post(`${url}/auth`, {
    Axios.post(`${url}/auth`, {
      username,
      email,
      password,
    })
      .then((response) => {
        console.log(response);

        // Login Navigation
        if (response.data.status) {
          navigate("/tasks");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="form-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
        <p>
          Have an Account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

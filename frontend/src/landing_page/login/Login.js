import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig";

import { AuthContext } from "../../context/AuthContext"; 


import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const { data } = await axios.post(
      //   "http://localhost:3002/login",
      //   {
      //     ...inputValue,
      //   },
      //   { withCredentials: true }
      // );
      const { data } = await axios.post("/login", inputValue, { withCredentials: true });


      console.log(data);
      const { success, message } = data;
      if (success) {
  setIsLoggedIn(true);
  setUser(data.user);
  handleSuccess(message); // shows Welcome toast
  setTimeout(() => navigate("/"), 1500);
} else {
  handleError(message);
}
    } catch (error) {
  if (error.response && error.response.data && error.response.data.message) {
    handleError(error.response.data.message);
  } else {
    handleError("Something went wrong. Try again.");
  }
}
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="form_wrapper">
      <div className="form_container">
        <h2>Login Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Submit</button>
          <span>
            Already have an account? <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;

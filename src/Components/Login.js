import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckAuth from "../Reducers/CheckAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Error ,Success } from "../Reducers/ErrorPops";
const Errshow = (value) => Error(value);
const SuccessShow = (value) => Success(value);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  let ifAuthTrue = async () => {
    let user;
    if (auth) {
      user = await CheckAuth(auth);
    } else {
      return "";
    }
    if (auth === user._id) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    ifAuthTrue();
  });
  const PostUsersData = async () => {
    if (!email && !password) {
      return Errshow("Email and Password are Required !");
    }
    else if(!email){
      return Errshow("Email is Required to Login !")
    }
    else if(!password){
      return Errshow("Password is Required to Login !")
    }
      const data = await fetch(
        "https://shopykit-back-end.onrender.com/shopykit/api/v1/user-details"
      );
      const response = await data.json();
      const getUser = await response.filter((each) => {
        return each.email === email;
      });
      if(getUser.length === 0){
        navigate("/signup");
        return setTimeout(()=>Errshow("You don't have account with this email. Please Register Here !"),100)
      }
    let user = await fetch("https://shopykit-back-end.onrender.com/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json",
      },
    });

    user = await user.json();
    if (user.result === "success") {
      setTimeout(() => SuccessShow("Your Login Successfully !"), 100);
      const data = await fetch(
        "https://shopykit-back-end.onrender.com/shopykit/api/v1/user-details"
      );
      const response = await data.json();
      const getUser = await response.filter((each) => {
        return each.email === email;
      });
      localStorage.setItem("user", getUser[0]._id);
      navigate("/");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="login-main-container">
      <h3>
        Welcome Back to Shopy
        <span style={{ color: "red", fontSize: "1.8rem" }}>K</span>it's
      </h3>
      <div className="login-form-container">
        <img
          src="/other-images/login-user.png"
          width={"45%"}
          style={{ margin: "0rem 26%" }}
          alt="img"
        />
        <div className="form">
          <label>Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={PostUsersData}>Login</button>
        </div>
      </div>
      <p style={{ color: "black" }} className="signin-dont-have-acc">
        I Don't have an Account ? Please SignUp here{" "}
        <Link to="/signup">Register</Link>
      </p>
      <div className="">
        <ToastContainer
          className="foo"
          style={{ minWidth: "30%", marginTop: "3rem" }}
        />
      </div>
    </div>
  );
}

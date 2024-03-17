import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckAuth from "../Reducers/CheckAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Error , Success} from "../Reducers/ErrorPops";
const Errshow = (value) => Error(value);
const SuccessShow = (value) => Success(value);

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const PostUsersData = async (e) => {
    e.preventDefault();
    if (!name) {
      return Errshow("Name is Required !");
    } else if (!email) {
      return Errshow("Email is Required !");
    } else if (!password) {
      return Errshow("Password is Required !");
    } else if (!confirmPassword) {
      return Errshow("Confirm Password is Required !");
    }
    else if(password.length<8){
      return Errshow("Password Length should be 8 or More Charecters !")
    }
    else if (password !== confirmPassword) {
      return Errshow("Password and ConfirmPassword Do Not Match !");
    }
     const data = await fetch(
       "https://shopykit-back-end.onrender.com/shopykit/api/v1/user-details"
     );
     const response = await data.json();
     const getUser = await response.filter((each) => {
       return each.email === email;
     });
     if (getUser.length === 1) {
       return Errshow(
             "You have account with this email. Please Login !")
     }
    const checkRegistration = await fetch(
      "https://shopykit-back-end.onrender.com/shopykit/api/v1/user-details",
      {
        method: "post",
        body: JSON.stringify({ name, email, password, confirmPassword }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if(checkRegistration.status===200){
      navigate("/login");
      setTimeout(() => SuccessShow("Your Account Created Successfully !"), 100);
    }
    else{
      return Errshow("Registration Failed. Try Again !")
    }
  };

  return (
    <div className="signup-main-container">
      <div className="signup-container">
        <h2 className="text-center">
          Welcome to Shopy
          <span style={{ color: "red", fontSize: "1.8rem" }}>K</span>it
        </h2>
        <h6 className="text-center">We bring e-commerce to your doorstep</h6>
        <div className="form">
          <label>Name : </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email : </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password : </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password : </label>
          <input
            type="password"
            name="confirmPass"
            placeholder="Enter Your Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <p>Agree to ShopyKit's Conditions and Privacy Notice.</p>

          <input type="submit" onClick={PostUsersData} />

          <hr></hr>
        </div>
        <div className="text-center">
          <p>
            Already Have an Account ? please Login Here{" "}
            <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
      <div className="">
        <ToastContainer
          className="foo"
          style={{ minWidth: "30%", marginTop: "3rem" }}
        />
      </div>
    </div>
  );
}

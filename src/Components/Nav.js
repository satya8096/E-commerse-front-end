import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import CheckAuth from '../Reducers/CheckAuth';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  Success } from "../Reducers/ErrorPops";
const SuccessShow = (value) => Success(value);

export default function Nav() {
  let auth = localStorage.getItem("user");

  const [admin, setAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isAdmin = async () => {
    const user = await CheckAuth(auth);
    if (
      user.email ===
      "kattasatyanarayana2003@gmail.com"
    ) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  };
  useEffect(() => {
    if(auth){
      isAdmin();
    }
  });

  const logout = () => {
    localStorage.clear();
    setAdmin(false)
     let countEle = document.getElementById("cart-count");
     countEle.innerHTML = 0;
    navigate("/login");
    return setTimeout(() => SuccessShow("You are Logout Successfully !"), 100);
  };

  const navOpen = () => {
    document.querySelector("nav").style.scale = 1;
    setIsOpen(true);
  };

  const navClose = () => {
    document.querySelector("nav").style.scale = 0;
    setIsOpen(false)
  };
  return (
    <div className="d-flex align-items center justify-content-center nav-main-header">
      <header className="d-flex align-items-center justify-content-between">
        <h4 style={{ color: "white" }}>
          Shopy<span style={{ color: "red", fontSize: "1.8rem" }}>K</span>it
        </h4>
        <nav>
          <NavLink className="text-decoration-none text-center" to={"/"}>
            Home
          </NavLink>
          <NavLink className="text-decoration-none" to={"/men"}>
            Men
          </NavLink>
          <NavLink className="text-decoration-none" to={"/women"}>
            Women
          </NavLink>
          <NavLink className="text-decoration-none" to={"/kids"}>
            Kids
          </NavLink>
          <NavLink className="text-decoration-none" to={"/kitchen"}>
            Home&Kitchen
          </NavLink>
          <span className="dropdown text-decoration-none" to={""}>
            <Link
              className="dropdown-toggle text-decoration-none"
              data-bs-toggle="dropdown"
              to={""}
            >
              Other
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={"/bag"}>
                  Link 1
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={"/"}>
                  Link 2
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={"/"}>
                  Link 3
                </Link>
              </li>
            </ul>
          </span>
          <NavLink className="text-decoration-none" to={"/order"}>
            Order
          </NavLink>
          {admin && (
            <NavLink
              className="text-decoration-none"
              to={"/shopykit/admin/dashboard"}
            >
              Dashboard
            </NavLink>
          )}
          <Link className="text-decoration-none" to={"/bag"}>
            <i className="fa-solid fa-bag-shopping me-2"></i>
            Bag{" "}
            <span className="badge text-white p3 bg-primary" id="cart-count">
              0
            </span>
          </Link>
          {auth ? (
            <Link
              className="text-decoration-none text-white"
              to={"/login"}
              onClick={logout}
            >
              <i className="fa-solid fa-power-off"></i> Logout
            </Link>
          ) : (
            <Link className="text-decoration-none" to={"/signup"}>
              <i className="fa-solid fa-user me-2"></i>
              SignUp
            </Link>
          )}
        </nav>
        <div className="nav-bar-icon" id="nav-bar-icon">
          {isOpen ? (
            <i className="fa-solid fa-square-xmark" onClick={navClose}></i>
          ) : (
            <i
              className="fa-solid fa-bars nav-bar-icon"
              id="bar-icon"
              onClick={navOpen}
            ></i>
          )}
        </div>
      </header>
      <div className="">
        <ToastContainer
          className="foo"
          style={{ minWidth: "30%", marginTop: "3rem" }}
        />
      </div>
    </div>
  );
}

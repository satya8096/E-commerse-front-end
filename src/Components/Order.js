import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartLength from "../Reducers/CartLenght";

export default function Order() {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/login");
    }
    if (localStorage.getItem("user")) {
      CartLength();
    }
  });
  return (
    <div className="d-flex align-items-center justify-content-center order-main-container">
      <img
        src={
          "https://img.freepik.com/free-vector/coming-soon-background-memphis-style_1017-39370.jpg?t=st=1710505397~exp=1710508997~hmac=a03b90ef919c5e11d8d9b5be1ee34f4421042def34ebd1709648b9b3329a5267&w=826"
        }
        alt="img" width={"30%"}
      />
    </div>
  );
}

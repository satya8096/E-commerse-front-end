import React,{useEffect,useState} from "react";
import { Link , Outlet,useNavigate} from "react-router-dom";
import CheckAuth from "../Reducers/CheckAuth";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [isOpen,setIsOpen] = useState(false)
     let auth = localStorage.getItem("user");

     const isAdmin = async () => {
      const user = await CheckAuth(auth);
       if (user.email !== "kattasatyanarayana2003@gmail.com" || !auth || !user) {
         navigate("/");
       }
     };
     useEffect(() => {
      if(auth){
         isAdmin();
      }
      else{
        navigate("/")
      }
     });

     const dashboardClose = ()=>{
      document.getElementById("dashboard-options").style.height = "25vh";
      setIsOpen(false)
     }
     const dashboardOpen = ()=>{
      document.getElementById("dashboard-options").style.height = "70vh";
      setIsOpen(true)
     }
  return (
    <div className="admin-dash-main-container">
      <div className="dashboard-options" id="dashboard-options">
        <h3 className="text-center">Dashboard</h3>
        {isOpen ? (
          <i
            className="fa-solid fa-angles-up"
            id="dashboard-up-arrow"
            onClick={dashboardClose}
          ></i>
        ) : (
          <i
            className="fa-solid fa-angles-down"
            id="dashboard-down-arrow"
            onClick={dashboardOpen}
          ></i>
        )}
        <div className="">
          <Link to={"/shopykit/admin/dashboard/"}>
            {" "}
            <i className="fa-solid fa-house"></i> Home
          </Link>
          <Link to={"/shopykit/admin/dashboard/add-products"}>
            {" "}
            <i className="fa-solid fa-plus"></i> Add Products
          </Link>
          <Link to={"/shopykit/admin/dashboard/"}>
            {" "}
            <i className="fa-solid fa-clipboard-list"></i> Enquiries
          </Link>
          <Link to={"/shopykit/admin/dashboard/"}>
             <i className="fa-solid fa-power-off"></i> Sign Out
          </Link>
        </div>
      </div>
      <div className="text-center admin-welcome-msg">
        <div>
          <h2 className="">Welcome to Admin Dashboard , Satyanarayana !</h2>
          <div className="dashboard-display">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

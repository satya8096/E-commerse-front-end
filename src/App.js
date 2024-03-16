import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Men from "./Components/Men";
import Women from "./Components/Women";
import Kids from "./Components/Kids";
import HomeKichen from "./Components/HomeKichen";
import Order from "./Components/Order";
import CartBag from "./Components/CartBag";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ProductDetails from "./Components/ProductDetails";
import AddProducts from "./Components/AddProducts";
import AdminDashboard from "./Components/AdminDashboard";
import Footer from "./Components/Footer";
import ErrorPage from "./Components/ErrorPage";
import GoToTop from "./Reducers/GoToTop";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/kitchen" element={<HomeKichen />} />
        <Route path="/order" element={<Order />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bag" element={<CartBag />} />
        <Route path="/shopykit/admin/dashboard" element={<AdminDashboard />}>
          <Route
            path="/shopykit/admin/dashboard/add-products"
            element={<AddProducts />}
          />
        </Route>
        <Route
          path="/:root/product-details/:_id"
          element={<ProductDetails />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <GoToTop />
      <Footer />
    </>
  );
}

export default App;

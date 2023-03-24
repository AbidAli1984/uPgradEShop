import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./common/navbar/Navbar";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Product from "./components/product/Product";
import { Toolbar } from "@mui/material";
import AddProduct from "./components/product/addproduct/AddProduct";
import { useEffect, useState } from "react";
import EditProduct from "./components/product/editproduct/EditProduct";
import PageNotFound from "./common/pagenotfound/PageNotFound";
import ProductDetails from "./components/product/productdetails/ProductDetails";

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  let navigate = useNavigate();

  const location = useLocation();

  const checkAuth = () => {
    let path = location.pathname;
    debugger;
    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true);
      setIsAdmin(sessionStorage.getItem("isAdmin") === "true");
      if (path === "/login" || path === "/") path = "/product";
      navigate(path);
    } else if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Toolbar />
      <Routes>
        <Route path="/login" element={<Login checkAuth={checkAuth} />} />
        <Route path="/" element={<Login checkAuth={checkAuth} />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="product"
          element={<Product checkAuth={checkAuth} isAdmin={isAdmin} />}
        />
        <Route
          path="addproduct"
          element={<AddProduct checkAuth={checkAuth} />}
        />
        <Route
          path="editproduct"
          element={<EditProduct checkAuth={checkAuth} />}
        />
        <Route
          path="productdetails"
          element={<ProductDetails checkAuth={checkAuth} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

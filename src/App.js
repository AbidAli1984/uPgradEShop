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
import ProductDetails from "./components/productdetails/ProductDetails";
import OrderPage from "./components/orderpage/OrderPage";
import { Utilities } from "./common/utilities";

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  let navigate = useNavigate();

  const location = useLocation();

  const checkAuth = () => {
    let path = location.pathname;
    if (Utilities.token()) {
      setIsLoggedIn(true);
      setIsAdmin(Utilities.isAdmin());
      if (path === "/login" || path === "/") path = "/product";
      navigate(path);
    } else if (!Utilities.token()) {
      if (path === "/signup") navigate(path);
      else navigate("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const searchProduct = (value) => {
    debugger;
    setSearchValue(value);
  };

  return (
    <div>
      <Navbar
        searchProduct={searchProduct}
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
          element={
            <Product
              checkAuth={checkAuth}
              isAdmin={isAdmin}
              searchValue={searchValue}
            />
          }
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
        <Route path="orderpage" element={<OrderPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

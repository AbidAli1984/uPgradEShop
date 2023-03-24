import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import "../navbar/Navbar.css";
import { useEffect, useState } from "react";

function Navbar(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn);
  const [isAdmin, setIsAdmin] = useState(props.isLoggedIn);
  let navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(props.isLoggedIn);
    setIsAdmin(props.isAdmin);
  }, [props.isLoggedIn, props.isAdmin]);

  const links = [
    { name: "Home", path: "/product", isDisplay: isLoggedIn },
    { name: "Login", path: "/login", isDisplay: !isLoggedIn },
    { name: "Sign Up", path: "/signup", isDisplay: !isLoggedIn },
    {
      name: "Add Product",
      path: "/addproduct",
      isDisplay: isLoggedIn && isAdmin,
    },
  ];

  const logoutHandler = () => {
    sessionStorage.clear();
    props.setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AppBar component="nav">
      <Toolbar>
        <ShoppingCart />
        <Typography sx={{ flexGrow: 1 }} variant="h6">
          upGrad E-Shop
        </Typography>
        <Box>
          {links.map(({ name, path, isDisplay }, index) => {
            return (
              isDisplay && (
                <NavLink key={name} to={path} style={{ color: "white" }}>
                  {name}
                </NavLink>
              )
            );
          })}
          {isLoggedIn && (
            <Button
              className="logout"
              variant="contained"
              color="error"
              onClick={logoutHandler}
            >
              LOGOUT
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

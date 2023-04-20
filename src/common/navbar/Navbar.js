import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import "../navbar/Navbar.css";
import { useEffect, useState } from "react";
import { Utilities } from "../utilities";

function Navbar(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn);
  const [isAdmin, setIsAdmin] = useState(props.isLoggedIn);
  let navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(props.isLoggedIn);
    setIsAdmin(props.isAdmin);
  }, [props.isLoggedIn, props.isAdmin]);

  const logoutHandler = () => {
    sessionStorage.clear();
    props.setIsLoggedIn(false);
    navigate("/login");
  };

  const Item = Utilities.style.Item();

  return (
    <AppBar component="nav">
      <Toolbar>
        <Grid container>
          <Grid item xs={4}>
            <Item className="logo">
              <ShoppingCart />
              <Typography sx={{ flexGrow: 1 }} variant="h6">
                upGrad E-Shop
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={4}>
            {isLoggedIn && <Item className="searchbar"></Item>}
          </Grid>
          <Grid item xs={4}>
            <Item className="navLink">
              {Utilities.getlinks(isLoggedIn, isAdmin).map(
                ({ name, path, isDisplay }, index) => {
                  return (
                    isDisplay && (
                      <NavLink key={name} to={path} style={{ color: "white" }}>
                        {name}
                      </NavLink>
                    )
                  );
                }
              )}
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
            </Item>
          </Grid>
        </Grid>
        <Box></Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

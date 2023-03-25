import { Typography, Box, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import authapi from "../../common/api/authapi";
import { useState } from "react";

function Login(props) {
  const [loginData] = useState({});
  let navigate = useNavigate();

  const loginUser = async () => {
    const result = await authapi.login(loginData);
    if (result) {
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("isAdmin", result.isAdmin);
      sessionStorage.setItem("id", result.userId);
      navigate("/product");
    } else {
      alert("invalid username/password!");
    }
  };

  return (
    <div>
      <Box className="main-Box">
        <div
          style={{
            display: "flex",
            backgroundColor: "red",
            borderRadius: "50%",
            padding: "10px",
          }}
        >
          <LockOutlinedIcon style={{ color: "white", fontSize: "20px" }} />
        </div>
        <Typography variant="h5" padding={1}>
          Sign in
        </Typography>
        <TextField
          fullWidth
          type={"email"}
          label="Email Address *"
          onChange={(e) => {
            loginData.username = e.target.value;
          }}
        />
        <TextField
          fullWidth
          type={"password"}
          label="Password *"
          onChange={(e) => {
            loginData.password = e.target.value;
          }}
        />
        <Button
          sx={{ marginTop: 2 }}
          fullWidth
          variant="contained"
          color="info"
          onClick={loginUser}
        >
          SIGN IN
        </Button>
        <Link
          to={"/signup"}
          style={{ alignSelf: "flex-start", marginTop: "15px" }}
        >
          Don't have an account? Sign Up
        </Link>
      </Box>
      <Typography textAlign={"center"} color="darkgray">
        Copyright &#169; <a href="http://upgrad.com">upGrad</a> 2023
      </Typography>
    </div>
  );
}

export default Login;

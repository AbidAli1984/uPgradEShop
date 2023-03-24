import {
  Typography,
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import userapi from "../../common/api/authapi";

function Signup() {
  const [signupData] = useState({});
  return (
    <>
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
          Sign up
        </Typography>
        <TextField
          fullWidth
          label="First Name *"
          onChange={(e) => {
            signupData.firstName = e.target.value;
          }}
        />
        <TextField
          fullWidth
          label="Last Name *"
          onChange={(e) => {
            signupData.lastName = e.target.value;
          }}
        />
        <TextField
          fullWidth
          type={"email"}
          label="Email Address *"
          onChange={(e) => {
            signupData.email = e.target.value;
          }}
        />
        <TextField
          fullWidth
          type={"password"}
          label="Password *"
          onChange={(e) => {
            signupData.password = e.target.value;
          }}
        />
        <TextField fullWidth type={"password"} label="Confirm Password *" />
        <TextField
          fullWidth
          type={"text"}
          label="Contact Number *"
          onChange={(e) => {
            signupData.contactNumber = e.target.value;
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              onClick={() => {
                signupData.isAdmin = !signupData.isAdmin;
              }}
            />
          }
          label="Is Admin"
        />
        <Button
          sx={{ marginTop: 2 }}
          fullWidth
          variant="contained"
          color="info"
          onClick={() => {
            userapi.signup(signupData);
          }}
        >
          SIGN UP
        </Button>
        <Link
          to={"/login"}
          style={{ alignSelf: "flex-end", marginTop: "15px" }}
        >
          Already have an account? Sign in
        </Link>
      </Box>
      <Typography textAlign={"center"} color="darkgray">
        Copyright &#169; <a href="http://upgrad.com">upGrad</a> 2023
      </Typography>
    </>
  );
}

export default Signup;

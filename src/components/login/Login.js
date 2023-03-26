import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import authapi from "../../common/api/authapi";

import { Typography, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactToastify from "../../common/reacttoastify/ReactToastify";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  const loginUser = async (data) => {
    const result = await authapi.login(data);
    if (result) {
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("isAdmin", result.isAdmin);
      sessionStorage.setItem("id", result.userId);
      navigate("/product");
    } else {
      toast.error("invalid username/password!");
    }
  };

  return (
    <div>
      <ReactToastify />
      <form className="main-Box" onSubmit={handleSubmit(loginUser)}>
        <LockOutlinedIcon className="lockIcon" />
        <Typography variant="h5" padding={1}>
          Sign in
        </Typography>
        <TextField
          fullWidth
          type={"email"}
          label="Email Address *"
          {...register("username", {
            required: "Email Address is required.",
          })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
        />
        <TextField
          fullWidth
          type={"password"}
          label="Password *"
          {...register("password", {
            required: "Password is required.",
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          sx={{ marginTop: 2 }}
          fullWidth
          variant="contained"
          color="info"
        >
          SIGN IN
        </Button>
        <Link to={"/signup"} className="signupLink">
          Don't have an account? Sign Up
        </Link>
      </form>
      <Typography textAlign={"center"} color="darkgray">
        Copyright &#169; <a href="http://upgrad.com">upGrad</a> 2023
      </Typography>
    </div>
  );
}

export default Login;

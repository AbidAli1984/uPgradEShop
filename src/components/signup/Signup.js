import {
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import userapi from "../../common/api/userapi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ReactToastify from "../../common/reacttoastify/ReactToastify";
import { Utilities } from "../../common/utilities";

function Signup() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(Utilities.getEmptyUser());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = async (data) => {
    data.role = [isAdmin ? "admin" : "user"];
    const result = await userapi.register(data);

    if (result) {
      toast.success("User Registered Successfully!");
      setUser(Utilities.getEmptyUser());
    } else {
      toast.error(Utilities.messages.getErrorMessage());
    }
  };

  return (
    <>
      <ReactToastify />
      <form className="main-Box" onSubmit={handleSubmit(registerUser)}>
        <LockOutlinedIcon className="lockIcon" />
        <Typography variant="h5" padding={1}>
          Sign up
        </Typography>
        <TextField
          fullWidth
          value={user.firstName}
          label="First Name *"
          {...register("firstName", { required: "First Name is required" })}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          onChange={(e) => {
            setUser({ ...user, firstName: e.target.value });
          }}
        />
        <TextField
          fullWidth
          value={user.lastName}
          label="Last Name *"
          {...register("lastName", { required: "Last Name is required" })}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          onChange={(e) => {
            setUser({ ...user, lastName: e.target.value });
          }}
        />
        <TextField
          fullWidth
          value={user.email}
          type={"email"}
          label="Email Address *"
          {...register("email", { required: "Email Address is required" })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <TextField
          fullWidth
          value={user.password}
          type={"password"}
          label="Password *"
          {...register("password", { required: "Password is required" })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <TextField
          fullWidth
          value={user.confirm}
          type={"password"}
          label="Confirm Password *"
          {...register("confirm", { required: "Confirm Password is required" })}
          error={Boolean(errors.confirm)}
          helperText={errors.confirm?.message}
          onChange={(e) => {
            setUser({ ...user, confirm: e.target.value });
          }}
        />
        <TextField
          fullWidth
          value={user.contactNumber}
          type={"text"}
          label="Contact Number *"
          {...register("contactNumber", {
            required: "Contact Number is required",
          })}
          error={Boolean(errors.contactNumber)}
          helperText={errors.contactNumber?.message}
          onChange={(e) => {
            setUser({ ...user, contactNumber: e.target.value });
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              onClick={() => {
                setIsAdmin(!isAdmin);
              }}
            />
          }
          label="Is Admin"
        />
        <Button
          type="submit"
          sx={{ marginTop: 2 }}
          fullWidth
          variant="contained"
          color="info"
        >
          SIGN UP
        </Button>
        <Link to={"/login"} className="signinLink">
          Already have an account? Sign in
        </Link>
      </form>
      <Typography textAlign={"center"} color="darkgray">
        Copyright &#169; <a href="http://upgrad.com">upGrad</a> 2023
      </Typography>
    </>
  );
}

export default Signup;

import { Typography, Checkbox, FormControlLabel } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import userapi from "../../common/api/userapi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ReactToastify from "../../common/reacttoastify/ReactToastify";
import { Utilities } from "../../common/utilities";
import TextEmail from "../../common/fields/TextEmail";
import TextPassword from "../../common/fields/TextPassword";
import TextConfirmPassword from "../../common/fields/TextConfirmPassword";
import SubmitButton from "../../common/fields/SubmitButton";
import TextFieldRequired from "../../common/fields/TextFieldRequired";

function Signup() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [helperTextCP, setHelperTextCP] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const registerUser = async (data) => {
    if (!isConfirmPasswordMatch(confirmPassword, data.password)) return;
    data.role = [isAdmin ? "admin" : "user"];

    const rawResponse = await userapi.register(data);
    const result = await rawResponse.json();

    if (rawResponse.ok) {
      toast.success(result.message);
      setIsAdmin(false);
      reset();
    } else {
      toast.error(result.message);
    }
  };

  const isConfirmPasswordMatch = (value, password) => {
    if (value) {
      if (value === password) {
        setHelperTextCP("");
        return true;
      }
      setHelperTextCP("Confirm password doesn't match with password field");
    } else setHelperTextCP("Confirm password is required");
    return false;
  };

  return (
    <>
      <ReactToastify />
      <form className="main-Box" onSubmit={handleSubmit(registerUser)}>
        <LockOutlinedIcon className="lockIcon" />
        <Typography variant="h5" padding={1}>
          Sign up
        </Typography>
        <TextFieldRequired
          register={register}
          errors={errors}
          field="firstName"
          label="First Name"
        />

        <TextFieldRequired
          register={register}
          errors={errors}
          field="lastName"
          label="Last Name"
        />

        <TextEmail register={register} errors={errors} />
        <TextPassword register={register} errors={errors} />
        <TextConfirmPassword
          setConfirmPassword={setConfirmPassword}
          helperTextCP={helperTextCP}
        />

        <TextFieldRequired
          register={register}
          errors={errors}
          field="contactNumber"
          label="Contact Number"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isAdmin}
              onClick={() => {
                setIsAdmin(!isAdmin);
              }}
            />
          }
          label="Is Admin"
        />
        <SubmitButton text="SIGN UP"></SubmitButton>
        <Link to={"/login"} className="signinLink">
          {Utilities.label.signin}
        </Link>
      </form>
      <Typography textAlign={"center"} color="darkgray">
        Copyright &#169; <a href="http://upgrad.com">upGrad</a> 2023
      </Typography>
    </>
  );
}

export default Signup;

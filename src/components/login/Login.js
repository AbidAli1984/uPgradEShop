import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import authapi from "../../common/api/authapi";

import { Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactToastify from "../../common/reacttoastify/ReactToastify";
import { useForm } from "react-hook-form";
import { Utilities } from "../../common/utilities";
import SubmitButton from "../../common/fields/SubmitButton";
import TextPassword from "../../common/fields/TextPassword";
import TextEmail from "../../common/fields/TextEmail";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  const hadleLogin = async (data) => {
    const result = await authapi.login(data);
    if (result) {
      Utilities.setSession(result);
      navigate("/product");
    } else {
      toast.error(Utilities.messages.invalidLogin);
    }
  };

  return (
    <>
      <ReactToastify />
      <form className="main-Box" onSubmit={handleSubmit(hadleLogin)}>
        <LockOutlinedIcon className="lockIcon" />
        <Typography variant="h5" padding={1}>
          Sign in
        </Typography>
        <TextEmail register={register} errors={errors} field="username" />

        <TextPassword register={register} errors={errors} />
        <SubmitButton text="sign in" />
        <Link to={"/signup"} className="signupLink">
          {Utilities.label.signup}
        </Link>
      </form>
      <Typography textAlign={"center"} color="darkgray">
        Copyright &#169; <a href="http://upgrad.com">upGrad</a> 2023
      </Typography>
    </>
  );
}

export default Login;

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

const TextPassword = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      fullWidth
      type={showPassword ? "text" : "password"}
      title={showPassword ? "hide password" : "show password"}
      label="Password *"
      {...register("password", {
        required: "Password is required.",
      })}
      error={Boolean(errors.password)}
      helperText={errors.password?.message}
      InputProps={{
        endAdornment: (
          <InputAdornment
            className="passwordIcon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TextPassword;

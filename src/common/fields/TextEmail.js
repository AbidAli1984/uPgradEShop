import { Email } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React from "react";

const TextEmail = ({ register, errors, field = "email" }) => {
  return (
    <TextField
      fullWidth
      type={"email"}
      label="Email Address *"
      {...register(field, {
        required: "Email Address is required.",
      })}
      error={Boolean(errors[field])}
      helperText={errors[field]?.message}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <Email />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TextEmail;

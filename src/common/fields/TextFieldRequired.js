import { TextField } from "@mui/material";
import React from "react";

const TextFieldRequired = ({ register, errors, field, label = "" }) => {
  return (
    <TextField
      fullWidth
      label={label + " *"}
      {...register(field, { required: label + " is required" })}
      error={Boolean(errors[field])}
      helperText={errors[field]?.message}
    />
  );
};

export default TextFieldRequired;

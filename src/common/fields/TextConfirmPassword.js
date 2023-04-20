import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

const TextConfirmPassword = ({ setConfirmPassword, helperTextCP }) => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <TextField
      fullWidth
      type={showConfirmPassword ? "text" : "password"}
      title={showConfirmPassword ? "hide password" : "show password"}
      label="Confirm Password *"
      onInput={(event) => {
        setConfirmPassword(event.target.value);
      }}
      error={helperTextCP}
      helperText={helperTextCP}
      InputProps={{
        endAdornment: (
          <InputAdornment
            className="passwordIcon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TextConfirmPassword;

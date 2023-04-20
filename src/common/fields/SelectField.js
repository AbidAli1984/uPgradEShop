import { MenuItem, Select } from "@mui/material";
import React from "react";

const SelectField = ({ objArrayList, handleOnChange, selectedValue = "" }) => {
  return (
    <Select
      sx={{ height: 40, minWidth: 300 }}
      value={selectedValue}
      onChange={handleOnChange}
    >
      {objArrayList.map((sort) => {
        return (
          <MenuItem key={sort.value} value={sort.value} label={sort.label}>
            {sort.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectField;

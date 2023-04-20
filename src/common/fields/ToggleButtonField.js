import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

const ToggleButtonField = ({
  arrayList,
  handleOnChange,
  selectedValue = "",
}) => {
  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <ToggleButtonGroup
        color="primary"
        exclusive
        aria-label="Platform"
        value={selectedValue}
        onChange={handleOnChange}
      >
        <ToggleButton key="all" value="">
          ALL
        </ToggleButton>
        {arrayList?.map((cat) => {
          return (
            <ToggleButton key={cat} value={cat}>
              {cat}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
};

export default ToggleButtonField;

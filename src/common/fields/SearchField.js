import { Search } from "@mui/icons-material";
import React from "react";

const SearchField = ({ handleSearchOnChange }) => {
  return (
    <div className="searchbar">
      <Search />
      <input
        type="text"
        placeholder="Search.."
        name="search"
        onChange={(e) => {
          handleSearchOnChange(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchField;

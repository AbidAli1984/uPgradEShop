import { Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div id="main">
        <h1>
          Error 404
          <br />
          Page not found
        </h1>
        <Button
          variant="contained"
          startIcon={<Home />}
          onClick={() => {
            navigate("/");
          }}
        >
          GO BACK TO HOME
        </Button>
      </div>
    </>
  );
};

export default PageNotFound;

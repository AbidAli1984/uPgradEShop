import "./OrderPage.css";
import {
  Button,
  Grid,
  Step,
  Stepper,
  styled,
  Paper,
  StepLabel,
} from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import OrderDetails from "./OrderDetails";
import Address from "../address/Address";

const steps = ["Items", "Select Address", "Confirm Order"];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const OrderPage = () => {
  const location = useLocation();
  const [product] = useState(location.state?.product);
  const [activeStep, setActiveStep] = useState(0);

  debugger;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Grid className="productDetails" container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Item>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = { completed: activeStep > index };
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Item>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      {activeStep === 0 && <OrderDetails product={product} />}
      {activeStep === 1 && <Address />}

      <div className="navButton">
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          color="primary"
        >
          BACK
        </Button>
        <Button onClick={handleNext} variant="contained" color="primary">
          NEXT
        </Button>
      </div>
    </>
  );
};

export default OrderPage;

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
import { useLocation, useNavigate } from "react-router-dom";
import OrderProuct from "./OrderProuct";
import Address from "../address/Address";
import OrderDetails from "./OrderDetails";
import { Utilities } from "../../common/utilities";
import orderapi from "../../common/api/orderapi";
import { toast } from "react-toastify";

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
  const [isFinalStep, setIsFinalStep] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const navigate = useNavigate();

  const placeOrder = async () => {
    const data = {
      quantity: product.quantity,
      user: Utilities.getuserId(),
      product: product.id,
      address: selectedAddress,
    };

    const result = await orderapi.placeOrder(data);

    if (result) {
      navigate("/product", {
        state: { alertmessage: "Order placed successfully" },
      });
    } else {
      toast.error(Utilities.messages.getErrorMessage());
    }
  };

  const handleNext = () => {
    if (activeStep === 1 && !selectedAddress) {
      alert("please select address");
      return;
    }

    if (isFinalStep) {
      placeOrder();
      return;
    }
    setActiveStep((prevActiveStep) => {
      setIsFinalStep(steps.length - 1 === prevActiveStep + 1);
      return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      setIsFinalStep(steps.length - 1 === prevActiveStep - 1);
      return prevActiveStep - 1;
    });
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
      {activeStep === 0 && <OrderProuct Item={Item} product={product} />}
      {activeStep === 1 && (
        <Address
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      )}
      {activeStep === 2 && (
        <OrderDetails
          Item={Item}
          product={product}
          selectedAddress={selectedAddress}
        />
      )}

      <div className="navButton">
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          color="primary"
        >
          BACK
        </Button>
        <Button onClick={handleNext} variant="contained" color="primary">
          {isFinalStep ? "PLACE ORDER" : "NEXT"}
        </Button>
      </div>
    </>
  );
};

export default OrderPage;

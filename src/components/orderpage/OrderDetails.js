import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import addressapi from "../../common/api/addressapi";
import { Utilities } from "../../common/utilities";

const OrderDetails = (props) => {
  const Item = props.Item;
  const [product] = useState(props.product);
  const [addressData, setAddressData] = useState(Utilities.getEmptyAddress());

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = () => {
    addressapi.getAddress(props.selectedAddress).then((result) => {
      setAddressData(result);
    });
  };

  return (
    <Box className="productContainer">
      <Grid className="productDetails" container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={6} className="detailsContainer">
          <Item>
            <div className="row">
              <span className="productTitle">{product.name}</span>
            </div>
            <div className="row">
              <span>Quantity: </span>
              <span>
                <b>{product.quantity}</b>
              </span>
            </div>
            <div className="row">
              <span>Category: </span>
              <span>
                <b>{product.category}</b>
              </span>
            </div>
            <div className="row">
              <span className="description">{product.description}</span>
            </div>
            <div className="row">
              <span className="price">
                Total Price : &#8377; {product.price * product.quantity}
              </span>
            </div>
          </Item>
        </Grid>
        <Grid item xs={4} className="detailsContainer">
          <Item>
            <div className="row">
              <span className="productTitle">Address Details :</span>
            </div>
            <div>{addressData.name} </div>
            <div>Contact Number: {addressData.contactNumber}</div>
            <div>
              {addressData.street}, {addressData.city},
            </div>
            <div>
              {addressData.state}, {addressData.landmark},
            </div>
            <div>{addressData.zipcode}</div>
          </Item>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetails;

import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { Utilities } from "../../common/utilities";

const OrderProuct = (props) => {
  const Item = Utilities.style.Item();
  const [product] = useState(props.product);

  return (
    <Box className="productContainer">
      <Grid className="productDetails" container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <Item>
            <img src={product.imageUrl} alt={product.name} />
          </Item>
        </Grid>
        <Grid item xs={6}>
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
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
};

export default OrderProuct;

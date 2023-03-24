import "./ProductDetails.css";
import { Box, Button, Grid, styled, TextField } from "@mui/material";
import productapi from "../../../common/api/productapi";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { Utilities } from "../../../common/utilities";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProductDetails = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(Utilities.getEmptyProduct());
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const prodId = location.state?.id;
    productapi.getProduct(prodId).then((result) => {
      console.log(result);
      setProduct(result);
    });
  }, []);

  // const edit = (product) => {
  //   return productapi.updateProduct(product).then((result) => {
  //     if (result.ok) {
  //       alert("product updated Successfully!");
  //       navigate("/product");
  //       return true;
  //     }
  //     return false;
  //   });
  // };

  return (
    <>
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
                <span>
                  <span className="availableQty">
                    Available Quantity : {product.availableItems}
                  </span>
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
                <span className="price"> &#8377; {product.price}</span>
              </div>
              <div className="row">
                <TextField
                  defaultValue={quantity}
                  className="quantity"
                  label="Enter Quantity *"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="row">
                <span>
                  <Button variant="contained" color="primary">
                    PLACE ORDER
                  </Button>
                </span>
              </div>
            </Item>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Box>
      {/* <Grid container>
        <Grid item xs={4}>
          <Item>
            <img src={product.imageUrl} width={500} alt={product.name} />
          </Item>
        </Grid>
        <Grid item xs={6} className="productDetails">
          <Item>
            <div className="row">
              <span className="productTitle">{product.name}</span>
              <span>
                <span className="availableQty">
                  Available Quantity : {product.availableItems}
                </span>
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
              <span className="price"> &#8377; {product.price}</span>
            </div>
            <div className="row">
              <TextField
                type={Number}
                defaultValue={quantity}
                className="quantity"
                label="Enter Quantity *"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="row">
              <span>
                <Button variant="contained" color="primary">
                  PLACE ORDER
                </Button>
              </span>
            </div>
          </Item>
        </Grid>
      </Grid> */}
    </>
  );
};

export default ProductDetails;

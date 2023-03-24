import "./AddProduct.css";
import { Typography, Box } from "@mui/material";
import productapi from "../../../common/api/productapi";
import ProductForm from "../ProductForm";

const AddProduct = (props) => {
  const add = (product) => {
    return productapi.addProduct(product).then((result) => {
      if (result.ok) {
        alert("product added Successfully!");
        return true;
      }
      return false;
    });
  };

  return (
    <>
      <Box className="main-Box">
        <Typography variant="h5" padding={1}>
          Add Product
        </Typography>
        <ProductForm eventHandler={add} />
      </Box>
      <Typography textAlign={"center"} color="darkgray">
        Copyright &#169; <a href="http://upgrad.com">upGrad</a> 2023
      </Typography>
    </>
  );
};

export default AddProduct;

import "./EditProduct.css";
import { Typography, Box } from "@mui/material";
import productapi from "../../../common/api/productapi";
import ProductForm from "../ProductForm";
import { useLocation, useNavigate } from "react-router-dom";

const EditProduct = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const edit = async (product) => {
    return await productapi.updateProduct(product);
  };

  return (
    <>
      <Box className="main-Box">
        <Typography variant="h5" padding={1}>
          Modify Product
        </Typography>
        <ProductForm eventHandler={edit} prodId={location.state?.id} />
      </Box>
      <Typography textAlign={"center"} color="darkgray">
        Copyright &#169; <a href="http://upgrad.com">upGrad</a> 2023
      </Typography>
    </>
  );
};

export default EditProduct;

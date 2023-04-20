import DeleteConfirmation from "../../common/dialog/DeleteConfirmation";
import ProductCard from "./ProductCard";
import { useState } from "react";
import productapi from "../../common/api/productapi";
import { toast } from "react-toastify";
import ReactToastify from "../../common/reacttoastify/ReactToastify";
import { Utilities } from "../../common/utilities";
import { Grid } from "@mui/material";

const ProductList = ({ products, updateProductListOnDelete, isAdmin }) => {
  const [productid, setProductId] = useState();
  const [open, setOpen] = useState(false);

  const openDeleteConfirm = (id) => {
    setOpen(true);
    setProductId(id);
  };

  const closeDeleteConfirm = () => {
    setOpen(false);
  };

  const deleteProduct = async () => {
    const response = await productapi.deleteProducts(productid);
    if (response && response.ok) {
      let name = updateProductListOnDelete(productid);
      toast.success(`Product ${name} deleted successfully`);
    } else {
      toast.success(Utilities.messages.error);
    }
    setOpen(false);
  };

  const renderProduct = products?.map((product) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        openDeleteConfirm={openDeleteConfirm}
        isAdmin={isAdmin}
      />
    );
  });

  return (
    <>
      <ReactToastify />
      <DeleteConfirmation
        open={open}
        deleteHandler={deleteProduct}
        closeDeleteConfirm={closeDeleteConfirm}
      />
      <Grid spacing={5} className="prodContainer" container>
        {renderProduct}
      </Grid>
    </>
  );
};

export default ProductList;

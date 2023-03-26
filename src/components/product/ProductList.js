import DeleteConfirmation from "../../common/dialog/DeleteConfirmation";
import ProductCard from "./ProductCard";
import { useState } from "react";
import productapi from "../../common/api/productapi";
import { toast } from "react-toastify";
import ReactToastify from "../../common/reacttoastify/ReactToastify";

const ProductList = (props) => {
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
      let name = props.deleteProductHandler(productid);
      toast.success(`Product ${name} deleted successfully`);
    } else {
      toast.success("Something Went wrong");
    }
    setOpen(false);
  };

  const renderProduct = props.products?.map((product) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        openDeleteConfirm={openDeleteConfirm}
        isAdmin={props.isAdmin}
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
      <div className="ui celled list">{renderProduct}</div>
    </>
  );
};

export default ProductList;

import DeleteConfirmation from "../../common/dialog/DeleteConfirmation";
import ProductCard from "./ProductCard";
import { useState } from "react";
import productapi from "../../common/api/productapi";

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

  const deleteProduct = () => {
    productapi.deleteProducts(productid).then((result) => {
      if (result.ok) {
        let name = props.deleteProductHandler(productid);
        alert(`Product ${name} deleted successfully`);
      }
    });
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

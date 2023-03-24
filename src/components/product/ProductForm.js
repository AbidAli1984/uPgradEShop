import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import productapi from "../../common/api/productapi";
import { Utilities } from "../../common/utilities";

const ProductForm = ({ eventHandler, prodId }) => {
  const [product, setProduct] = useState(Utilities.getEmptyProduct());
  const [buttonTitle, setButtonTitle] = useState("SAVE PRODUCT");
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState({ value: "", label: "" });

  useEffect(() => {
    getCategories();
    if (prodId) {
      productapi.getProduct(prodId).then((result) => {
        setCategory({ value: result.category, label: result.category });
        setProduct(result);
      });
      setButtonTitle("MODIFY PRODUCT");
    }
  }, []);

  const getCategories = () => {
    productapi.getCategories().then((result) => {
      result = result.map((cat) => {
        return { value: cat, label: cat };
      });

      setCategories(result);
    });
  };

  const addOrUpdateProduct = () => {
    if (typeof eventHandler === "function") {
      eventHandler(product).then((response) => {
        if (response) {
          getCategories();
          setProduct(Utilities.getEmptyProduct());
          setCategory({ value: "", label: "" });
        } else alert("Something went wrong!");
      });
    }
  };

  return (
    <>
      <TextField
        fullWidth
        value={product.name}
        label="Name *"
        onChange={(e) => {
          setProduct({ ...product, name: e.target.value });
        }}
      />
      <CreatableSelect
        className="categories"
        value={category}
        isClearable
        options={categories}
        onChange={(opt, meta) => {
          setProduct({ ...product, category: opt.value });
          setCategory({ value: opt.value, label: opt.value });
        }}
      />
      <TextField
        fullWidth
        value={product.manufacturer}
        label="Manufacturer *"
        onChange={(e) => {
          setProduct({ ...product, manufacturer: e.target.value });
        }}
      />
      <TextField
        fullWidth
        value={product.availableItems}
        label="Available Items *"
        onChange={(e) => {
          setProduct({
            ...product,
            availableItems: e.target.value,
          });
        }}
      />
      <TextField
        fullWidth
        value={product.price}
        label="Price *"
        onChange={(e) => {
          setProduct({ ...product, price: e.target.value });
        }}
      />
      <TextField
        fullWidth
        value={product.imageUrl}
        label="Image URL"
        onChange={(e) => {
          setProduct({ ...product, imageUrl: e.target.value });
        }}
      />
      <TextField
        fullWidth
        value={product.description}
        label="Product Description"
        onChange={(e) => {
          setProduct({ ...product, description: e.target.value });
        }}
      />
      <Button
        sx={{ marginTop: 2 }}
        fullWidth
        variant="contained"
        color="info"
        onClick={addOrUpdateProduct}
      >
        {buttonTitle}
      </Button>
    </>
  );
};

export default ProductForm;

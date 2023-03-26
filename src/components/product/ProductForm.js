import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import productapi from "../../common/api/productapi";
import ReactToastify from "../../common/reacttoastify/ReactToastify";
import { Utilities } from "../../common/utilities";

const ProductForm = ({ eventHandler, prodId }) => {
  const [product, setProduct] = useState(Utilities.getEmptyProduct());
  const [buttonTitle, setButtonTitle] = useState("SAVE PRODUCT");
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState({ value: "", label: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const addOrUpdateProduct = async (data) => {
    debugger;
    if (typeof eventHandler === "function") {
      let message = prodId ? "modified" : "added";
      message = `Product ${product.name} ${message} successfully`;
      const response = await eventHandler(product);
      debugger;
      if (response) {
        getCategories();
        setProduct(Utilities.getEmptyProduct());
        setCategory({ value: "", label: "" });
        toast.success(message);
      } else toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <ReactToastify />
      <form onSubmit={handleSubmit(addOrUpdateProduct)}>
        <TextField
          fullWidth
          required
          value={product.name}
          label="Name"
          onChange={(e) => {
            setProduct({ ...product, name: e.target.value });
          }}
        />
        <CreatableSelect
          className="categories"
          required
          value={category}
          isClearable
          options={categories}
          onChange={(opt) => {
            setProduct({ ...product, category: opt.value });
            setCategory({ value: opt.value, label: opt.value });
          }}
        />
        <TextField
          fullWidth
          required
          value={product.manufacturer}
          label="Manufacturer"
          onChange={(e) => {
            setProduct({ ...product, manufacturer: e.target.value });
          }}
        />
        <TextField
          fullWidth
          required
          value={product.availableItems}
          label="Available Items"
          onChange={(e) => {
            setProduct({
              ...product,
              availableItems: e.target.value,
            });
          }}
        />
        <TextField
          fullWidth
          required
          value={product.price}
          label="Price"
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
          type="submit"
        >
          {buttonTitle}
        </Button>
      </form>
    </>
  );
};

export default ProductForm;

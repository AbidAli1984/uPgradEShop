import "./Product.css";
import { useEffect, useState } from "react";
import productapi from "../../common/api/productapi";
import ProductList from "./ProductList";
import {
  Container,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Utilities } from "../../common/utilities";

let products;
const Product = (props) => {
  const sortingData = [
    { value: "default", label: "Default", field: "index", type: "" },
    {
      value: "htol",
      label: "Price: High to Low",
      field: "price",
      type: "DESC",
    },
    { value: "ltoh", label: "Price: Low to High", field: "price", type: "" },
    { value: "newest", label: "Newest", field: "index", type: "DESC" },
  ];

  //const [products, setProducts] = useState();
  const [productCaterogy, setproductCaterogy] = useState();
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState(sortingData[0]);

  useEffect(() => {
    props.checkAuth();
    productapi.getProducts().then((result) => {
      const resultData = result.map((res, ind) => ({ ...res, index: ind }));
      //setProducts(resultData);
      products = resultData;
      setproductCaterogy(resultData);
    }, []);

    productapi.getCategories().then((result) => {
      setCategories(result);
    });
  }, []);

  const changeSortHandler = (event) => {
    debugger;
    let opt = Utilities.getFilteredData(sortingData, event.target.value);
    opt = opt[0];
    setSortBy(opt);
    Utilities.sortByField(products, opt.field, opt.type);
    setproductCaterogy(products);

    if (category) setFilterProduct(category);
  };

  const changeCategoryHandler = (event) => {
    setCategory(event.target.value);
    if (!event.target.value) {
      setproductCaterogy(products);
      return;
    }

    setFilterProduct(event.target.value);
  };

  const setFilterProduct = (value) => {
    const filterProduct = products.filter((product) => {
      return product.category === value;
    });
    setproductCaterogy(filterProduct);
  };

  const deleteProductHandler = (id) => {
    let name;
    products = products.filter((product) => {
      if (product.id === id) {
        name = product.name;
      }
      return product.id !== id;
    });
    setproductCaterogy(products);
    return name;
  };

  return (
    <Container>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <ToggleButtonGroup
          color="primary"
          exclusive
          aria-label="Platform"
          value={category}
          onChange={changeCategoryHandler}
        >
          <ToggleButton key="all" value="">
            ALL
          </ToggleButton>
          {categories?.map((cat) => {
            return (
              <ToggleButton key={cat} value={cat}>
                {cat}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </div>
      <div style={{ textAlign: "left" }}>
        <br />
        Sort By:
        <br />
        <Select
          sx={{ height: 40, minWidth: 300 }}
          value={sortBy.value}
          onChange={changeSortHandler}
        >
          {sortingData.map((sort) => {
            return (
              <MenuItem key={sort.value} value={sort.value} label={sort.label}>
                {sort.label}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <ProductList
        products={productCaterogy}
        deleteProductHandler={deleteProductHandler}
        isAdmin={props.isAdmin}
      />
    </Container>
  );
};

export default Product;

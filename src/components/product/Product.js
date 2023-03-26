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
import { Search } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ReactToastify from "../../common/reacttoastify/ReactToastify";

let products;
const Product = (props) => {
  const sortingData = Utilities.getSortingData();

  //const [products, setProducts] = useState();
  const [filteredProduct, setfilteredProduct] = useState();
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState(sortingData[0]);
  const location = useLocation();
  let counter = 0;

  useEffect(() => {
    if (counter == 0) {
      if (location.state && location.state.alertmessage)
        toast.success(location.state.alertmessage);
      counter++;
    }

    props.checkAuth();
    productapi.getProducts().then((result) => {
      if (result) {
        const resultData = result.map((res, ind) => ({ ...res, index: ind }));
        //setProducts(resultData);
        products = resultData;
        setfilteredProduct(resultData);
      } else {
        toast.error(Utilities.messages.getErrorMessage());
      }
    }, []);

    productapi.getCategories().then((result) => {
      setCategories(result);
    });
  }, []);

  const changeSearchHandler = (searchValue) => {
    filterProductByField(searchValue, "name");
    if (!searchValue) sortAndFilterData(sortBy.value);
  };

  const changeSortHandler = (event) => {
    sortAndFilterData(event.target.value);
  };

  const sortAndFilterData = (value) => {
    let opt = Utilities.getFilteredData(sortingData, value);
    opt = opt[0];
    setSortBy(opt);
    Utilities.sortByField(products, opt.field, opt.type);
    setfilteredProduct(products);

    if (category) filterProductByField(category, "category");
  };

  const changeCategoryHandler = (event) => {
    setCategory(event.target.value);
    filterProductByField(event.target.value, "category");
  };

  const filterProductByField = (value, field) => {
    if (!value) {
      setfilteredProduct(products);
      return;
    }
    const filterProduct = products.filter((product) => {
      return product[field].toLowerCase().includes(value.toLowerCase());
    });
    setfilteredProduct(filterProduct);
  };

  const deleteProductHandler = (id) => {
    let name;
    products = products.filter((product) => {
      if (product.id === id) {
        name = product.name;
      }
      return product.id !== id;
    });
    setfilteredProduct(products);
    return name;
  };

  return (
    <Container>
      <ReactToastify />
      <div className="searchbar">
        <div>
          <Search />
        </div>
        <input
          type="text"
          placeholder="Search.."
          name="search"
          onChange={(e) => {
            changeSearchHandler(e.target.value);
          }}
        />
      </div>
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
        products={filteredProduct}
        deleteProductHandler={deleteProductHandler}
        isAdmin={props.isAdmin}
      />
    </Container>
  );
};

export default Product;

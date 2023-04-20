import "./Product.css";
import { useEffect, useState } from "react";
import productapi from "../../common/api/productapi";
import ProductList from "./ProductList";
import { Utilities } from "../../common/utilities";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ReactToastify from "../../common/reacttoastify/ReactToastify";
import SearchField from "../../common/fields/SearchField";
import ToggleButtonField from "../../common/fields/ToggleButtonField";
import SelectField from "../../common/fields/SelectField";

let products;
const Product = ({ checkAuth, isAdmin }) => {
  const sortingData = Utilities.getSortingData();

  const [filteredProduct, setfilteredProduct] = useState();
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState(sortingData[0]);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.alertmessage)
      toast.success(location.state.alertmessage);

    checkAuth();
    loadProductAndCategories();
  }, []);

  const loadProductAndCategories = async () => {
    const result = await productapi.getProducts();

    if (result) {
      const resultData = result.map((res, ind) => ({ ...res, index: ind }));
      products = resultData;
      setfilteredProduct(resultData);
    } else {
      toast.error(Utilities.messages.error);
    }

    productapi.getCategories().then((result) => {
      setCategories(result);
    });
  };

  const handleSearchOnChange = (searchValue) => {
    filterProductByField(searchValue, "name");
    if (!searchValue) sortAndFilterData(sortBy.value);
  };

  const handleCategoryOnChange = (event) => {
    setCategory(event.target.value);
    filterProductByField(event.target.value, "category");
  };

  const handleSortOnChange = (event) => {
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

  const updateProductListOnDelete = (id) => {
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
    <>
      <ReactToastify />
      <SearchField handleSearchOnChange={handleSearchOnChange} />
      <ToggleButtonField
        arrayList={categories}
        handleOnChange={handleCategoryOnChange}
        selectedValue={category}
      />
      <div className="prodContainer sortBySelect">
        <br />
        Sort By:
        <br />
        <SelectField
          objArrayList={sortingData}
          handleOnChange={handleSortOnChange}
          selectedValue={sortBy.value}
        />
      </div>
      <ProductList
        products={filteredProduct}
        updateProductListOnDelete={updateProductListOnDelete}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default Product;

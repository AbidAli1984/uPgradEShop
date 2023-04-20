import { styled, Paper } from "@mui/material";

let baseUrl = "http://localhost:8080/api/";

export const Utilities = {
  setSession(result) {
    sessionStorage.setItem("token", result.token);
    sessionStorage.setItem("isAdmin", result.isAdmin);
    sessionStorage.setItem("id", result.userId);
  },
  token() {
    return sessionStorage.getItem("token");
  },
  getuserId() {
    return sessionStorage.getItem("id");
  },
  isAdmin() {
    return sessionStorage.getItem("isAdmin") === "true";
  },
  getAuthoriztion() {
    return "Bearer " + this.token();
  },
  URL: {
    login: baseUrl + "auth/signin",
    register: baseUrl + "auth/signup",
  },
  getHeaders: {
    Accept: "application/json",
    "Content-type": "application/json;UTF-8",
  },
  getAuthHeaders() {
    return {
      Accept: "application/json",
      "Content-type": "application/json;UTF-8",
      Authorization: this.getAuthoriztion(),
    };
  },
  messages: {
    error: "something went wrong",
    invalidLogin: "invalid username/password!",
  },
  label: {
    signup: "Don't have an account? Sign Up",
    signin: "Already have an account? Sign in",
  },
  getlinks: (isLoggedIn, isAdmin) => {
    return [
      { name: "Home", path: "/product", isDisplay: isLoggedIn },
      { name: "Login", path: "/login", isDisplay: !isLoggedIn },
      { name: "Sign Up", path: "/signup", isDisplay: !isLoggedIn },
      {
        name: "Add Product",
        path: "/addproduct",
        isDisplay: isLoggedIn && isAdmin,
      },
    ];
  },
  getEmptyProduct: () => {
    return {
      id: "",
      name: "",
      category: "",
      manufacturer: "",
      availableItems: "",
      price: "",
      imageUrl: "",
      description: "",
      quantity: 1,
    };
  },
  getEmptyAddress: () => {
    return {
      id: "",
      user: Utilities.getuserId(),
      name: "",
      contactNumber: "",
      street: "",
      city: "",
      state: "",
      landmark: "",
      zipcode: "",
    };
  },
  getFilteredData: (arr, value) => {
    return arr.filter((val) => {
      return (val.value || val) === value;
    });
  },
  getSortingData: () => {
    return [
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
  },
  sortByField: (arr, key, type) => {
    if (!key || typeof arr[0] !== "object") return;

    if (type === "DESC") {
      arr.sort((a, b) => {
        return b[key] - a[key];
      });
    } else {
      arr.sort((a, b) => {
        return a[key] - b[key];
      });
    }

    return arr;
  },
  sortBy: (arr, type) => {
    if (type === "DESC") {
      arr.sort((a, b) => {
        return b - a;
      });
      return;
    }

    arr.sort((a, b) => {
      return a - b;
    });
  },
  style: {
    Item: () => {
      return styled(Paper)(({ theme }) => ({
        backgroundColor: "transparent",
        boxShadow: "none",
      }));
    },
  },
};

export const Utilities = {
  token: () => {
    return sessionStorage.getItem("token");
  },
  getuserId: () => {
    return sessionStorage.getItem("id");
  },
  isAdmin: () => {
    return sessionStorage.getItem("isAdmin") === "true";
  },
  getAuthoriztion: () => {
    return "Bearer " + Utilities.token();
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
  getEmptyUser: () => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
      contactNumber: "",
    };
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
};

import { Utilities } from "../utilities";

const productapi = {
  getProduct: async (id) => {
    return fetch("http://localhost:8080/api/products/" + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;UTF-8",
      },
    }).then((response) => response.json());
  },
  getProducts: async () => {
    return fetch("http://localhost:8080/api/products", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;UTF-8",
      },
    }).then((response) => response.json());
  },
  addProduct: async (data) => {
    return fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;UTF-8",
        Authorization: Utilities.getAuthoriztion(),
      },
      body: JSON.stringify(data),
    });
  },
  updateProduct: async (data) => {
    return fetch("http://localhost:8080/api/products/" + data.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;UTF-8",
        Authorization: Utilities.getAuthoriztion(),
      },
      body: JSON.stringify(data),
    });
  },
  deleteProducts: async (id) => {
    return fetch("http://localhost:8080/api/products/" + id, {
      method: "DELETE",
      headers: {
        Authorization: productapi.getAuthoriztion(),
      },
    });
  },
  getCategories: async () => {
    return fetch("http://localhost:8080/api/products/categories", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  },
};

export default productapi;

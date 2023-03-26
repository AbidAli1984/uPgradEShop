import { Utilities } from "../utilities";

const productapi = {
  getProduct: async (id) => {
    try {
      const rawResponse = await fetch(
        "http://localhost:8080/api/products/" + id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;UTF-8",
          },
        }
      );

      return rawResponse.ok ? rawResponse.json() : null;
    } catch (error) {
      return null;
    }
  },
  getProducts: async () => {
    try {
      const rawResponse = await fetch("http://localhost:8080/api/products", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;UTF-8",
        },
      });

      return await (rawResponse.ok ? rawResponse.json() : null);
    } catch (error) {
      return null;
    }
  },
  addProduct: async (data) => {
    try {
      const rawResponse = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;UTF-8",
          Authorization: Utilities.getAuthoriztion(),
        },
        body: JSON.stringify(data),
      });

      return await (rawResponse.ok ? rawResponse.text() : null);
    } catch (error) {
      return null;
    }
  },
  updateProduct: async (data) => {
    try {
      const rawResponse = await fetch(
        "http://localhost:8080/api/products/" + data.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;UTF-8",
            Authorization: Utilities.getAuthoriztion(),
          },
          body: JSON.stringify(data),
        }
      );

      return rawResponse.ok;
    } catch (error) {
      return null;
    }
  },
  deleteProducts: async (id) => {
    try {
      const rawResponse = await fetch(
        "http://localhost:8080/api/products/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: Utilities.getAuthoriztion(),
          },
        }
      );
      return rawResponse;
    } catch (error) {
      return null;
    }
  },
  getCategories: async () => {
    try {
      const rawResponse = await fetch(
        "http://localhost:8080/api/products/categories",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return rawResponse.ok ? rawResponse.json() : null;
    } catch (error) {
      return null;
    }
  },
};

export default productapi;

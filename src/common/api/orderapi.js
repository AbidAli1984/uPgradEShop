import { Utilities } from "../utilities";

const orderapi = {
  placeOrder: async function (data) {
    try {
      const rawResponse = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;UTF-8",
          Authorization: Utilities.getAuthoriztion(),
        },
        body: JSON.stringify(data),
      });
      return rawResponse.ok ? rawResponse.text() : null;
    } catch (error) {
      return null;
    }
  },
};

export default orderapi;

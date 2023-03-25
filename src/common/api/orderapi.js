import { Utilities } from "../utilities";

const orderapi = {
  placeOrder: async function (data) {
    return fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;UTF-8",
        Authorization: Utilities.getAuthoriztion(),
      },
      body: JSON.stringify(data),
    }).then((response) => response.text());
  },
};

export default orderapi;

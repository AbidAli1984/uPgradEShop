import { Utilities } from "../utilities";

const addressapi = {
  saveaddress: async function (address) {
    const rawResponse = await fetch("http://localhost:8080/api/addresses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;UTF-8",
        Authorization: Utilities.getAuthoriztion(),
      },
      body: JSON.stringify(address),
    });
    if (rawResponse.ok) {
      const result = rawResponse;
    } else {
    }
  },
  getAddress: async (id) => {
    return fetch("http://localhost:8080/api/addresses/" + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;UTF-8",
        Authorization: Utilities.getAuthoriztion(),
      },
    }).then((response) => response.json());
  },
  getAddresses: async () => {
    return fetch("http://localhost:8080/api/addresses/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;UTF-8",
        Authorization: Utilities.getAuthoriztion(),
      },
    }).then((response) => response.json());
  },
};

export default addressapi;

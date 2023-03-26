import { Utilities } from "../utilities";

const addressapi = {
  saveaddress: async function (address) {
    try {
      const rawResponse = await fetch("http://localhost:8080/api/addresses", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;UTF-8",
          Authorization: Utilities.getAuthoriztion(),
        },
        body: JSON.stringify(address),
      });

      return await (rawResponse.ok ? rawResponse.text() : null);
    } catch (error) {
      return null;
    }
  },
  getAddress: async (id) => {
    try {
      const rawResponse = await fetch(
        "http://localhost:8080/api/addresses/" + id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;UTF-8",
            Authorization: Utilities.getAuthoriztion(),
          },
        }
      );

      return await (rawResponse.ok ? rawResponse.json() : null);
    } catch (error) {
      return null;
    }
  },
  getAddresses: async () => {
    try {
      const rawResponse = await fetch("http://localhost:8080/api/addresses/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;UTF-8",
          Authorization: Utilities.getAuthoriztion(),
        },
      });

      return await (rawResponse.ok ? rawResponse.json() : null);
    } catch (error) {
      return null;
    }
  },
};

export default addressapi;

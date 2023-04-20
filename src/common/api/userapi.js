import { Utilities } from "../utilities";

const userapi = {
  register: async function (data) {
    try {
      const rawResponse = await fetch(Utilities.URL.register, {
        method: "POST",
        headers: Utilities.getHeaders,
        body: JSON.stringify(data),
      });

      return rawResponse;
      // const result = await rawResponse.json(); // (rawResponse.ok ? rawResponse.text() : null);
      // return result;
    } catch (error) {
      return null;
    }
  },
};

export default userapi;

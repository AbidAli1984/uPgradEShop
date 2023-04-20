import { Utilities } from "../utilities";

const authapi = {
  login: async (data) => {
    try {
      const rawResponse = await fetch(Utilities.URL.login, {
        method: "POST",
        headers: Utilities.getHeaders,
        body: JSON.stringify(data),
      });

      return await (rawResponse.ok ? rawResponse.json() : null);
    } catch (error) {
      return null;
    }
  },
};

export default authapi;

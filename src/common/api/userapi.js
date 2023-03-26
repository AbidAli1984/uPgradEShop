const userapi = {
  register: async function (data) {
    try {
      const rawResponse = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;UTF-8",
        },
        body: JSON.stringify(data),
      });

      const result = await (rawResponse.ok ? rawResponse.text() : null);
      return result;
    } catch (error) {
      return null;
    }
  },
};

export default userapi;

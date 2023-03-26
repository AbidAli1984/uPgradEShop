const authapi = {
  login: async (data) => {
    try {
      const rawResponse = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json;UTF-8",
        },
        body: JSON.stringify(data),
      });

      return await (rawResponse.ok ? rawResponse.json() : null);
    } catch (error) {
      return null;
    }
  },
};

export default authapi;

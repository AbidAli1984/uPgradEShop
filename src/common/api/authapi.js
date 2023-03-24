const authapi = {
  signup: async function ({
    email,
    isAdmin,
    password,
    firstName,
    lastName,
    contactNumber,
  }) {
    const role = isAdmin ? "admin" : "user";

    var data = {
      email: email,
      role: [role],
      password: password,
      firstName: firstName,
      lastName: lastName,
      contactNumber: contactNumber,
    };

    const rawResponse = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;UTF-8",
      },
      body: JSON.stringify(data),
    });
    if (rawResponse.ok) {
      const result = rawResponse;
      console.log(result);
    } else {
    }
  },
  login: function (data) {
    return fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json;UTF-8",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      return response.ok ? response.json() : null;
    });
  },
};

export default authapi;
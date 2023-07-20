export const register = async (username, password) => {
  try {
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Registration failed.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Registration failed.");
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Login failed.");
  }
};

export const logOut = async () => {
  try {
    const response = await fetch("/api/auth/logout");

    if (!response.ok) {
      throw new Error("Logout failed.");
    }

    const data = response.json();
    return data;
  } catch (error) {
    throw new Error("Logout failed.");
  }
};

export const fetchMe = async () => {
  try {
    const response = await fetch(`/api/auth/me`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user data.");
  }
};

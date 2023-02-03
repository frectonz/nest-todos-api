const API_URL = "http://localhost:3000";

type AuthResponse =
  | {
      access_token: string;
    }
  | {
      message: string;
    };

export const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return await response.json();
};

export const register = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return await response.json();
};

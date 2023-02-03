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

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const getTodos = async (
  token: string
): Promise<
  | Todo[]
  | {
      statusCode: number;
      message: string;
    }
> => {
  const response = await fetch(`${API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

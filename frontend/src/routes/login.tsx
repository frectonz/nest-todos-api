import { Box, Container } from "@mui/system";
import { Link, Typography } from "@mui/material";
import { useState } from "react";
import { Link as NavLink, Navigate } from "react-router-dom";

import { login } from "../api";
import { SignUpForm } from "../components";
import { useAuthDispatch, useAuthStore } from "../stores/auth";

export const Login = () => {
  const store = useAuthStore();
  const dispatch = useAuthDispatch();
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (username: string, password: string) => {
    const res = await login(username, password);

    if ("access_token" in res) {
      dispatch({
        type: "SET_TOKEN",
        payload: {
          username,
          accessToken: res.access_token,
        },
      });
    } else {
      setError(true);
    }
  };

  if (store) return <Navigate to="/" />;

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Sign In
        </Typography>

        {error && (
          <Typography component="p" variant="body2" color="error">
            Invalid username or password
          </Typography>
        )}

        <SignUpForm submitButtonText="Sign In" onSubmit={handleSubmit} />

        <NavLink to="/register">
          <Link component="span" variant="body2">
            Don't have an account? Register
          </Link>
        </NavLink>
      </Box>
    </Container>
  );
};

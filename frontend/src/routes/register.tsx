import { useState } from "react";
import { Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { Box, Container } from "@mui/system";

import { register } from "../api";
import { SignUpForm } from "../components";
import { useAuthDispatch, useAuthStore } from "../stores/auth";

export const Register = () => {
  const store = useAuthStore();
  const dispatch = useAuthDispatch();
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (username: string, password: string) => {
    const res = await register(username, password);

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
          Register
        </Typography>

        {error && (
          <Typography component="p" variant="body2" color="error">
            Something went wrong
          </Typography>
        )}

        <SignUpForm submitButtonText="Register" onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
};

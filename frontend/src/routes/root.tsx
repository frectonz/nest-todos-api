import {
  Box,
  Paper,
  Stack,
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { Container } from "@mui/system";
import { Navigate } from "react-router-dom";
import { Check, Delete } from "@mui/icons-material";

import { getTodos } from "../api";
import { useAuthDispatch, useAuthStore } from "../stores/auth";

export const Root = () => {
  const authStore = useAuthStore();
  const authDispatch = useAuthDispatch();

  if (!authStore) {
    return <Navigate to="/login" replace={true} />;
  }

  const logout = () => {
    authDispatch({ type: "CLEAR_TOKEN" });
  };

  const { data } = useQuery("todos", () => getTodos(authStore.accessToken));

  if (data && "statusCode" in data) {
    authDispatch({ type: "CLEAR_TOKEN" });
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {authStore.username}'s Todos
          </Typography>

          <Button color="inherit" onClick={logout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Todos
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          {data &&
            data.map((todo) => (
              <Paper
                key={todo.id}
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  {todo.completed ? (
                    <Typography
                      variant="h5"
                      sx={{ textDecoration: "line-through" }}
                    >
                      {todo.title}
                    </Typography>
                  ) : (
                    <Typography variant="h5">{todo.title}</Typography>
                  )}
                </Box>
                <Box>
                  <IconButton>
                    <Delete />
                  </IconButton>
                </Box>
              </Paper>
            ))}
        </Stack>
      </Container>
    </Box>
  );
};

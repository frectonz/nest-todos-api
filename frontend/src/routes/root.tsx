import { Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuthDispatch, useAuthStore } from "../stores/auth";

export const Root = () => {
  const authStore = useAuthStore();
  const authDispatch = useAuthDispatch();

  if (!authStore) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <main>
      <h1>Hi {authStore.username}</h1>
      <Button
        onClick={() => {
          authDispatch({ type: "CLEAR_TOKEN" });
        }}
      >
        Log Out
      </Button>
    </main>
  );
};

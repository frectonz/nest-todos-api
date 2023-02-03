import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { Root, Login, Register } from "./routes";
import { AuthStoreProvider } from "./stores/auth";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthStoreProvider>
        <RouterProvider router={router} />
      </AuthStoreProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

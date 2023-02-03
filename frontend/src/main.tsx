import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { login } from "./api";
import { Root, Login, Register } from "./routes";
import { AuthStoreProvider, useAuthDispatch } from "./stores/auth";

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
    <AuthStoreProvider>
      <RouterProvider router={router} />
    </AuthStoreProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import TodoProvider from "./TodoProvider.tsx";
import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AuthProvider from "./components/AuthProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
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
    <AuthProvider>
      <TodoProvider>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <RouterProvider router={router} />
        </MantineProvider>
      </TodoProvider>
    </AuthProvider>
  </React.StrictMode>
);

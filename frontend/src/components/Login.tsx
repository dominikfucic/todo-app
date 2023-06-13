import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth?.user) return <Navigate to="/" replace />;

  return <div>
    <h1>Login</h1>
    <button onClick={() => navigate("/register")}>Register</button>
  </div>;
}

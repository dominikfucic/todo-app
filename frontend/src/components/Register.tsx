import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function Register() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth?.user) return <Navigate to="/" replace />;

  return (
    <div>
      <h1>Register</h1>
      <button onClick={() => navigate("/login")}>Back to login</button>
    </div>
  );
}

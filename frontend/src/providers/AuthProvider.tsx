import React from "react";
import api from "../axios";
import { AxiosError } from "axios";

export const AuthContext = React.createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<User | null>(() => {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);
    return null;
  });
  const [error, setError] = React.useState("");

  const getUser = async () => {
    try {
      const res = await api.get("/users/getUser");
      const user = res.data;
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    const user = {
      email,
      password,
    };
    try {
      const res = await api.post("/users/login", user);
      const token = res.data.token as string;
      if (token) {
        localStorage.setItem("token", token);
        await getUser();
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          setError(error.response.data.message);
        }
      }
      setError("Something went wrong");
    }
  };

  const signup = async (
    email: string,
    password: string,
    fullName: string
  ): Promise<void> => {
    const user = {
      email,
      password,
      fullName,
    };
    try {
      const res = await api.post("/users/signup", user);
      const token = res.data.token as string;
      if (token) {
        localStorage.setItem("token", token);
        await getUser();
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          setError(error.response.data.message);
        }
      }
      setError("Something went wrong");
    }
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, setError, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

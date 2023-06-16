import React from "react";
import axios from "axios";

interface AuthContextType {
  user: any;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
  const authContext = React.useContext(AuthContext);
  return authContext;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState(null);

  const login = (user: any) => {
    axios.post("/api/users/login", user).then((res) => {
      
    });
  };

  const signup = () => {};

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

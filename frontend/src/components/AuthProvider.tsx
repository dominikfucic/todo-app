import React from "react";

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

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

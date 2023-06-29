import React from "react";

export default function useToken() {
  const [token, setToken] = React.useState<string | null>(() => {
    const storedValue = localStorage.getItem("token");
    return storedValue ? JSON.parse(storedValue) : null;
  });

  React.useEffect(() => {
    localStorage.getItem("token");
  }, []);

  return token
}

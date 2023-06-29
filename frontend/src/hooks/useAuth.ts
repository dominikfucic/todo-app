import { AuthContext } from "../providers/AuthProvider";
import React from 'react'

export function useAuth() {
    const authContext = React.useContext(AuthContext);
    return authContext;
  }
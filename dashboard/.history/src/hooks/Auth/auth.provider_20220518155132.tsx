import React from "react";
import { AuthContextData } from "./auth.types";

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  return children;
};

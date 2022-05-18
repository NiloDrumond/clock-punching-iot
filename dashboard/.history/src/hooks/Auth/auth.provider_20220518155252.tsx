import React from "react";
import { AuthContextData, SignInData } from "./auth.types";

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = React.useCallback((data: SignInData) => {
    return;
  }, []);

  const signOut = React.useCallback(() => {
    return;
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

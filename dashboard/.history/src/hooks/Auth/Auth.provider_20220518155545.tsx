import React, { PropsWithChildren } from "react";
import { AuthContextData, SignInData } from "./auth.types";

export const AuthContext = React.createContext<AuthContextData>(
  {} as AuthContextData
);

function AuthProvider({ children }: PropsWithChildren<{}>) {
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
}

export default AuthProvider;

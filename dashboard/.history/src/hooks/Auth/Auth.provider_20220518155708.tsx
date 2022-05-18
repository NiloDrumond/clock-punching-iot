import React, { PropsWithChildren } from "react";
import { AuthContextData, SignInData } from "./Auth.types";

export const AuthContext = React.createContext<AuthContextData>(
  {} as AuthContextData
);

function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [token, setToken] = React.useState<string | undefined>(undefined);

  const signIn = React.useCallback((data: SignInData) => {
    return;
  }, []);

  const signOut = React.useCallback(() => {
    return;
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLoading, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

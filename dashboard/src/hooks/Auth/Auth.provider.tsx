import { config } from "@/config";
import api from "@/modules/shared/http/ApiHelper";
import React, { PropsWithChildren } from "react";
import { AuthContextData, SignInData } from "./Auth.types";

export const AuthContext = React.createContext<AuthContextData>(
  {} as AuthContextData
);

function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [token, setToken] = React.useState<string | undefined>(undefined);

  const signIn = React.useCallback(async (data: SignInData) => {
    setIsLoading(true);
    try {
      const response = await api.post({ url: config.LOGIN_URL, body: data });
      if (response.body.access_token) {
        setToken(response.body.access_token);
        api.setToken(`Bearer ${response.body.access_token}`);
        setIsLoading(false);
        return true;
      }
      return false;
    } catch (e) {
      setIsLoading(false);
      return false;
    }
  }, []);

  const signOut = React.useCallback(() => {
    setToken(undefined);
    api.clearToken();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLoading, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

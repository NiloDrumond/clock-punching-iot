import { useContext } from "react";
import { AuthContext } from "./Auth.provider";
import { AuthContextData, AuthenticatedContextData } from "./Auth.types";

export function useAuthenticated(): AuthenticatedContextData {
  const context = useContext(AuthContext);

  if (!context.token) {
    throw new Error("useAuth must be used when token is set");
  }

  return context;
}

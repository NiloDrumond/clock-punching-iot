import { useContext } from "react";
import { AuthContext } from "./Auth.provider";
import { AuthContextData, AuthenticatedContextData } from "./Auth.types";

export function useAuthenticated(): AuthenticatedContextData {
  const { token, ...rest } = useContext(AuthContext);

  if (!token) {
    throw new Error("useAuth must be used when token is set");
  }

  return { token, ...rest };
}

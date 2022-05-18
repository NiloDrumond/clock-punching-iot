import Router from "next/router";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./Auth.provider";
import { AuthContextData, AuthenticatedContextData } from "./Auth.types";

export function useAuthenticated(): AuthenticatedContextData {
  const { token, ...rest } = useContext(AuthContext);
  const { push } = useRouter();

  if (!token) {
    push("/login");
    throw new Error("useAuth must be used when token is set");
  }

  return { token, ...rest };
}

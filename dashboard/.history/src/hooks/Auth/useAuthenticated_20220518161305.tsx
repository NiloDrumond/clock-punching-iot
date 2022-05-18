import Router from "next/router";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./Auth.provider";
import { AuthContextData, AuthenticatedContextData } from "./Auth.types";
import React from "react";

export function useAuthenticated(): AuthenticatedContextData {
  const { token, ...rest } = useContext(AuthContext);
  const { push } = useRouter();

  React.useEffect(() => {
    if (!token) {
      push("/login");
    }
  }, [push, token]);

  return { token: "", ...rest };
}

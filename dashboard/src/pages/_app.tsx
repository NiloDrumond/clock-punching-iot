import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "../hooks/Auth/Auth.provider";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;

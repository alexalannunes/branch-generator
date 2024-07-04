import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </BrowserRouter>
  );
}

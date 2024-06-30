import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

const theme = extendTheme({
  fonts: {
    body: `'Open Sans', sans-serif`,
  },
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </BrowserRouter>
  );
}

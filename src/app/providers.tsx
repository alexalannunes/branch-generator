import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/roboto";

const theme = extendTheme({
  fonts: {
    body: `'Roboto', sans-serif`,
    heading: `'Roboto', sans-serif`,
  },
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </BrowserRouter>
  );
}

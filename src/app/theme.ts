import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: `sans-serif`,
    heading: `sans-serif`,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  semanticTokens: {
    colors: {
      container: {
        background: {
          default: "gray.100",
          _dark: "gray.700",
        },
        border: {
          default: "gray.200",
          _dark: "gray.600",
        },
      },
    },
  },
});

export { theme };

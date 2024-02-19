import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const styles = {
  global: {
    body: {
      color: "gray.100",
    },
    a: {
      color: "#fff",
    },
  },
};

const colors = {
  barber: {
    900: "#12131b",
    400: "#1b1c29",
    100: "#c6c6c6",
  },
  button: {
    cta: "#fba931",
    default: "#FFF",
    gray: "#DFDFDF",
    danger: "#FF4040",
  },
  orange: {
    900: "#fba931",
  },
};

const theme = extendTheme({ styles, colors });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      </AuthProvider>
    </ChakraProvider>
  );
}

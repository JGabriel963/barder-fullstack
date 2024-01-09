import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { extendTheme } from "@chakra-ui/react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const colors = {
  barber: {
    900: "#12131b",
    400: "#1b1c29",
    100: "#c6c6c6",
  },
  button: {
    cta: "#fba951",
    default: "#fff",
    gray: "#dfdfdf",
    danger: "#ff4040",
  },
  orange: {
    900: "#fba931",
  },
};

const theme = extendTheme({ colors });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <main className={poppins.className}>
        {" "}
        <Component {...pageProps} />{" "}
      </main>
    </ChakraProvider>
  );
}
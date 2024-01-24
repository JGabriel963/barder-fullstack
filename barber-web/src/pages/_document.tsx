import Document, { Head, Html, Main, NextScript } from "next/document";
import { JSX } from "react";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <title>Barber PRO</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

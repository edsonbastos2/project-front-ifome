import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="manifest.json" />
        <link rel="apple-touch-icon" href="/img/512.svg" />
        <meta name="theme-color" content="#81AF80" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import { ToastProvider } from "@nature-ui/core";
import { ColorModeProvider } from "components/color-mode";
import siteConfig from "configs/site-config";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#111516" />
        <meta name="color-scheme" content="dark" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://static.cloudflareinsights.com" />
        <meta name="yandex-verification" content="04504247f14d7c37" />
      </Head>
      <DefaultSeo {...siteConfig.seo} />
      <ColorModeProvider
        options={{
          initialColorMode: "system",
        }}
      >
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </ColorModeProvider>
    </>
  );
}

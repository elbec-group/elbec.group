/* eslint-disable @next/next/no-page-custom-font */
import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { I18NProvider, useI18N } from 'context/i18n.js';
import {Menu} from "../components/Menu"
import * as gtag from "../utils/gtag";
import "../styles/globals.css";

const Elbec = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const {route} = router

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      process.env.NODE_ENV === "production" && gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
  <>
    <I18NProvider>
      <Head>
        <title>elbec group</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="educación lingüística basada en evidencia científica"
        />
        <meta name="theme-color" content="#153d59" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
            href="https://fonts.googleapis.com/css2?family=BioRhyme:wght@700&family=Open+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />

      </Head>
      {route !== '/admin' ? <Menu /> : null}
      <Component {...pageProps} />
    </I18NProvider>
  </>
  );
};

Elbec.displayName = "Elbec";

export default Elbec;

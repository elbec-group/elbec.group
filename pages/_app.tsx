import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import * as gtag from "../utils/gtag";
import "../styles/globals.css";

const Elbec = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

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
    <Head>
      <title>elbec group</title>
      <meta
        name="description"
        content="Educación lingüística basada en evidencias científicas"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
    </Head>
    <Component {...pageProps} />
  </>
  );
};

Elbec.displayName = "Elbec";

export default Elbec;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../layouts/Layout";
import "windi.css";
import { ThemeProvider } from "next-themes";
import party from "party-js";
import NextNProgress from "nextjs-progressbar";
import { DynamicSourceType } from "party-js/lib/systems/sources";
import Head from "next/head";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let emitter = null;
  function fun(e) {
    e.preventDefault();
    this.style.cursor = "pointer";
    e.stopPropagation();
    emitter = party.confetti(e as MouseEvent, {
      // party.variation.range(18) party.variation.range(0.8, 10)
      count: 18,
      size: 0.6,
    });
  }
  if (typeof window !== "undefined") {
    document.querySelector("body").addEventListener("click", fun);
  }
  useEffect(() =>{
    router.events.on("routeChangeStart", () => {
      document.querySelector("body").removeEventListener("click", fun);
    });
  })
  
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Head>
          <title>XGG</title>
          <link rel="shortcut icon" href="/avatar1.ico" />
        </Head>
        <ScrollToTop />
        <NextNProgress height={4} color="#6CC4A1" />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;

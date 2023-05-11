import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  NProgress.configure({ showSpinner: true });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <title>Tiktok clone</title>
      </Head>
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
      >
        <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
          <Navbar />
          {/* <div className="flex gap-6 md:gap-20"> */}
          {/* <div className="h-[92vh] overflow-hidden">
              <Sidebar />
            </div> */}
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            <Component {...pageProps} />
          </div>
          {/* </div> */}
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default MyApp;

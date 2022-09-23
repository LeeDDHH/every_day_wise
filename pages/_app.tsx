// import "../styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from "next/app";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps}>
        <CssBaseline />
      </Component>
    </>
  );
};

export default App;

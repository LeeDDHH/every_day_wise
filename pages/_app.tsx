"use strict";

import Head from "next/head";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";

import { theme, initTheme } from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";

import { ColorModeContext, ToggleColorMode } from "../lib/hooks/context/ColorModeContext";

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) => {
  const { mode, colorMode } = ToggleColorMode();

  initTheme({ mode });
  return (
    <ColorModeContext.Provider value={colorMode}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  );
};

export default App;

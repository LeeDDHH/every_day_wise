"use strict";

import Head from "next/head";
import type { AppProps } from "next/app";
import { useEffect } from "react";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";
import { CacheProvider, EmotionCache } from "@emotion/react";

import { theme, initTheme } from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";

import { ColorModeContext, ToggleColorMode } from "../lib/hooks/context/ColorModeContext";

import { uiModeKey } from "../lib/Const";

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) => {
  const { mode, setMode, colorMode } = ToggleColorMode();

  initTheme({ mode });

  useEffect(() => {
    const uimode = localStorage.getItem(uiModeKey);
    let prevMode: PaletteMode;

    if (!uimode) {
      const isSystemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      prevMode = isSystemDarkMode ? "dark" : "light";
      localStorage.setItem(uiModeKey, prevMode);
    } else {
      prevMode = uimode === "light" ? "light" : "dark";
    }

    setMode(prevMode);
  }, []);

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

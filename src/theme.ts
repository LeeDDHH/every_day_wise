"use strict";

import { PaletteMode, Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
// import { red } from "@mui/material/colors";

import { useMemo } from "react";

// TODO:レスポンシブ対応用の設定をする
// Create a theme instance.

type Props = { mode: PaletteMode };

let theme: Theme;

const MakeTheme = ({ mode }: Props) => {
  return useMemo(
    () =>
      createTheme({
        // Default theme
        // https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 1025,
            xl: 1536,
          },
        },
        typography: {
          fontFamily: [
            "-apple-system",
            '"M PLUS 1p"',
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
        },
        // Palette
        // https://mui.com/material-ui/customization/palette/
        palette: {
          mode: mode ?? "dark",
          ...(mode === "light"
            ? {
                // palette values for light mode
                background: {
                  default: "#E1E6F0",
                  paper: "#FFFFFF",
                },
                text: {
                  primary: "#07080B",
                  secondary: "#37445C",
                },
              }
            : {
                // palette values for dark mode
                background: {
                  default: "#1E212B",
                  paper: "#393C4B",
                },
                text: {
                  primary: "#FFFFFF",
                  secondary: "#C5CADA",
                },
              }),
        },
      }),
    [mode]
  );
};

const initTheme = ({ mode }: Props) => {
  theme = MakeTheme({ mode });
};

export { theme, initTheme };

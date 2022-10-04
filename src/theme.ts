"use strict";

import { PaletteMode, Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

import { useMemo } from "react";

// TODO:日本語用のフォントを導入する
// TODO:レスポンシブ対応用の設定をする
// Create a theme instance.

type Props = { mode: PaletteMode };

let theme: Theme;

const MakeTheme = ({ mode }: Props) => {
  return useMemo(
    () =>
      createTheme({
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
        palette: {
          mode: mode ?? "dark",
          primary: {
            main: "#556cd6",
          },
          secondary: {
            main: "#19857b",
          },
          error: {
            main: red.A400,
          },
        },
      }),
    [mode]
  );
};

// const theme = createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 768,
//       lg: 1025,
//       xl: 1536,
//     },
//   },
//   typography: {
//     fontFamily: [
//       "-apple-system",
//       '"M PLUS 1p"',
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//   },
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#556cd6",
//     },
//     secondary: {
//       main: "#19857b",
//     },
//     error: {
//       main: red.A400,
//     },
//   },
// });

const initTheme = ({ mode }: Props) => {
  theme = MakeTheme({ mode });
};

export { theme, initTheme };

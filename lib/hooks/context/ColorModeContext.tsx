"use strict";

import React, { useState, useMemo } from "react";
import { PaletteMode } from "@mui/material";

import { uiModeKey } from "../../../lib/Const";

const ColorModeContext = React.createContext({ toggleColorMode: () => {}, mode: "light" });

const ToggleColorMode = () => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const nowMode = localStorage.getItem(uiModeKey);
        const nextMode = nowMode === "light" ? "dark" : "light";
        localStorage.setItem(uiModeKey, nextMode);
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );
  return { mode, setMode, colorMode };
};

export { ColorModeContext, ToggleColorMode };

"use strict";

import React, { useState, useMemo } from "react";
import { PaletteMode } from "@mui/material";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const ToggleColorMode = () => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  return { mode, colorMode };
};

export { ColorModeContext, ToggleColorMode };

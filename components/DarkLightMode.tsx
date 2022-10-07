"use strict";

import Image from "next/image";
import { memo, useContext } from "react";
import { IconButton, Box } from "@mui/material";

import { ColorModeContext } from "../lib/hooks/context/ColorModeContext";

import { allElementCenterStyle } from "../lib/muiStyle";

import Moon from "../public/moon.svg";
import Sun from "../public/sun.svg";

const DarkLightMode = memo(() => {
  const colorMode = useContext(ColorModeContext);
  return (
    <Box sx={allElementCenterStyle}>
      <IconButton onClick={colorMode.toggleColorMode}>
        <Image
          width="30px"
          height="30px"
          src={colorMode.mode === "dark" ? Sun : Moon}
          alt={colorMode.mode === "dark" ? "dark" : "light"}
        />
      </IconButton>
    </Box>
  );
});

if (process.env.NODE_ENV === "development") {
  DarkLightMode.displayName = "DarkLightMode";
}

export { DarkLightMode };

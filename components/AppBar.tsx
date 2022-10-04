"use strict";

// TODO:画面のヘッダーを作る

import Link from "next/link";
import { useContext } from "react";
import {
  AppBar as MUIAppBar,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Button,
  MenuItem,
  Icon,
  Box,
} from "@mui/material";

import { ColorModeContext } from "../lib/hooks/context/ColorModeContext";

const AppBar = () => {
  const colorMode = useContext(ColorModeContext);
  return (
    <Box sx={{ marginBottom: "5vh" }}>
      ヘッダー
      <Button onClick={colorMode.toggleColorMode}>モードチェンジ</Button>
    </Box>
  );
};

export { AppBar };

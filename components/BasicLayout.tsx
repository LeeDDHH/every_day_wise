"use strict";

// TODO:ヘッダーとコンテンツを表示するためのレイアウトを作る

import type { NextPage } from "next";
// import Link from "next/link";
import { Box } from "@mui/material";

import { AppBar } from "./AppBar";

type Props = { children: React.ReactNode };

const BasicLayout: NextPage<Props> = ({ children }) => {
  return (
    <Box>
      <AppBar />
      {children}
    </Box>
  );
};

export default BasicLayout;

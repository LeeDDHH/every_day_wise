"use strict";

import type { NextPage } from "next";
import { memo } from "react";
import { Box } from "@mui/material";

import BasicLayout from "../components/BasicLayout";
import { AboutApp } from "../components/AboutApp";

const About: NextPage = () => {
  return (
    <BasicLayout>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <AboutApp />
      </Box>
    </BasicLayout>
  );
};

if (process.env.NODE_ENV === "development") {
  About.displayName = "About";
}

export default memo(About);

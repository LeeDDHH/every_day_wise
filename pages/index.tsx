"use strict";

import { memo, useState, useMemo } from "react";
import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { Box, Card, CardContent, Typography } from "@mui/material";

import BasicLayout from "../components/BasicLayout";
import { getWise, updateLocalWiseJSON } from "../lib/wise";
import { useOneTimeMountEffect } from "../lib/hooks/useOneTimeMountEffect";
import { CardBreakPointTextSize } from "../components/CardBreakPointTextSize";

type Props = { allWiseData: WiseDataArray };

const Home: NextPage<Props> = ({ allWiseData }) => {
  const [displayWiseIndex, setDisplayWiseIndex] = useState<number>(-1);

  useOneTimeMountEffect(() => updateLocalWiseJSON({ allWiseData, setDisplayWiseIndex }));

  const view = useMemo(() => {
    // 何かが原因で表示する名言・格言のインデックスが存在しない場合の表示方法を追加する
    if (displayWiseIndex < 0) return <Box>Can not display wise.</Box>;
    const displayString = allWiseData[displayWiseIndex].content.replace(/\\n/g, "\n");
    return (
      <CardContent>
        <Typography
          sx={{
            // fontSize: "6vw",
            whiteSpace: "pre-wrap",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CardBreakPointTextSize>{displayString}</CardBreakPointTextSize>
        </Typography>
      </CardContent>
    );
  }, [allWiseData, displayWiseIndex]);
  return (
    <BasicLayout>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant="outlined"
          sx={{
            width: "70vw",
            padding: "5vw",
            // backgroundColor: "#1E2022", color: "#DDDDDD"
          }}
        >
          {view}
        </Card>
      </Box>
    </BasicLayout>
  );
};

const getStaticProps = async () => {
  const allWiseData = await getWise();

  return {
    props: { allWiseData },
    revalidate: 5,
  };
};

export default memo(Home);
export { getStaticProps };

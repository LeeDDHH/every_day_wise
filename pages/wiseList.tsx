"use strict";

// TODO:名言・格言を一覧で表示するためのページを作る

import type { NextPage, GetStaticProps } from "next";
import { memo, useMemo } from "react";
import { Box } from "@mui/material";
import { getWise } from "../lib/wise";

type Props = { allWiseData: WiseDataArray };

const WiseList: NextPage<Props> = ({ allWiseData }) => {
  const view = useMemo(() => {
    return allWiseData.map((wiseData: WiseData) => {
      const displayString = wiseData.content.replace(/\\n/g, "\n");
      return (
        <Box key={`WiseData-${wiseData.id}`} sx={{ display: "flex", justifyContent: "center" }}>
          {displayString}
        </Box>
      );
    });
  }, [allWiseData]);
  return (
    <Box sx={{ fontSize: 50, whiteSpace: "pre-wrap", display: "flex", flexDirection: "column" }}>
      {view}
    </Box>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const allWiseData = await getWise();

  return {
    props: { allWiseData },
    revalidate: 5,
  };
};

export default memo(WiseList);
export { getStaticProps };

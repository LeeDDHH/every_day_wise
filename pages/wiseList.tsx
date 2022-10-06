"use strict";

import type { NextPage, GetStaticProps } from "next";
import { memo, useMemo } from "react";
import { Box } from "@mui/material";
import { getWise } from "../lib/wise";
import BasicLayout from "../components/BasicLayout";
import { WiseCard } from "../components/WiseCard";

type Props = { allWiseData: WiseDataArray };

const WiseList: NextPage<Props> = ({ allWiseData }) => {
  const view = useMemo(() => {
    return allWiseData.map((wiseData: WiseData) => {
      return <WiseCard key={`WiseData-${wiseData.id}`} text={wiseData.content} />;
    });
  }, [allWiseData]);
  return (
    <BasicLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "5vh",
          marginBottom: "5vh",
        }}
      >
        {view}
      </Box>
    </BasicLayout>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const allWiseData = await getWise();

  return {
    props: { allWiseData },
    revalidate: 3600,
  };
};

if (process.env.NODE_ENV === "development") {
  WiseList.displayName = "WiseList";
}

export default memo(WiseList);
export { getStaticProps };

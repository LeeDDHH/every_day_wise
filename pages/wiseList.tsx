"use strict";

import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { memo, useMemo } from "react";
import { Box } from "@mui/material";
import { getWise } from "../lib/wise";
import BasicLayout from "../components/BasicLayout";
import { WiseCard } from "../components/WiseCard";

type Props = { allWiseData: WiseDataArray };

const WiseList: NextPage<Props> = ({ allWiseData }) => {
  const view = useMemo(() => {
    return allWiseData.map((wiseData: WiseData) => {
      const linkWithWiseCard = (
        <Link href={`/wise/${wiseData.id}`} key={`WiseData-${wiseData.id}`}>
          <Box sx={{ cursor: "pointer", "&:hover .MuiCard-root": { backgroundColor: "#737a99" } }}>
            <WiseCard text={wiseData.content} />
          </Box>
        </Link>
      );
      return linkWithWiseCard;
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

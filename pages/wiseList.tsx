"use strict";

import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { memo, useMemo } from "react";
import { Box } from "@mui/material";
import { getWise } from "../lib/wise";
import BasicLayout from "../components/BasicLayout";
import { LinkWithWiseCard } from "../components/LinkWithWiseCard";

import { allElementCenterStyle } from "../lib/muiStyle";

type Props = { allWiseData: WiseDataArray };

const WiseList: NextPage<Props> = ({ allWiseData }) => {
  const view = useMemo(() => {
    return allWiseData.map((wiseData: WiseData) => {
      return (
        <Link href={`/wise/${wiseData.id}`} passHref key={`WiseData-${wiseData.id}`}>
          <LinkWithWiseCard text={wiseData.content} />
        </Link>
      );
    });
  }, [allWiseData]);
  return (
    <BasicLayout>
      <Box
        sx={{
          ...allElementCenterStyle,
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

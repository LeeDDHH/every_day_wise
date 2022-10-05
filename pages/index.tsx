"use strict";

// TODO:Twitterシェアボタン実装
import { memo, useState, useMemo } from "react";
import type { NextPage } from "next";
import { Box } from "@mui/material";

import BasicLayout from "../components/BasicLayout";
import { getWise, updateLocalWiseJSON } from "../lib/wise";
import { useOneTimeMountEffect } from "../lib/hooks/useOneTimeMountEffect";
import { WiseCard } from "../components/WiseCard";

type Props = { allWiseData: WiseDataArray };

const Home: NextPage<Props> = ({ allWiseData }) => {
  const [displayWiseIndex, setDisplayWiseIndex] = useState<number>(-1);

  useOneTimeMountEffect(() => updateLocalWiseJSON({ allWiseData, setDisplayWiseIndex }));

  const view = useMemo(() => {
    if (displayWiseIndex < 0) return <Box>Can not display wise.</Box>;
    return <WiseCard text={allWiseData[displayWiseIndex].content} />;
  }, [allWiseData, displayWiseIndex]);

  return (
    <BasicLayout>
      <Box sx={{ display: "flex", justifyContent: "center" }}>{view}</Box>
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

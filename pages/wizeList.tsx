"use strict";

import type { NextPage } from "next";
import { getWize } from "../lib/wise";

type Props = { allWizeData: WizeDataArray };

const WizeList: NextPage<Props> = ({ allWizeData }) => {
  const view = () => {
    return allWizeData.map((wizeData: WizeData) => (
      <div key={`wizeData-${wizeData.id}`}>{wizeData.content}</div>
    ));
  };
  return <div>{view()}</div>;
};

const getStaticProps = async () => {
  const allWizeData = await getWize();

  return {
    props: { allWizeData },
    revalidate: 5,
  };
};

export default WizeList;
export { getStaticProps };

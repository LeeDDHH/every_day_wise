"use strict";

import type { NextPage } from "next";

const Maintenance: NextPage = () => {
  return <div>メンテナンス中です</div>;
};

if (process.env.NODE_ENV === "development") {
  Maintenance.displayName = "Maintenance";
}

export default Maintenance;

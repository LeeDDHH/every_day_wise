"use strict";

const wiseSourceUrl =
  "https://gist.githubusercontent.com/LeeDDHH/07a3f3a59deee1d8d39e2af170b4b578/raw/d25dbd4e26bcdad6b4eb8a657c2d9ea9718dac1f/a_wise_remark_data.json";
const displayedWiseIdExpiredTimeKey = "displayedWiseIdExpiredTime";
const displayedWiseIdKey = "displayedWiseId";
const uiModeKey = "uiMode";
const headerLinkNameList = [
  {
    name: "Today",
    path: "/",
  },
  {
    name: "List",
    path: "/wiseList",
  },
  {
    name: "About",
    path: "/about",
  },
];

export {
  wiseSourceUrl,
  displayedWiseIdExpiredTimeKey,
  displayedWiseIdKey,
  uiModeKey,
  headerLinkNameList,
};

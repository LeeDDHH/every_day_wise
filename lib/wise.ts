"use strict";

import { apiCallWithFetch } from "./util";
import { wiseSourceUrl, displayedWizeIdExpiredTimeKey, displayedWizeIdKey } from "./Const";
import { getTimeNow, getTomorrowTime } from "./time";

// type WizeData = {
//   id: number;
//   content: string;
// };
// type WizeDataArray = WizeData[];

type UpdateLocalWiseJSONProps = {
  allWizeData: WizeDataArray;
  setDisplayWizeIndex: (id: number) => void;
};

/**
 * 名言、格言の配列データを返す
 * @returns {WizeDataArray} 名言、格言の配列データ
 */
const getWize = async (): Promise<WizeDataArray> => {
  const result = await apiCallWithFetch<WizeDataArray>(wiseSourceUrl);
  return result;
};

const updateLocalWiseJSON = ({ allWizeData, setDisplayWizeIndex }: UpdateLocalWiseJSONProps) => {
  const nowTime = getTimeNow();
  const tomorrow = getTomorrowTime();
  // nowtime2.getTime();
  const hasLocalExpiredTime = localStorage.getItem(displayedWizeIdExpiredTimeKey);
  const expiredTime = !hasLocalExpiredTime ? tomorrow : parseInt(hasLocalExpiredTime);

  const localData = localStorage.getItem(displayedWizeIdKey) ?? JSON.stringify([]);
  if (!localData) {
    localStorage.setItem(displayedWizeIdKey, JSON.stringify([]));
  }
  const localSavedWizeJSON: LocalSavedWizeIdArray = JSON.parse(localData);
  let newLocalSavedWizeJSON = [...localSavedWizeJSON];

  let randomId: number;

  if (!hasLocalExpiredTime || (hasLocalExpiredTime && expiredTime > nowTime)) {
    if (!hasLocalExpiredTime)
      localStorage.setItem(displayedWizeIdExpiredTimeKey, tomorrow.toString());

    if (!localSavedWizeJSON.length) {
      // console.log("aaa");
      randomId = Math.floor(Math.random() * allWizeData.length);
      newLocalSavedWizeJSON.push(randomId);
      localStorage.setItem(displayedWizeIdKey, JSON.stringify(newLocalSavedWizeJSON));
    } else {
      // console.log("bbb");
      randomId = (localSavedWizeJSON as WizeIdArray)[localSavedWizeJSON.length - 1];
    }
    // console.log(randomId);
    return setDisplayWizeIndex(randomId);
  }

  // ローカルに保存されたデータをJSON形式にする

  if (!localSavedWizeJSON.length) {
    randomId = Math.floor(Math.random() * allWizeData.length);
    newLocalSavedWizeJSON.push(randomId);
    localStorage.setItem(displayedWizeIdKey, JSON.stringify(newLocalSavedWizeJSON));
  } else {
    const sortFunc = (first: WizeData, second: WizeData) => {
      if (first.id > second.id) return 1;
      if (first.id < second.id) return -1;
      return 0;
    };
    allWizeData.sort(sortFunc);
    const remoteWizeDataIdArray = allWizeData.map((wizeData: WizeData) => wizeData.id);
    const concatRemoteAndLocalWizeDataIdArray = [...localSavedWizeJSON, ...remoteWizeDataIdArray];
    const uniqueRemoteWizeDataIdArray = concatRemoteAndLocalWizeDataIdArray.filter(
      (value, index, self) => self.indexOf(value) === self.lastIndexOf(value)
    );
    if (!uniqueRemoteWizeDataIdArray.length) {
      randomId = Math.floor(Math.random() * allWizeData.length);
      const reWizeJson = [randomId];
      localStorage.setItem(displayedWizeIdKey, JSON.stringify(reWizeJson));
    } else {
      const uniqueRemoteWizeIndex = Math.floor(Math.random() * uniqueRemoteWizeDataIdArray.length);
      randomId = uniqueRemoteWizeDataIdArray[uniqueRemoteWizeIndex];
      newLocalSavedWizeJSON.push(randomId);
      localStorage.setItem(displayedWizeIdKey, JSON.stringify(newLocalSavedWizeJSON));
    }
  }
  setDisplayWizeIndex(randomId);
};

export { getWize, updateLocalWiseJSON };

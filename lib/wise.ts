"use strict";

import { apiCallWithFetch } from "./util";
import { wiseSourceUrl, displayedWiseIdExpiredTimeKey, displayedWiseIdKey } from "./Const";
import { getTimeNow, getTomorrowTime } from "./time";

type UpdateLocalWiseJSONProps = {
  allWiseData: WiseDataArray;
  setDisplayWiseIndex: (id: number) => void;
};

type _HasLocalStoredWiseJSONProps = {
  allWiseData: WiseDataArray;
  newLocalStoredWiseJSON: number[];
};

type _AddNewIndexToLocalStoredWiseAndRetrieve = {
  allWiseData: WiseDataArray;
  localData: LocalStoredWiseIdArray;
};

type _LocalStorageStringDataToArray = {
  localStorageStringData: string;
  allWiseData: WiseDataArray;
};

/**
 * 空のローカルの名言・格言インデックス配列にランダムのインデックスを追加する
 *
 * @param {_HasLocalStoredWiseJSONProps} object
 * @param {WiseDataArray} object.allWiseData      名言・格言のデータ
 * @param {number[]} object.newLocalStoredWiseJSON ローカルの名言・格言インデックス配列
 * @returns {number} 名言・格言のデータから取得したランダムのインデックス
 */
const _pushRandomIdIntoEmptyWiseJSON = ({
  allWiseData,
  newLocalStoredWiseJSON,
}: _HasLocalStoredWiseJSONProps): number => {
  // 名言・格言のデータの中からインデックスをランダムに取得する
  const randomId: number = Math.floor(Math.random() * allWiseData.length);
  // ローカルの名言・格言インデックス配列にランダムのインデックスを追加する
  newLocalStoredWiseJSON.push(randomId);
  // ローカルストレージに新しい名言・格言インデックス配列を保存する
  localStorage.setItem(displayedWiseIdKey, JSON.stringify(newLocalStoredWiseJSON));
  return randomId;
};

/**
 * ローカルに保存された名言・格言インデックス配列の最後のインデックスを取得する
 *
 * @param localStoredWiseJSON ローカルの名言・格言インデックス配列
 * @returns {number} ローカルの名言・格言インデックス配列のインデックス
 */
const _getLastWiseIndexInLocalStored = (localStoredWiseJSON: WiseIdArray): number =>
  localStoredWiseJSON[localStoredWiseJSON.length - 1];

/**
 * ローカルの名言・格言インデックス配列の文字列データを配列に変換する
 *
 * @param object
 * @param object.localStorageStringData ローカルの名言・格言インデックス配列の文字列
 * @param object.allWiseData            名言・格言のデータ
 * @returns {number[]} 名言・格言インデックス配列
 */
const _localStorageStringDataToArray = ({
  localStorageStringData,
  allWiseData,
}: _LocalStorageStringDataToArray): number[] => {
  let localStorageArrayData: number[] = JSON.parse(localStorageStringData);

  /**
   * 1. ローカルの名言・格言インデックス配列が空だった場合
   * 2. ローカルの名言・格言インデックス配列の長さと名言・格言のデータの長さが同じだった場合
   * 名言・格言のデータから新しいインデックスをランダムで取得してローカルストレージに保存する
   */
  if (localStorageArrayData.length <= 0 || localStorageArrayData.length === allWiseData.length) {
    const randomId = _pushRandomIdIntoEmptyWiseJSON({
      allWiseData,
      newLocalStoredWiseJSON: [],
    });
    localStorageArrayData.push(randomId);
  }

  return localStorageArrayData;
};

/**
 * ローカルに保存された名言・格言インデックス配列に新しいインデックスを追加し、取得する
 *
 * @param {_AddNewIndexToLocalStoredWiseAndRetrieve} object
 * @param {WiseDataArray} object.allWiseData      名言・格言のデータ
 * @param {string} object.localData               ローカルの名言・格言インデックス配列
 * @returns {number} 名言・格言のデータにのみ存在するユニークなID
 */
const _addNewIndexToLocalStoredWiseAndRetrieve = ({
  allWiseData,
  localData,
}: _AddNewIndexToLocalStoredWiseAndRetrieve): number => {
  // 名言・格言のデータのidだけをまとめた配列
  const allWiseDataIdArray = allWiseData.map((v: WiseData) => v.id);
  // 名言・格言のデータのidだけをまとめた配列には存在して、ローカルの名言・格言インデックス配列には存在しないインデックスをまとめる
  const noExistIdArrayInLocalData = allWiseDataIdArray.filter(
    (i: number) => (localData as WiseIdArray).indexOf(i) == -1
  );
  // 名言・格言のデータにのみ存在するユニークなIDの配列の中でランダムのインデックスを取得する
  const noExistIdInLocalDataRandomIndex: number = Math.floor(
    Math.random() * noExistIdArrayInLocalData.length
  );
  // 名言・格言のデータにのみ存在するユニークなID
  const noExistIdInLocalData = noExistIdArrayInLocalData[noExistIdInLocalDataRandomIndex];

  const newLocalStoredWiseJSON = [...localData];
  // ローカルの名言・格言インデックス配列にランダムのインデックスを追加する
  newLocalStoredWiseJSON.push(noExistIdInLocalData);
  // ローカルストレージに新しい名言・格言インデックス配列を保存する
  localStorage.setItem(displayedWiseIdKey, JSON.stringify(newLocalStoredWiseJSON));

  return noExistIdInLocalData;
};

/**
 * 名言、格言の配列データを返す
 *
 * @returns {WiseDataArray} 名言、格言の配列データ
 */
const getWise = async (): Promise<WiseDataArray> => {
  const result = await apiCallWithFetch<WiseDataArray>(wiseSourceUrl);
  return result;
};

/**
 * 指定したidをもとに名言、格言のデータを返す
 *
 * @param {string} id 名言、格言データのid
 * @returns {WiseData | ""}
 */
const getOneWise = async (id: string): Promise<WiseData | ""> => {
  const IntId = parseInt(id);
  if (isNaN(IntId)) return "";
  const allWise = await getWise();
  const wiseIndex = allWise.findIndex((wise) => wise.id === IntId);
  if (wiseIndex < 0) return "";
  const result = allWise[wiseIndex];
  return result;
};

/**
 * ローカルで使う名言・格言のデータを選定し、そのインデックスを更新する
 *
 * @param {UpdateLocalWiseJSONProps} object
 * @param {WiseDataArray} object.allWiseData                名言・格言のデータ
 * @param {(id: number) => void} object.setDisplayWiseIndex 画面に表示するデータのインデックスを更新する関数
 * @returns {void}
 */
const updateLocalWiseJSON = ({
  allWiseData,
  setDisplayWiseIndex,
}: UpdateLocalWiseJSONProps): void => {
  const nowTime = getTimeNow();
  const tomorrow = getTomorrowTime();

  // ローカルの名言・格言表示期限時間
  const hasLocalExpiredTime = localStorage.getItem(displayedWiseIdExpiredTimeKey);
  const expiredTime = !hasLocalExpiredTime ? tomorrow : parseInt(hasLocalExpiredTime);

  // ローカルの名言・格言インデックス配列の文字列
  const localStorageStringData = localStorage.getItem(displayedWiseIdKey) ?? "[]";
  // ローカルの名言・格言インデックス配列
  const localStorageArrayData = _localStorageStringDataToArray({
    localStorageStringData,
    allWiseData,
  });

  // ローカルの名言・格言表示期限時間が存在しない場合、明日までの表示期限時間を設ける
  if (!hasLocalExpiredTime)
    localStorage.setItem(displayedWiseIdExpiredTimeKey, tomorrow.toString());

  // 使用期限の時間が現在の時間より未来の場合
  if (expiredTime > nowTime) {
    // ローカルの名言・格言インデックス配列の最後のインデックスを返す
    const randomId = _getLastWiseIndexInLocalStored(localStorageArrayData);
    return setDisplayWiseIndex(randomId);
  }

  // 使用期限の時間が現在の時間より過去の場合
  localStorage.setItem(displayedWiseIdExpiredTimeKey, tomorrow.toString());
  const randomId = _addNewIndexToLocalStoredWiseAndRetrieve({
    allWiseData,
    localData: localStorageArrayData,
  });
  return setDisplayWiseIndex(randomId);
};

export { getWise, getOneWise, updateLocalWiseJSON };
